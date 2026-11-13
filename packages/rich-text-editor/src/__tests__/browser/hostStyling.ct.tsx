/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { DOCUMENT_TEST_ID } from '../../core/documentContract';
import { type LinkLook, type TextLook, type TextStyleName } from '../../index';

import { HostLooksPair } from './HostLooksPair';
import { HostResetPair } from './HostResetPair';
import { HostStylingPair } from './HostStylingPair';
import { HostStylingSections } from './HostStylingSections';
import {
    H1_COLOR_VARIABLE,
    HOST_RESET_CSS,
    HOST_SCOPED_CSS,
    LAST_QUOTE_TEXT,
    MIDDLE_QUOTE_TEXT,
    QUOTES_DOCUMENT,
    SECTION_A_H1_COLOR,
    SECTION_B_H1_COLOR,
} from './hostStylingValues';

// Hosts set the look of each text style with `textStylePlugin({ presets })`. Without a
// value, or with one that resolves to nothing, Fondue's look stays, in the editor and the renderer alike.

const COMPUTED_PROPERTIES = [
    'font-family',
    'font-size',
    'font-weight',
    'font-style',
    'line-height',
    'letter-spacing',
    'text-transform',
    'text-decoration-line',
    'margin-top',
    'margin-bottom',
    'color',
] as const;

type ComputedLook = Record<(typeof COMPUTED_PROPERTIES)[number], string>;

/** The block of a style, as both surfaces draw it: headings by tag, the others by their `data-text-style`. */
const BLOCK_SELECTORS: Record<TextStyleName, string> = {
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    heading4: 'h4',
    custom1: 'p[data-text-style=custom1]',
    custom2: 'p[data-text-style=custom2]',
    custom3: 'p[data-text-style=custom3]',
    imageTitle: 'p[data-text-style=imageTitle]',
    imageCaption: 'p[data-text-style=imageCaption]',
};

// `Object.keys` widens to string; the keys are the record's `TextStyleName`s.
const STYLE_NAMES = Object.keys(BLOCK_SELECTORS) as TextStyleName[];

const PX_VALUE = /^(-?\d+(?:\.\d+)?)px$/;

/** A px length to one decimal, any other value as it is. WebKit writes 31.200001px where Chromium writes 31.2px. */
const roundedPx = (value: string): string => {
    const match = PX_VALUE.exec(value);
    if (match === null) {
        return value;
    }
    return `${Math.round(Number(match[1]) * 10) / 10}px`;
};

const computedLookOf = async (element: Locator): Promise<ComputedLook> => {
    const look = await element.evaluate((node, properties) => {
        const style = getComputedStyle(node);
        const values: Record<string, string> = {};
        for (const property of properties) {
            values[property] = style.getPropertyValue(property);
        }
        // Filled from COMPUTED_PROPERTIES just above, one key each.
        return values as ComputedLook;
    }, COMPUTED_PROPERTIES);
    return { ...look, 'line-height': roundedPx(look['line-height']) };
};

/** Stands for the document root's own font family, which each browser writes its own way. */
const DOCUMENT_FONT_FAMILY = 'the document root font family';

const computedLooksIn = async (surface: Locator): Promise<Record<TextStyleName, ComputedLook>> => {
    const documentLook = await computedLookOf(surface.getByTestId(DOCUMENT_TEST_ID));
    const looks: Partial<Record<TextStyleName, ComputedLook>> = {};
    for (const name of STYLE_NAMES) {
        const look = await computedLookOf(surface.locator(BLOCK_SELECTORS[name]));
        if (look['font-family'] === documentLook['font-family']) {
            look['font-family'] = DOCUMENT_FONT_FAMILY;
        }
        looks[name] = look;
    }
    // Filled for every name in STYLE_NAMES just above.
    return looks as Record<TextStyleName, ComputedLook>;
};

// Measured with the default theme on the parent branch before presets existed (7bb89f0e81), in Chromium and WebKit.
const PLAIN: ComputedLook = {
    'font-family': DOCUMENT_FONT_FAMILY,
    'font-size': '14px',
    'font-weight': '400',
    'font-style': 'normal',
    'line-height': '22.4px',
    'letter-spacing': 'normal',
    'text-transform': 'none',
    'text-decoration-line': 'none',
    'margin-top': '0px',
    'margin-bottom': '0px',
    color: 'rgb(17, 17, 16)',
};

/** The document's gap below every block but the last. */
const BLOCK_GAP = '8px';
/** The document's gap above every heading but the first. */
const HEADING_GAP = '16px';
const MUTED_COLOR = 'rgb(87, 87, 83)';

