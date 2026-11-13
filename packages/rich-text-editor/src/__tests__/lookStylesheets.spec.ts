/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fileURLToPath } from 'node:url';

import { compile, compileString } from 'sass';
import { describe, expect, it } from 'vitest';

import { LOOK_PROPERTIES, lookVariableName } from '../core/look';
import { ALL_TEXT_STYLES, findPreset } from '../plugins/TextStyle/helpers/presets';

// The look is spelled twice: in core (what a host sets) and in the stylesheets (what they read).
// These compile the real stylesheets and compare what they write with what core names.

const STYLES_DIRECTORY = fileURLToPath(new URL('../styles/', import.meta.url));
const TEXT_STYLE_STYLESHEET = fileURLToPath(new URL('../plugins/TextStyle/textStyle.module.scss', import.meta.url));

/** `font-size: var(--rte-heading1-font-size, ...)`: a property and the host variable it reads first. */
const LOOK_DECLARATION = /([a-z-]+):\s*var\((--[a-z0-9-]+),/g;

type LookDeclaration = { property: string; variable: string };

const lookDeclarationsIn = (css: string): LookDeclaration[] =>
    [...css.matchAll(LOOK_DECLARATION)].map(([, property = '', variable = '']) => ({ property, variable }));

/** What the stylesheet must write for a style named `key` (in core's spelling) and the given properties. */
const declarationsCoreNames = (key: string, properties: readonly string[]): LookDeclaration[] =>
    properties.map((property) => ({ property, variable: lookVariableName(key, property) }));

const CORE_PROPERTIES = Object.values(LOOK_PROPERTIES);

const compileMixinCall = (call: string): string =>
    compileString(`@use 'look.module.scss';\n.sample { ${call} }`, { loadPaths: [STYLES_DIRECTORY] }).css;

/** The body of the rule for `.<className>`. */
const ruleBodyOf = (css: string, className: string): string => {
    const body = new RegExp(`\\.${className}\\s*\\{([^}]*)\\}`).exec(css)?.[1];
    if (body === undefined) {
        throw new Error(`No rule for .${className} in the compiled stylesheet`);
    }
    return body;
};

describe('the look mixin', () => {
    it('writes every property core knows, under the variable core names', () => {
        const css = compileMixinCall("@include look.look('sample-style');");

        expect(lookDeclarationsIn(css)).toEqual(declarationsCoreNames('sampleStyle', CORE_PROPERTIES));
    });

    it('leaves out the properties excepted', () => {
        const css = compileMixinCall(
            "@include look.look('sample-style', $except: (text-decoration, margin-top, margin-bottom));",
        );
        const written = CORE_PROPERTIES.filter(
            (property) => !['text-decoration', 'margin-top', 'margin-bottom'].includes(property),
        );

        expect(lookDeclarationsIn(css)).toEqual(declarationsCoreNames('sampleStyle', written));
    });

    for (const argument of ['$fallbacks: (colour: red)', '$except: (colour)']) {
        it(`fails the build for a property that is not a look property in ${argument}`, () => {
            expect(() => compileMixinCall(`@include look.look('sample-style', ${argument});`)).toThrow(
                /"colour".*not a look property/,
            );
        });
    }
});

// Plugin folders may not import from here, so the check of a plugin's stylesheet sits beside the mixin's.
describe('the text style stylesheet', () => {
    const css = compile(TEXT_STYLE_STYLESHEET).css;
    const presetNames = ALL_TEXT_STYLES.filter((style) => findPreset(style) !== undefined);

    it('has a rule for every preset', () => {
        expect(presetNames.length).toBeGreaterThan(0);
    });

    for (const name of presetNames) {
        it(`reads the ${name} look from the variables core names`, () => {
            expect(lookDeclarationsIn(ruleBodyOf(css, name))).toEqual(declarationsCoreNames(name, CORE_PROPERTIES));
        });
    }
});
