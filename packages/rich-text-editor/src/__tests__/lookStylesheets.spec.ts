/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fileURLToPath } from 'node:url';

import { compile, compileString } from 'sass';
import { describe, expect, it } from 'vitest';

import { OWN_MARGIN_VARIABLES } from '../core/documentContract';
import { LOOK_PROPERTIES, lookVariableName } from '../core/look';
import {
    BUTTON_HOVER_LOOK_FIELDS,
    BUTTON_LOOK_FIELDS,
    BUTTON_PHYSICAL_PADDING_FIELDS,
    TEXT_LINK_LOOK_FIELDS,
} from '../plugins/Link/helpers/appearance';
import { ALL_LINK_APPEARANCES, type LinkAppearance } from '../plugins/Link/helpers/value';
import { bulletListPlugin, numberedListPlugin } from '../plugins/List/List';
import { ALL_TEXT_STYLES, findPreset } from '../plugins/TextStyle/helpers/presets';

// The look is spelled twice: in core (what a host sets) and in the stylesheets (what they read).
// These compile the real stylesheets and compare what they write with what core names.

const STYLES_DIRECTORY = fileURLToPath(new URL('../styles/', import.meta.url));
const TEXT_STYLE_STYLESHEET = fileURLToPath(new URL('../plugins/TextStyle/textStyle.module.scss', import.meta.url));

/** The characters of a selector that a regular expression reads as more than themselves. */
const SELECTOR_PUNCTUATION = /[.:()]/g;

const LINK_STYLESHEET = fileURLToPath(new URL('../plugins/Link/link.module.scss', import.meta.url));

/** `font-size: var(--rte-heading1-font-size, ...)`: a property and the host variable it reads first. */
const LOOK_DECLARATION = /([a-z-]+):\s*var\((--[a-z0-9-]+),/g;

type LookDeclaration = { property: string; variable: string };

const lookDeclarationsIn = (css: string): LookDeclaration[] =>
    [...css.matchAll(LOOK_DECLARATION)].map(([, property = '', variable = '']) => ({ property, variable }));

const HANDED_OVER_PROPERTIES: Record<string, string> = {
    'margin-top': OWN_MARGIN_VARIABLES.top,
    'margin-bottom': OWN_MARGIN_VARIABLES.bottom,
};

/** What a stylesheet writes for a look property: the property itself, or the variable that hands a margin over. */
const writtenPropertyOf = (property: string): string => HANDED_OVER_PROPERTIES[property] ?? property;

/** What the stylesheet must write for a style named `key` (in core's spelling) and the given properties. */
const declarationsCoreNames = (key: string, properties: readonly string[]): LookDeclaration[] =>
    properties.map((property) => ({
        property: writtenPropertyOf(property),
        variable: lookVariableName(key, property),
    }));

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
    it('writes every property core knows, handing the margins to the document, under the variable core names', () => {
        const css = compileMixinCall("@include look.look('sample-style');");

        expect(lookDeclarationsIn(css)).toEqual(declarationsCoreNames('sampleStyle', CORE_PROPERTIES));
    });

    it('leaves out the properties excepted, a margin variable among them', () => {
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
        it(`reads the ${name} look from the variables core names and hands its margins to the document`, () => {
            expect(lookDeclarationsIn(ruleBodyOf(css, name))).toEqual(declarationsCoreNames(name, CORE_PROPERTIES));
        });
    }
});

