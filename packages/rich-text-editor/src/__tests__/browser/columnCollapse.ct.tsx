/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { ColumnCollapseFrame } from './ColumnCollapseFrame';

// The columns of `columnBreakContent` collapse to one in a narrow container, as the legacy editor did.

const SURFACES = ['renderer', 'editor'] as const;

const TWO_COLUMNS = 2;
const THREE_COLUMNS = 3;

const TWO_COLUMNS_ROOMY_WIDTH = 440;
const TWO_COLUMNS_NARROW_WIDTH = 439;
const THREE_COLUMNS_ROOMY_WIDTH = 740;
const THREE_COLUMNS_NARROW_WIDTH = 739;
const THREE_COLUMNS_NARROWER_WIDTH = 600;

/** How far two paragraphs of one row may differ in top, in pixels. */
const SAME_ROW_TOLERANCE = 2;

type Box = NonNullable<Awaited<ReturnType<Locator['boundingBox']>>>;

const boxOf = async (locator: Locator): Promise<Box> => {
    const box = await locator.boundingBox();
    if (box === null) {
        throw new Error(`${locator.toString()} has no box on the page`);
    }

    return box;
};

type Layout = 'side by side' | 'one column';

type ColumnCase = { columns: number; width: number; layout: Layout };

const CASES: readonly ColumnCase[] = [
    { columns: TWO_COLUMNS, width: TWO_COLUMNS_ROOMY_WIDTH, layout: 'side by side' },
    { columns: TWO_COLUMNS, width: TWO_COLUMNS_NARROW_WIDTH, layout: 'one column' },
    { columns: THREE_COLUMNS, width: THREE_COLUMNS_ROOMY_WIDTH, layout: 'side by side' },
    { columns: THREE_COLUMNS, width: THREE_COLUMNS_NARROW_WIDTH, layout: 'one column' },
    { columns: THREE_COLUMNS, width: THREE_COLUMNS_NARROWER_WIDTH, layout: 'one column' },
];

for (const surface of SURFACES) {
    test.describe(`the columns in the ${surface}`, () => {
        for (const { columns, width, layout } of CASES) {
            test(`of ${columns} columns in ${width}px are ${layout}`, async ({ mount }) => {
                const component = await mount(<ColumnCollapseFrame columns={columns} width={width} />);
                const root = component.getByTestId(surface);
                const first = await boxOf(root.getByText('First', { exact: true }));
                const second = await boxOf(root.getByText('Second', { exact: true }));
                const third = await boxOf(root.getByText('Third', { exact: true }));

                if (layout === 'side by side') {
                    expect(second.x).toBeGreaterThan(first.x);
                    expect(Math.abs(second.y - first.y)).toBeLessThanOrEqual(SAME_ROW_TOLERANCE);
                    if (columns === THREE_COLUMNS) {
                        expect(third.x).toBeGreaterThan(second.x);
                        expect(Math.abs(third.y - first.y)).toBeLessThanOrEqual(SAME_ROW_TOLERANCE);
                    }
                    return;
                }

                expect(second.x).toBe(first.x);
                expect(second.y).toBeGreaterThan(first.y);
                expect(third.x).toBe(first.x);
                expect(third.y).toBeGreaterThan(second.y);
            });
        }
    });
}
