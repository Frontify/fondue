/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { enUS } from '../src/locales/en-US.ts';
import { type Feature, type FeatureDeclaration } from '../src/model/declarations.ts';
import { featureInternals } from '../src/model/feature.ts';

const cellsOf = (line: string) =>
    line
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => cell.trim());

/** The cells of the feature's row in the page's Feature behavior table, by column header. */
const rowOf = (page: string, id: string): Readonly<Record<string, string>> | undefined => {
    const [header, , ...rows] = page
        .split('\n')
        .filter((line) => line.trimStart().startsWith('|'))
        .map(cellsOf);
    const row = rows.find(([feature]) => feature === `\`${id}\``);
    if (header === undefined || row === undefined) {
        return undefined;
    }
    return Object.fromEntries(header.map((column, index) => [column, row[index] ?? '']));
};

/** A control is named by its label in `strings` or by its `labelKey`. */
const isNamed = (cell: string, labelKey: string, strings: Readonly<Record<string, string>>) => {
    const label = strings[labelKey];
    return cell.includes(labelKey) || (label !== undefined && cell.includes(label));
};

/**
 * Each registered feature needs `docs/features/<feature ID>.md` with its Feature behavior row, which names each
 * command, key, control and input rule the feature registers (SPEC-rich-text/AC-068). `pages` maps a feature ID
 * to its page, and `strings` holds the `enUS` labels.
 */
export const checkFeatureDocs = (
    declarations: readonly FeatureDeclaration[],
    pages: Readonly<Record<string, string>>,
    strings: Readonly<Record<string, string>>,
): string[] => {
    const violations: string[] = [];
    for (const declaration of declarations) {
        const { id } = declaration;
        const page = pages[id];
        if (page === undefined) {
            violations.push(`${id} has no docs/features/${id}.md`);
            continue;
        }
        const row = rowOf(page, id);
        if (row === undefined) {
            violations.push(`docs/features/${id}.md has no Feature behavior row for ${id}`);
            continue;
        }
        const registered: readonly (readonly [string, readonly string[]])[] = [
            ['Commands and payloads', Object.keys(declaration.commands ?? {})],
            ['Keys', Object.keys(declaration.keys ?? {})],
            ['Input rules', (declaration.inputRules ?? []).map((rule) => rule.id)],
        ];
        for (const [column, names] of registered) {
            const cell = row[column] ?? '';
            for (const name of names.filter((value) => !cell.includes(`\`${value}\``))) {
                violations.push(`docs/features/${id}.md does not name ${name} under ${column}`);
            }
        }
        const controls = row.Controls ?? '';
        for (const { labelKey } of declaration.toolbar ?? []) {
            if (!isNamed(controls, labelKey, strings)) {
                violations.push(`docs/features/${id}.md does not name the control ${labelKey} under Controls`);
            }
        }
    }
    return violations;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    // The registry imports through the `#/` alias, which `tsx` resolves and the node typecheck project does not.
    const { registry } = (await import(new URL('../src/features/registry.ts', import.meta.url).href)) as {
        readonly registry: Readonly<Record<string, () => Feature>>;
    };
    const declarations: FeatureDeclaration[] = [];
    const pages: Record<string, string> = {};
    for (const factory of Object.values(registry)) {
        const feature = factory();
        const internals = featureInternals(feature);
        if (internals === undefined) {
            throw new Error(`The registry entry ${feature.id} is not a feature that defineFeature made.`);
        }
        declarations.push(internals.declaration);
        const page = new URL(`../docs/features/${feature.id}.md`, import.meta.url);
        if (existsSync(page)) {
            pages[feature.id] = readFileSync(page, 'utf8');
        }
    }
    const violations = checkFeatureDocs(declarations, pages, enUS.translationStrings);
    if (violations.length > 0) {
        console.error(violations.join('\n'));
        process.exit(1);
    }
    console.log(
        `check-docs: the docs page of each of the ${declarations.length} registered features names its commands, keys, controls and input rules.`,
    );
}