// In document order, so the first heading has no gap above it and the image caption, last, none below it.
const FONDUE_LOOKS: Record<TextStyleName, ComputedLook> = {
    heading1: {
        ...PLAIN,
        'font-size': '24px',
        'font-weight': '700',
        'line-height': '31.2px',
        'margin-bottom': BLOCK_GAP,
    },
    heading2: {
        ...PLAIN,
        'font-size': '20px',
        'font-weight': '700',
        'line-height': '26px',
        'margin-top': HEADING_GAP,
        'margin-bottom': BLOCK_GAP,
    },
    heading3: {
        ...PLAIN,
        'font-size': '16px',
        'font-weight': '500',
        'line-height': '20.8px',
        'margin-top': HEADING_GAP,
        'margin-bottom': BLOCK_GAP,
    },
    heading4: {
        ...PLAIN,
        'font-size': '14px',
        'font-weight': '500',
        'line-height': '18.2px',
        'margin-top': HEADING_GAP,
        'margin-bottom': BLOCK_GAP,
    },
    custom1: { ...PLAIN, 'font-weight': '500', 'letter-spacing': '0.28px', 'margin-bottom': BLOCK_GAP },
    custom2: { ...PLAIN, 'font-style': 'italic', color: MUTED_COLOR, 'margin-bottom': BLOCK_GAP },
    custom3: {
        ...PLAIN,
        'font-size': '13px',
        'line-height': '20.8px',
        'letter-spacing': '0.88px',
        'text-transform': 'uppercase',
        'margin-bottom': BLOCK_GAP,
    },
    imageTitle: { ...PLAIN, 'font-weight': '700', 'margin-bottom': BLOCK_GAP },
    imageCaption: { ...PLAIN, 'font-size': '12px', 'line-height': '19.2px', color: MUTED_COLOR },
};

const HOST_LOOK: TextLook = {
    fontFamily: 'Georgia, serif',
    fontSize: '40px',
    fontWeight: '300',
    fontStyle: 'italic',
    lineHeight: '1.5',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    textDecoration: 'underline',
    marginTop: '10px',
    marginBottom: '20px',
    color: 'rgb(1, 2, 3)',
};

const HOST_COMPUTED_LOOK: ComputedLook = {
    'font-family': 'Georgia, serif',
    'font-size': '40px',
    'font-weight': '300',
    'font-style': 'italic',
    'line-height': '60px',
    'letter-spacing': '2px',
    'text-transform': 'uppercase',
    'text-decoration-line': 'underline',
    'margin-top': '10px',
    'margin-bottom': '20px',
    color: 'rgb(1, 2, 3)',
};

/** Margins for a heading that is neither first nor last, where the document would otherwise set its gaps. */
const HOST_MARGINS = { marginTop: '40px', marginBottom: '30px' } satisfies TextLook;

const UNSET_VARIABLE = 'var(--unset-guideline)';

const UNSET_LOOK: TextLook = {
    fontFamily: UNSET_VARIABLE,
    fontSize: UNSET_VARIABLE,
    fontWeight: UNSET_VARIABLE,
    fontStyle: UNSET_VARIABLE,
    lineHeight: UNSET_VARIABLE,
    letterSpacing: UNSET_VARIABLE,
    textTransform: UNSET_VARIABLE,
    textDecoration: UNSET_VARIABLE,
    marginTop: UNSET_VARIABLE,
    marginBottom: UNSET_VARIABLE,
    color: UNSET_VARIABLE,
};

