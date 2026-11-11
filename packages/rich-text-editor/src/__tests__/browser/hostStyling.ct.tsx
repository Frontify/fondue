/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { type TextLook, type TextStyleName } from '../../index';

import { HostStylingPair, HostStylingSections } from './HostStylingFixtures';
import { H1_COLOR_VARIABLE, SECTION_A_H1_COLOR, SECTION_B_H1_COLOR } from './hostStylingValues';

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

const computedLookOf = (element: Locator): Promise<ComputedLook> =>
    element.evaluate((node, properties) => {
        const style = getComputedStyle(node);
        const look: Record<string, string> = {};
        for (const property of properties) {
            look[property] = style.getPropertyValue(property);
        }
        // Filled from COMPUTED_PROPERTIES just above, one key each.
        return look as ComputedLook;
    }, COMPUTED_PROPERTIES);

const computedLooksIn = async (surface: Locator): Promise<Record<TextStyleName, ComputedLook>> => {
    const looks: Partial<Record<TextStyleName, ComputedLook>> = {};
    for (const name of STYLE_NAMES) {
        looks[name] = await computedLookOf(surface.locator(BLOCK_SELECTORS[name]));
    }
    // Filled for every name in STYLE_NAMES just above.
    return looks as Record<TextStyleName, ComputedLook>;
};

// Measured with the default theme on the commit before presets existed (032905115b).
const FONT_FAMILY =
    'Diatype, Geist, Arial, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const PLAIN: ComputedLook = {
    'font-family': FONT_FAMILY,
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

const FONDUE_LOOKS: Record<TextStyleName, ComputedLook> = {
    heading1: { ...PLAIN, 'font-size': '24px', 'font-weight': '700', 'line-height': '31.2px' },
    heading2: { ...PLAIN, 'font-size': '20px', 'font-weight': '700', 'line-height': '26px' },
    heading3: { ...PLAIN, 'font-size': '16px', 'font-weight': '500', 'line-height': '20.8px' },
    heading4: { ...PLAIN, 'font-size': '14px', 'font-weight': '500', 'line-height': '18.2px' },
    custom1: { ...PLAIN, 'font-weight': '500', 'letter-spacing': '0.28px' },
    custom2: { ...PLAIN, 'font-style': 'italic', color: 'rgb(103, 103, 99)' },
    custom3: {
        ...PLAIN,
        'font-size': '13px',
        'line-height': '20.8px',
        'letter-spacing': '0.88px',
        'text-transform': 'uppercase',
    },
    imageTitle: { ...PLAIN, 'font-weight': '700' },
    imageCaption: { ...PLAIN, 'font-size': '12px', 'line-height': '19.2px', color: 'rgb(103, 103, 99)' },
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