// A button link reads its own variables, which the link plugin compiles from the tables in `appearance.ts`.
describe('the link stylesheet', () => {
    const css = compile(LINK_STYLESHEET).css;

    const BUTTON_CLASSES: Record<LinkAppearance, string> = {
        primary: 'buttonPrimary',
        secondary: 'buttonSecondary',
        tertiary: 'buttonTertiary',
    };

    /** The body of the rule with exactly this selector list, which a button writes for its link states. */
    const ruleBodyForSelector = (selector: string): string => {
        const escaped = selector.replaceAll(SELECTOR_PUNCTUATION, String.raw`\$&`);
        const body = new RegExp(`${escaped}\\s*\\{([^}]*)\\}`).exec(css)?.[1];

        if (body === undefined) {
            throw new Error(`No rule for ${selector} in the compiled stylesheet`);
        }

        return body;
    };

    /** The side each inline padding lands on in left-to-right text, where the base rule declares it. */
    const LEFT_TO_RIGHT_PADDING_SIDES = {
        'padding-inline-start': 'padding-left',
        'padding-inline-end': 'padding-right',
    } as const;

    const isInlinePaddingProperty = (property: string): property is keyof typeof LEFT_TO_RIGHT_PADDING_SIDES =>
        property in LEFT_TO_RIGHT_PADDING_SIDES;

    const declaredPropertyOf = (property: string): string => {
        if (isInlinePaddingProperty(property)) {
            return LEFT_TO_RIGHT_PADDING_SIDES[property];
        }

        return property;
    };

    const declarationsOf = (kind: string, fields: Record<string, string>): LookDeclaration[] =>
        Object.values(fields).map((property) => ({
            property: declaredPropertyOf(property),
            variable: lookVariableName(kind, property),
        }));

    /** What the right-to-left rule reads: the end field on the left side, the start field on the right side. */
    const rightToLeftPaddingsOf = (kind: string): LookDeclaration[] => [
        { property: 'padding-left', variable: lookVariableName(kind, 'padding-inline-end') },
        { property: 'padding-right', variable: lookVariableName(kind, 'padding-inline-start') },
    ];

    /** The variable a declaration of `property` falls back to when the host's own variable is unset. */
    const fallbackVariableOf = (body: string, property: string): string | undefined =>
        new RegExp(`${property}:\\s*var\\(--[a-z0-9-]+,\\s*var\\((--[a-z0-9-]+),`).exec(body)?.[1];

    const rightToLeftSelectorOf = (className: string): string =>
        `.${className}:dir(rtl), .${className}:link:dir(rtl), .${className}:visited:dir(rtl)`;

    /** A button's own fields, without the physical paddings that its look keeps only for compatibility. */
    const BUTTON_OWN_LOOK_FIELDS = Object.fromEntries(
        Object.entries(BUTTON_LOOK_FIELDS).filter(([field]) => !(field in BUTTON_PHYSICAL_PADDING_FIELDS)),
    );

    it('reads the text link look from the variables the link plugin sets', () => {
        expect(lookDeclarationsIn(ruleBodyForSelector('.link, .link:link, .link:visited'))).toEqual(
            declarationsOf('link', TEXT_LINK_LOOK_FIELDS),
        );
    });

    it('reads the end padding on the left and the start padding on the right of a text link in right-to-left text', () => {
        expect(lookDeclarationsIn(ruleBodyForSelector(rightToLeftSelectorOf('link')))).toEqual(
            rightToLeftPaddingsOf('link'),
        );
    });

    for (const appearance of ALL_LINK_APPEARANCES) {
        const className = BUTTON_CLASSES[appearance];

        it(`reads the ${appearance} button look from the variables the link plugin sets`, () => {
            const selector = `.${className}, .${className}:link, .${className}:visited`;

            expect(lookDeclarationsIn(ruleBodyForSelector(selector))).toEqual(
                declarationsOf(`button-${appearance}`, BUTTON_OWN_LOOK_FIELDS),
            );
        });

        it(`falls back to the ${appearance} button's left padding on the left and its right padding on the right`, () => {
            const selector = `.${className}, .${className}:link, .${className}:visited`;
            const body = ruleBodyForSelector(selector);

            expect(fallbackVariableOf(body, 'padding-left')).toBe(
                lookVariableName(`button-${appearance}`, BUTTON_PHYSICAL_PADDING_FIELDS.paddingLeft),
            );
            expect(fallbackVariableOf(body, 'padding-right')).toBe(
                lookVariableName(`button-${appearance}`, BUTTON_PHYSICAL_PADDING_FIELDS.paddingRight),
            );
        });

        it(`falls back to the ${appearance} button's left padding on the left and its right padding on the right in right-to-left text`, () => {
            const body = ruleBodyForSelector(rightToLeftSelectorOf(className));

            expect(fallbackVariableOf(body, 'padding-left')).toBe(
                lookVariableName(`button-${appearance}`, BUTTON_PHYSICAL_PADDING_FIELDS.paddingLeft),
            );
            expect(fallbackVariableOf(body, 'padding-right')).toBe(
                lookVariableName(`button-${appearance}`, BUTTON_PHYSICAL_PADDING_FIELDS.paddingRight),
            );
        });

        it(`reads the ${appearance} button's end padding on the left and its start padding on the right in right-to-left text`, () => {
            expect(lookDeclarationsIn(ruleBodyForSelector(rightToLeftSelectorOf(className)))).toEqual(
                rightToLeftPaddingsOf(`button-${appearance}`),
            );
        });

        it(`reads the ${appearance} button hover look from the variables the link plugin sets`, () => {
            expect(lookDeclarationsIn(ruleBodyForSelector(`.${className}:hover`))).toEqual(
                declarationsOf(`button-${appearance}-hover`, BUTTON_HOVER_LOOK_FIELDS),
            );
        });
    }
});

const LIST_STYLESHEET = fileURLToPath(new URL('../plugins/List/list.module.scss', import.meta.url));

/** A list level's variable, such as `--rte-bullet-list2-color`. */
const LIST_LEVEL_VARIABLE = /--rte-(?:bullet|numbered)-list\d+-[a-z]+/g;

const SAMPLE_VALUE = 'sample';
const BULLET_LOOK = {
    marker: SAMPLE_VALUE,
    color: SAMPLE_VALUE,
    size: SAMPLE_VALUE,
    indent: SAMPLE_VALUE,
    gap: SAMPLE_VALUE,
};
const NUMBERED_LOOK = {
    marker: SAMPLE_VALUE,
    color: SAMPLE_VALUE,
    indent: SAMPLE_VALUE,
    gap: SAMPLE_VALUE,
};

describe('the list stylesheet', () => {
    const css = compile(LIST_STYLESHEET).css;
    const written = Object.keys({
        ...bulletListPlugin({
            look: [BULLET_LOOK, BULLET_LOOK, BULLET_LOOK],
        }).content?.contentProperties,
        ...numberedListPlugin({
            look: [NUMBERED_LOOK, NUMBERED_LOOK, NUMBERED_LOOK],
        }).content?.contentProperties,
    });

    it('falls back to the body look for the marker colour and size', () => {
        for (const property of [LOOK_PROPERTIES.color, LOOK_PROPERTIES.fontSize]) {
            expect(css).toContain(`var(${lookVariableName('body', property)},`);
        }
    });

    it('reads every variable the list plugins write for a level, and no other', () => {
        const read = new Set(css.match(LIST_LEVEL_VARIABLE));

        expect(read).toEqual(new Set(written));
    });
});