test.describe('host styling of text styles', () => {
    test('keeps Fondue looks when the host sets no presets, in the renderer and the editor', async ({ mount }) => {
        const component = await mount(<HostStylingPair />);

        expect(await computedLooksIn(component.getByTestId('renderer'))).toEqual(FONDUE_LOOKS);
        expect(await computedLooksIn(component.getByTestId('editor'))).toEqual(FONDUE_LOOKS);
    });

    test('applies the host look to its preset alone, the same in the renderer and the editor', async ({ mount }) => {
        const component = await mount(<HostStylingPair presets={{ heading1: HOST_LOOK, custom1: HOST_LOOK }} />);
        const expected = { ...FONDUE_LOOKS, heading1: HOST_COMPUTED_LOOK, custom1: HOST_COMPUTED_LOOK };

        const rendered = await computedLooksIn(component.getByTestId('renderer'));
        const edited = await computedLooksIn(component.getByTestId('editor'));

        expect(rendered).toEqual(expected);
        expect(edited).toEqual(expected);
    });

    test('applies host margins as given between blocks, and keeps the first heading flush', async ({ mount }) => {
        const component = await mount(<HostStylingPair presets={{ heading2: HOST_MARGINS }} />);
        const expected = {
            ...FONDUE_LOOKS,
            heading2: {
                ...FONDUE_LOOKS.heading2,
                'margin-top': HOST_MARGINS.marginTop,
                'margin-bottom': HOST_MARGINS.marginBottom,
            },
        };

        expect(await computedLooksIn(component.getByTestId('renderer'))).toEqual(expected);
        expect(await computedLooksIn(component.getByTestId('editor'))).toEqual(expected);
    });

    test('keeps Fondue looks for a value that resolves to an unset guideline variable', async ({ mount }) => {
        const component = await mount(<HostStylingPair presets={{ heading1: UNSET_LOOK, imageTitle: UNSET_LOOK }} />);

        expect(await computedLooksIn(component.getByTestId('renderer'))).toEqual(FONDUE_LOOKS);
        expect(await computedLooksIn(component.getByTestId('editor'))).toEqual(FONDUE_LOOKS);
    });

    test('reads a guideline variable where the editor stands, so sections can differ', async ({ mount }) => {
        const component = await mount(
            <HostStylingSections presets={{ heading1: { color: `var(${H1_COLOR_VARIABLE})` } }} />,
        );

        await expect(component.getByTestId('section-a').locator('h1')).toHaveCSS('color', SECTION_A_H1_COLOR);
        await expect(component.getByTestId('section-b').locator('h1')).toHaveCSS('color', SECTION_B_H1_COLOR);
    });

    test('previews a preset in the dropdown with Fondue look, not the host one', async ({ mount, page }) => {
        const component = await mount(<HostStylingPair presets={{ heading1: HOST_LOOK }} />);

        await component.getByTestId('editor').getByRole('combobox', { name: 'Text style' }).click();
        const preview = page.getByRole('option', { name: 'Heading 1' }).getByText('Heading 1', { exact: true });
        const look = await computedLookOf(preview);

        expect(look['font-size']).toBe(FONDUE_LOOKS.heading1['font-size']);
        expect(look['margin-top']).toBe('0px');
        expect(look['margin-bottom']).toBe('0px');
    });
});

// Body text, block quotes and links take a look through `paragraphPlugin`, `quotePlugin` and `linkPlugin`.

type LookedBlock = 'body' | 'bullet' | 'check' | 'quote' | 'link' | 'custom1' | 'heading1';

/** The text each block of the fixture document holds, which is how both surfaces are searched. */
const LOOKED_TEXTS: Record<LookedBlock, string> = {
    body: 'Body text',
    bullet: 'Bullet item',
    check: 'Check item',
    quote: 'A quote',
    link: 'A link',
    custom1: 'Custom 1',
    heading1: 'Heading 1',
};

// `Object.keys` widens to string; the keys are the record's `LookedBlock`s.
const LOOKED_BLOCKS = Object.keys(LOOKED_TEXTS) as LookedBlock[];

const SURFACES = ['renderer', 'editor'] as const;

/** The checked item in the fixture document, which a check list greys out and strikes through. */
const DONE_ITEM = 'Done item';

const SECONDARY_TEXT_COLOR = 'rgb(103, 103, 99)';

/** A link is found by its role, because its text sits in a nested element whose decoration is not the link's. */
const blockIn = (surface: Locator, block: LookedBlock): Locator => {
    if (block === 'link') {
        return surface.getByRole('link', { name: LOOKED_TEXTS.link, exact: true });
    }
    return surface.getByText(LOOKED_TEXTS[block], { exact: true });
};

const looksOfBlocksIn = async (surface: Locator): Promise<Record<LookedBlock, ComputedLook>> => {
    // The heading is one of the document root's children, so its parent is the root.
    const documentLook = await computedLookOf(blockIn(surface, 'heading1').locator('..'));
    const looks: Partial<Record<LookedBlock, ComputedLook>> = {};
    for (const block of LOOKED_BLOCKS) {
        const look = await computedLookOf(blockIn(surface, block));
        if (look['font-family'] === documentLook['font-family']) {
            look['font-family'] = DOCUMENT_FONT_FAMILY;
        }
        looks[block] = look;
    }
    // Filled for every block in LOOKED_BLOCKS just above.
    return looks as Record<LookedBlock, ComputedLook>;
};

