/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Locator } from '@playwright/test';

import { ColumnCollapseFrame } from './ColumnCollapseFrame';

// With `collapse: true` the columns of `columnBreakContent` collapse to one in a narrow container, as the legacy editor did.

const SURFACES = ['renderer', 'editor'] as const;

const TWO_COLUMNS = 2;
const THREE_COLUMNS = 3;

const TWO_COLUMNS_ROOMY_WIDTH = 440;
const TWO_COLUMNS_NARROW_WIDTH = 439;
const THREE_COLUMNS_ROOMY_WIDTH = 740;
const THREE_COLUMNS_NARROW_WIDTH = 739;
const THREE_COLUMNS_NARROWER_WIDTH = 600;

const SIZE_CONTAINER_TYPE = 'inline-size';
const NO_CONTAINER_TYPE = 'normal';

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

type ColumnCase = { columns: number; collapse: boolean; width: number; layout: Layout };

const CASES: readonly ColumnCase[] = [
    { columns: TWO_COLUMNS, collapse: true, width: TWO_COLUMNS_ROOMY_WIDTH, layout: 'side by side' },
    { columns: TWO_COLUMNS, collapse: true, width: TWO_COLUMNS_NARROW_WIDTH, layout: 'one column' },
    { columns: THREE_COLUMNS, collapse: true, width: THREE_COLUMNS_ROOMY_WIDTH, layout: 'side by side' },
    { columns: THREE_COLUMNS, collapse: true, width: THREE_COLUMNS_NARROW_WIDTH, layout: 'one column' },
    { columns: THREE_COLUMNS, collapse: true, width: THREE_COLUMNS_NARROWER_WIDTH, layout: 'one column' },
    { columns: TWO_COLUMNS, collapse: false, width: TWO_COLUMNS_NARROW_WIDTH, layout: 'side by side' },
    { columns: THREE_COLUMNS, collapse: false, width: THREE_COLUMNS_NARROWER_WIDTH, layout: 'side by side' },
];

const collapseSuffix = (collapse: boolean): string => {
    if (collapse) {
        return 'with collapse';
    }

    return 'without collapse';
};

/** The container type of the element around the content, which is the parent of the editable or rendered root. */
const containerTypeAround = (paragraph: Locator): Promise<string> =>
    paragraph.evaluate((element) => {
        const around = element.parentElement?.parentElement;
        if (around === null || around === undefined) {
            throw new Error('The paragraph has no element around its content');
        }

        return getComputedStyle(around).containerType;
    });

for (const surface of SURFACES) {
    test.describe(`the columns in the ${surface}`, () => {
        for (const { columns, collapse, width, layout } of CASES) {
            test(`of ${columns} columns in ${width}px are ${layout} ${collapseSuffix(collapse)}`, async ({ mount }) => {
                const component = await mount(
                    <ColumnCollapseFrame columns={columns} collapse={collapse} width={width} />,
                );
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

        test('adds a size container with collapse', async ({ mount }) => {
            const component = await mount(
                <ColumnCollapseFrame columns={TWO_COLUMNS} collapse width={TWO_COLUMNS_ROOMY_WIDTH} />,
            );
            const paragraph = component.getByTestId(surface).getByText('First', { exact: true });

            expect(await containerTypeAround(paragraph)).toBe(SIZE_CONTAINER_TYPE);
        });

        test('adds no size container without collapse', async ({ mount }) => {
            const component = await mount(
                <ColumnCollapseFrame columns={TWO_COLUMNS} collapse={false} width={TWO_COLUMNS_ROOMY_WIDTH} />,
            );
            const paragraph = component.getByTestId(surface).getByText('First', { exact: true });

            expect(await containerTypeAround(paragraph)).toBe(NO_CONTAINER_TYPE);
        });
    });
}
