/* (c) Copyright Frontify Ltd., all rights reserved. */

import { globSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

// The concrete roles of WAI-ARIA 1.2, section 5.4; abstract roles are not for authors and `directory` is deprecated.
const ROLES: ReadonlySet<string> = new Set(
    `alert alertdialog application article banner blockquote button caption cell checkbox code columnheader combobox
    complementary contentinfo definition deletion dialog document emphasis feed figure form generic grid gridcell group
    heading img insertion link list listbox listitem log main marquee math menu menubar menuitem menuitemcheckbox
    menuitemradio meter navigation none note option paragraph presentation progressbar radio radiogroup region row
    rowgroup rowheader scrollbar search searchbox separator slider spinbutton status strong subscript superscript switch
    tab table tablist tabpanel term textbox time timer toolbar tooltip tree treegrid treeitem`.split(/\s+/),
);

// The states and properties of WAI-ARIA 1.2, section 6.7, less the deprecated `aria-dropeffect` and `aria-grabbed`.
const STATES_AND_PROPERTIES: ReadonlySet<string> = new Set(
    `activedescendant atomic autocomplete busy checked colcount colindex colspan controls current describedby details
    disabled errormessage expanded flowto haspopup hidden invalid keyshortcuts label labelledby level live modal multiline
    multiselectable orientation owns placeholder posinset pressed readonly relevant required roledescription rowcount
    rowindex rowspan selected setsize sort valuemax valuemin valuenow valuetext`
        .split(/\s+/)
        .map((name) => `aria-${name}`),
);

const ARIA_NAME = /(?<![\w-])aria-[a-z]+(?![\w-])/g;

/** The string literals in `node` and below it, such as both branches of a conditional `role`. */
const stringsIn = (node: ts.Node): string[] => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        return [node.text];
    }
    const found: string[] = [];
    ts.forEachChild(node, (child) => {
        found.push(...stringsIn(child));
    });
    return found;
};

/** The name of an object key written as an identifier, a string or a computed string, such as `role`, `'role'` and `['role']`. */
const keyName = (name: ts.PropertyName): string | undefined => {
    if (ts.isIdentifier(name) || ts.isStringLiteral(name)) {
        return name.text;
    }
    if (ts.isComputedPropertyName(name) && ts.isStringLiteral(name.expression)) {
        return name.expression.text;
    }
    return undefined;
};

/** The initializers of the variables named `role` in `file`, which a `{ role }` shorthand takes its value from. */
const declaredRoles = (file: ts.SourceFile): ts.Expression[] => {
    const found: ts.Expression[] = [];
    const visit = (node: ts.Node) => {
        if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'role') {
            if (node.initializer !== undefined) {
                found.push(node.initializer);
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(file);
    return found;
};

/**
 * Reports each `aria-*` name outside the WAI-ARIA 1.2 states and properties, and each role value outside its roles
 * (SPEC-rich-text-accessibility/AC-078). Role values come from JSX `role` attributes, `setAttribute('role', …)` and, in
 * `.tsx` files, where objects are element props, `role` properties.
 */
export const scanAria = (path: string, source: string): string[] => {
    const tsx = path.endsWith('.tsx');
    let kind = ts.ScriptKind.TS;
    if (tsx) {
        kind = ts.ScriptKind.TSX;
    }
    const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, kind);
    const violations: string[] = [];
    const lineOf = (node: ts.Node) => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
    const checkNames = (node: ts.Node, text: string) => {
        for (const [name] of text.matchAll(ARIA_NAME)) {
            if (!STATES_AND_PROPERTIES.has(name)) {
                violations.push(`${path}:${lineOf(node)} ${name} is not a WAI-ARIA 1.2 state or property`);
            }
        }
    };
    const checkRoles = (value: ts.Node, at: ts.Node = value) => {
        for (const role of stringsIn(value).flatMap((text) => text.split(/\s+/))) {
            if (role !== '' && !ROLES.has(role)) {
                violations.push(`${path}:${lineOf(at)} role ${role} is not a WAI-ARIA 1.2 role`);
            }
        }
    };
    const visit = (node: ts.Node) => {
        if (ts.isJsxAttribute(node)) {
            const name = node.name.getText(file);
            checkNames(node, name);
            if (name === 'role' && node.initializer !== undefined) {
                checkRoles(node.initializer);
            }
        } else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
            checkNames(node, node.text);
        } else if (tsx && ts.isPropertyAssignment(node) && keyName(node.name) === 'role') {
            checkRoles(node.initializer);
        } else if (tsx && ts.isShorthandPropertyAssignment(node) && node.name.text === 'role') {
            for (const value of declaredRoles(file)) {
                checkRoles(value, node);
            }
        } else if (
            ts.isCallExpression(node) &&
            ts.isPropertyAccessExpression(node.expression) &&
            node.expression.name.text === 'setAttribute' &&
            node.arguments[0] !== undefined &&
            stringsIn(node.arguments[0]).includes('role') &&
            node.arguments[1] !== undefined
        ) {
            checkRoles(node.arguments[1]);
        }
        ts.forEachChild(node, visit);
    };
    visit(file);
    return violations;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const root = fileURLToPath(new URL('..', import.meta.url));
    let files = process.argv.slice(2);
    if (files.length === 0) {
        // Lint fixtures hold code that fails on purpose and never ships.
        files = globSync('src/**/*.{ts,tsx}', { cwd: root, exclude: (name) => name === '__lint-fixtures__' });
    }
    const results = await Promise.all(
        files.sort().map(async (file) => scanAria(file, await readFile(join(root, file), 'utf8'))),
    );
    const violations = results.flat();
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log(`check-aria: ${files.length} files set only WAI-ARIA 1.2 roles, states and properties.`);
}