// Measured with the default theme before quotes and links could take a look, in Chromium and WebKit.
const QUOTE_LOOK: ComputedLook = { ...PLAIN, 'margin-bottom': BLOCK_GAP, color: MUTED_COLOR };
const LINK_LOOK: ComputedLook = { ...PLAIN, 'text-decoration-line': 'underline', color: 'rgb(182, 10, 227)' };

// In document order: list items sit tight, and the heading, last but not first, has a gap above and none below.
const BASELINE_LOOKS: Record<LookedBlock, ComputedLook> = {
    body: { ...PLAIN, 'margin-bottom': BLOCK_GAP },
    bullet: PLAIN,
    check: PLAIN,
    quote: QUOTE_LOOK,
    link: LINK_LOOK,
    custom1: FONDUE_LOOKS.custom1,
    heading1: { ...FONDUE_LOOKS.heading1, 'margin-top': HEADING_GAP, 'margin-bottom': '0px' },
};

const QUOTE_BOX = { 'margin-left': '0px', 'padding-left': '12px', 'border-left': '2px solid rgb(17, 17, 16)' };

const expectQuoteBox = async (quote: Locator): Promise<void> => {
    for (const [property, value] of Object.entries(QUOTE_BOX)) {
        await expect(quote).toHaveCSS(property, value);
    }
};
const LINK_UNDERLINE_OFFSET = '2px';
const COLOURED_RUN = 'span[style*=color]';
const COLOURED_RUN_COLOR = 'rgb(255, 0, 0)';

/** A link's look has no decoration or vertical margins, so the host look leaves those as Fondue draws them. */
const HOST_LINK_LOOK: LinkLook = {
    fontFamily: HOST_LOOK.fontFamily,
    fontSize: HOST_LOOK.fontSize,
    fontWeight: HOST_LOOK.fontWeight,
    fontStyle: HOST_LOOK.fontStyle,
    lineHeight: HOST_LOOK.lineHeight,
    letterSpacing: HOST_LOOK.letterSpacing,
    textTransform: HOST_LOOK.textTransform,
    color: HOST_LOOK.color,
};

const HOST_LINK_COMPUTED_LOOK: ComputedLook = {
    ...HOST_COMPUTED_LOOK,
    'text-decoration-line': 'underline',
    'margin-top': '0px',
    'margin-bottom': '0px',
};

/** Margins for a quote, which the document must not trim when the quote is last. */
const QUOTE_MARGINS = { marginTop: '24px', marginBottom: '12px' } satisfies TextLook;

const UNSET_LINK_LOOK: LinkLook = {
    fontFamily: UNSET_VARIABLE,
    fontSize: UNSET_VARIABLE,
    fontWeight: UNSET_VARIABLE,
    fontStyle: UNSET_VARIABLE,
    lineHeight: UNSET_VARIABLE,
    letterSpacing: UNSET_VARIABLE,
    textTransform: UNSET_VARIABLE,
    color: UNSET_VARIABLE,
};

