/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Attrs, type Context, warn } from './content-tree';
import { type AttributeDeclaration } from './declarations';
import { pointer } from './errors';
import { type FormatDiagnosticCode } from './format';
import { checkHref } from './href';
import { isValidValue } from './values';

const attributeFault = (declaration: AttributeDeclaration, value: unknown): FormatDiagnosticCode | undefined => {
    if (declaration.type === 'url' && typeof value === 'string' && !checkHref(value).ok) {
        return 'format.unsafe-url';
    }
    return isValidValue(declaration, value) ? undefined : 'format.invalid-attribute';
};

/**
 * Undeclared names go to `unknownAttributes`, then each declared attribute in declared order, then
 * `exactlyOne`. On the root a failing value also goes to `unknownAttributes` and the checks go on; on a node
 * so does a failing value of an attribute with a default, which takes the default.
 */
export const checkAttributes = (
    context: Context,
    declared: Readonly<Record<string, AttributeDeclaration>>,
    exactlyOne: readonly string[] | undefined,
    stored: Attrs | undefined,
    path: string,
    mode: 'mark' | 'node' | 'root' = 'mark',
): Attrs | undefined => {
    const attrs = stored === undefined ? {} : stored;
    const unknown: Record<string, unknown> = {};
    for (const name of Object.keys(attrs)) {
        if (!Object.hasOwn(declared, name)) {
            unknown[name] = attrs[name];
            warn(context, 'format.unknown-attribute', `${path}${pointer('attrs', name)}`);
        }
    }
    const values: Record<string, unknown> = {};
    for (const [name, declaration] of Object.entries(declared)) {
        const present = Object.hasOwn(attrs, name);
        const fallback = 'default' in declaration ? declaration.default : undefined;
        let fault: FormatDiagnosticCode | undefined = 'format.invalid-attribute';
        if (present) {
            fault = attributeFault(declaration, attrs[name]);
        } else if ('default' in declaration) {
            fault = undefined;
        }
        if (fault === undefined) {
            values[name] = present ? attrs[name] : fallback;
            continue;
        }
        warn(context, fault, `${path}${pointer('attrs', name)}`);
        if (mode === 'mark' || (mode === 'node' && !('default' in declaration))) {
            return undefined;
        }
        unknown[name] = attrs[name];
        values[name] = fallback;
    }
    if (exactlyOne !== undefined && exactlyOne.filter((name) => values[name] !== null).length !== 1) {
        warn(context, 'format.invalid-attribute', `${path}/attrs`);
        return undefined;
    }
    values.unknownAttributes = Object.keys(unknown).length > 0 ? unknown : null;
    return values;
};
