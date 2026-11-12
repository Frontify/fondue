/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { DOCUMENT_TEST_ID } from '../../core/documentContract';

import { CHECK_ITEM_DOCUMENT, CHECK_TEXTS, SPACING_DOCUMENT, SPACING_TEXTS } from './documentSpacingValues';
import { ExportedLooksPair } from './ExportedLooksPair';
import { HostLooksPair } from './HostLooksPair';

// The document spaces blocks by structure and declared `childSpacing`: the stylesheet and the inline-style
// export must give every block the same margins, as the editor and the readonly view do.

type Margins = { 'margin-top': string; 'margin-bottom': string };

const BLOCK_GAP = '8px';
const NO_GAP = '0px';
/** The checkbox's own margin, which the document must leave alone. */
const CHECKBOX_MARGIN = '4px';

const margins = (top: string, bottom: string): Margins => ({ 'margin-top': top, 'margin-bottom': bottom });

const marginsOf = (element: Locator): Promise<Margins> =>
    element.evaluate((node) => {
        const style = getComputedStyle(node);
        return { 'margin-top': style.marginTop, 'margin-bottom': style.marginBottom };
    });

/** Drops every class in the exported HTML, the root's included, as on a page without the package stylesheet. */
const removeClasses = (container: Locator): Promise<void> =>
    container.evaluate((node) => {
        for (const element of node.querySelectorAll('[class]')) {
            element.removeAttribute('class');
        }
    });

type SpacingTarget = keyof typeof SPACING_TEXTS | 'list' | 'nestedList';

// In document order: the first heading has no gap above, the list's content sits tight, the last block has none below.
const SPACING_MARGINS: Record<SpacingTarget, Margins> = {
    title: margins(NO_GAP, BLOCK_GAP),
    intro: margins(NO_GAP, BLOCK_GAP),
    list: margins(NO_GAP, BLOCK_GAP),
    itemText: margins(NO_GAP, NO_GAP),
    itemHeading: margins(NO_GAP, NO_GAP),
    nestedList: margins(NO_GAP, NO_GAP),
    nestedItem: margins(NO_GAP, NO_GAP),
    quote: margins(NO_GAP, BLOCK_GAP),
    last: margins(NO_GAP, NO_GAP),
};

// `Object.keys` widens to string; the keys are the record's `SpacingTarget`s.
const SPACING_TARGETS = Object.keys(SPACING_MARGINS) as SpacingTarget[];

const spacingTargetIn = (surface: Locator, target: SpacingTarget): Locator => {
    switch (target) {
        case 'list':
            return surface.locator('ul').first();
        case 'nestedList':
            return surface.locator('ul ul');
        // Every other target is a text block, found by its text.
        default:
            return surface.getByText(SPACING_TEXTS[target], { exact: true });
    }
};

const spacingMarginsIn = async (surface: Locator): Promise<Record<SpacingTarget, Margins>> => {
    const found: Partial<Record<SpacingTarget, Margins>> = {};
    for (const target of SPACING_TARGETS) {
        found[target] = await marginsOf(spacingTargetIn(surface, target));
    }
    // Filled for every target in SPACING_TARGETS just above.
    return found as Record<SpacingTarget, Margins>;
};

type CheckTarget = keyof typeof CHECK_TEXTS | 'list' | 'nestedList';

const CHECK_MARGINS: Record<CheckTarget, Margins> = {
    list: margins(NO_GAP, BLOCK_GAP),
    item: margins(NO_GAP, NO_GAP),
    nestedList: margins(NO_GAP, NO_GAP),
    nested: margins(NO_GAP, NO_GAP),
    after: margins(NO_GAP, NO_GAP),
};

// `Object.keys` widens to string; the keys are the record's `CheckTarget`s.
const CHECK_TARGETS = Object.keys(CHECK_MARGINS) as CheckTarget[];

const checkTargetIn = (surface: Locator, target: CheckTarget): Locator => {
    switch (target) {
        case 'list':
            return surface.locator('ul').first();
        case 'nestedList':
            return surface.locator('ul ul');
        // Every other target is a text block, found by its text.
        default:
            return surface.getByText(CHECK_TEXTS[target], { exact: true });
    }
};

const checkMarginsIn = async (surface: Locator): Promise<Record<CheckTarget, Margins>> => {
    const found: Partial<Record<CheckTarget, Margins>> = {};
    for (const target of CHECK_TARGETS) {
        found[target] = await marginsOf(checkTargetIn(surface, target));
    }
    // Filled for every target in CHECK_TARGETS just above.
    return found as Record<CheckTarget, Margins>;
};

const firstCheckbox = (surface: Locator): Locator => surface.getByRole('checkbox').first();

test.describe('document spacing', () => {
    test('is the same in the stylesheet, the inline-style export and the readonly view', async ({ mount }) => {
        const exported = await mount(<ExportedLooksPair value={SPACING_DOCUMENT} />);
        const inline = exported.getByTestId('inline');
        await removeClasses(inline);

        expect(await spacingMarginsIn(exported.getByTestId('classes'))).toEqual(SPACING_MARGINS);
        expect(await spacingMarginsIn(inline)).toEqual(SPACING_MARGINS);
        await exported.unmount();

        // The editor is left out: its schema does not let a heading sit in a list item.
        const drawn = await mount(<HostLooksPair value={SPACING_DOCUMENT} />);
        expect(await spacingMarginsIn(drawn.getByTestId('renderer'))).toEqual(SPACING_MARGINS);
    });

    test('holds a check item content tight and leaves its checkbox alone, on every surface', async ({ mount }) => {
        const drawn = await mount(<HostLooksPair value={CHECK_ITEM_DOCUMENT} />);
        for (const surface of ['renderer', 'editor']) {
            const section = drawn.getByTestId(surface).getByTestId(DOCUMENT_TEST_ID);
            expect(await checkMarginsIn(section)).toEqual(CHECK_MARGINS);
            expect(await marginsOf(firstCheckbox(section))).toEqual(margins(CHECKBOX_MARGIN, CHECKBOX_MARGIN));
        }
        await drawn.unmount();

        const exported = await mount(<ExportedLooksPair value={CHECK_ITEM_DOCUMENT} />);
        const classes = exported.getByTestId('classes');
        const inline = exported.getByTestId('inline');
        await removeClasses(inline);

        expect(await checkMarginsIn(classes)).toEqual(CHECK_MARGINS);
        expect(await marginsOf(firstCheckbox(classes))).toEqual(margins(CHECKBOX_MARGIN, CHECKBOX_MARGIN));
        expect(await checkMarginsIn(inline)).toEqual(CHECK_MARGINS);
        // Without its class the checkbox has the browser's margins; the export must not space it.
        await expect(firstCheckbox(inline)).not.toHaveAttribute('style');
    });
});