test.describe('host styling of body text, quotes and links', () => {
    test('keeps Fondue looks when the host sets none, in the renderer and the editor', async ({ mount }) => {
        const component = await mount(<HostLooksPair />);

        for (const surface of SURFACES) {
            const section = component.getByTestId(surface);
            expect(await looksOfBlocksIn(section)).toEqual(BASELINE_LOOKS);
            await expectQuoteBox(section.locator('blockquote'));
            await expect(section.getByRole('link', { name: LOOKED_TEXTS.link, exact: true })).toHaveCSS(
                'text-underline-offset',
                LINK_UNDERLINE_OFFSET,
            );
        }
    });

    test('applies the body look to plain paragraphs, in list items too, and not to text styles', async ({ mount }) => {
        const component = await mount(<HostLooksPair body={HOST_LOOK} />);

        for (const surface of SURFACES) {
            // The link sits in a paragraph and inherits its look, so it is not part of the comparison.
            expect(await looksOfBlocksIn(component.getByTestId(surface))).toMatchObject({
                body: HOST_COMPUTED_LOOK,
                bullet: HOST_COMPUTED_LOOK,
                check: HOST_COMPUTED_LOOK,
                quote: BASELINE_LOOKS.quote,
                custom1: BASELINE_LOOKS.custom1,
                heading1: BASELINE_LOOKS.heading1,
            });
        }
    });

    test('keeps a checked item grey and struck through under a body look', async ({ mount }) => {
        const component = await mount(<HostLooksPair body={HOST_LOOK} />);

        for (const surface of SURFACES) {
            const done = component.getByTestId(surface).getByText(DONE_ITEM, { exact: true });
            await expect(done).toHaveCSS('color', SECONDARY_TEXT_COLOR);
            await expect(done).toHaveCSS('text-decoration-line', 'line-through');
        }
    });

    test('applies the quote look to the quote alone, keeping its padding and border', async ({ mount }) => {
        const component = await mount(<HostLooksPair quote={HOST_LOOK} />);
        const expected = { ...BASELINE_LOOKS, quote: HOST_COMPUTED_LOOK };

        for (const surface of SURFACES) {
            const section = component.getByTestId(surface);
            expect(await looksOfBlocksIn(section)).toEqual(expected);
            await expectQuoteBox(section.locator('blockquote'));
        }
    });

    test('applies quote margins as given, also on the last block, and trims only the gap', async ({ mount }) => {
        const plain = await mount(<HostLooksPair value={QUOTES_DOCUMENT} />);

        for (const surface of SURFACES) {
            const section = plain.getByTestId(surface);
            await expect(section.getByText(MIDDLE_QUOTE_TEXT, { exact: true })).toHaveCSS('margin-bottom', BLOCK_GAP);
            await expect(section.getByText(LAST_QUOTE_TEXT, { exact: true })).toHaveCSS('margin-bottom', '0px');
        }
        await plain.unmount();

        const styled = await mount(<HostLooksPair value={QUOTES_DOCUMENT} quote={QUOTE_MARGINS} />);

        for (const surface of SURFACES) {
            for (const text of [MIDDLE_QUOTE_TEXT, LAST_QUOTE_TEXT]) {
                const quote = styled.getByTestId(surface).getByText(text, { exact: true });
                await expect(quote).toHaveCSS('margin-top', QUOTE_MARGINS.marginTop);
                await expect(quote).toHaveCSS('margin-bottom', QUOTE_MARGINS.marginBottom);
            }
        }
    });

    test('applies the link look and keeps the underline, also under a run with its own colour', async ({ mount }) => {
        const component = await mount(<HostLooksPair link={HOST_LINK_LOOK} />);

        for (const surface of SURFACES) {
            const section = component.getByTestId(surface);
            const link = section.getByRole('link', { name: LOOKED_TEXTS.link, exact: true });
            const colouredRun = section.locator(COLOURED_RUN);

            expect(await computedLookOf(link)).toEqual(HOST_LINK_COMPUTED_LOOK);
            await expect(link).toHaveCSS('text-underline-offset', LINK_UNDERLINE_OFFSET);
            await expect(colouredRun).toHaveCSS('text-decoration-line', 'underline');
            await expect(colouredRun).toHaveCSS('color', COLOURED_RUN_COLOR);
            await expect(colouredRun).toHaveCSS('text-underline-offset', LINK_UNDERLINE_OFFSET);
        }
    });

    test('keeps Fondue looks for values that resolve to an unset guideline variable', async ({ mount }) => {
        const component = await mount(<HostLooksPair body={UNSET_LOOK} quote={UNSET_LOOK} link={UNSET_LINK_LOOK} />);

        for (const surface of SURFACES) {
            expect(await looksOfBlocksIn(component.getByTestId(surface))).toEqual(BASELINE_LOOKS);
        }
    });
});

test.describe('the document next to a host page stylesheet', () => {
    test('keeps the gap between blocks under a host reset of margins', async ({ mount }) => {
        const component = await mount(<HostResetPair hostCss={HOST_RESET_CSS} />);

        for (const surface of SURFACES) {
            const section = component.getByTestId(surface);
            await expect(blockIn(section, 'body')).toHaveCSS('margin-bottom', BLOCK_GAP);
            await expect(blockIn(section, 'quote')).toHaveCSS('margin-bottom', BLOCK_GAP);
        }
    });

    test('keeps the gap below a paragraph under a host rule scoped to a class', async ({ mount }) => {
        const component = await mount(<HostResetPair hostCss={HOST_SCOPED_CSS} />);

        for (const surface of SURFACES) {
            await expect(blockIn(component.getByTestId(surface), 'body')).toHaveCSS('margin-bottom', BLOCK_GAP);
        }
    });

    test('applies the host look of body text over a host rule scoped to a class', async ({ mount }) => {
        const component = await mount(<HostResetPair hostCss={HOST_SCOPED_CSS} body={HOST_LOOK} />);

        for (const surface of SURFACES) {
            const body = blockIn(component.getByTestId(surface), 'body');
            await expect(body).toHaveCSS('margin-top', HOST_COMPUTED_LOOK['margin-top']);
            await expect(body).toHaveCSS('margin-bottom', HOST_COMPUTED_LOOK['margin-bottom']);
        }
    });
});
