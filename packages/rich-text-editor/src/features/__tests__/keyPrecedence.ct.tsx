/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';
import { type Page } from '@playwright/test';

import { frames } from '#/react/__tests__/fixtures/overlayHarness';

import { KeyProbe, type KeyProbeProps } from './fixtures/KeyProbe';

type Probe = NonNullable<Window['keyProbe']>;
type Block = KeyProbeProps['blocks'] extends readonly (infer B)[] | undefined ? B : never;

const p = (text?: string): Block => {
    if (text === undefined) {
        return { type: 'paragraph' };
    }
    return { type: 'paragraph', content: [{ type: 'text', text }] };
};
const bullets = (...items: readonly string[]): Block => ({
    type: 'bullet_list',
    content: items.map((text) => ({ type: 'list_item', content: [p(text)] })),
});

const surfaceOf = (page: Page) => page.getByRole('textbox', { name: 'Notes' });
const listOf = (page: Page) => page.getByRole('listbox', { name: 'Mention suggestions' });
const bubbleOf = (page: Page) => page.locator('[data-rte-bubble-toolbar]');

const ready = async (page: Page) => {
    await expect(surfaceOf(page)).toHaveAttribute('contenteditable', 'true');
    await expect.poll(() => page.evaluate(() => window.keyProbe !== undefined)).toBe(true);
};
/** Focuses the surface with the caret `offset` characters into the first match of `text`. */
const caretIn = async (page: Page, text: string, offset = text.length) => {
    await surfaceOf(page).focus();
    // ProseMirror rewrites the DOM selection 20 ms after focus, which would undo a native key like Shift+Home pressed first.
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 20)));
    await page.evaluate(
        ([after, at]) => {
            const probe = window.keyProbe as Probe;
            probe.setSelection(probe.handle, { text: after, from: at, to: at });
        },
        [text, offset] as const,
    );
};
/** Each block as its type with its children, and text as itself: `bullet_list(list_item(paragraph(one)))`. */
const shapeOf = (page: Page) =>
    page.evaluate(() => {
        interface Node_ {
            readonly type: string;
            readonly text?: string;
            readonly content?: readonly Node_[];
        }
        const shape = (node: Node_): string => {
            if (node.type === 'text') {
                return node.text ?? '';
            }
            if (node.content === undefined) {
                return node.type;
            }
            return `${node.type}(${node.content.map(shape).join('|')})`;
        };
        const blocks = (window.keyProbe as Probe).handle.getSnapshot().document.content.content ?? [];
        return (blocks as readonly Node_[]).map(shape);
    });
/** The last keydown the host heard: its key and whether it arrived prevented. */
const lastKey = (page: Page) => page.evaluate(() => (window.keyProbe as Probe).prevented.at(-1));
const submitted = (page: Page) => page.evaluate(() => (window.keyProbe as Probe).submitted);

interface Case {
    readonly name: string;
    readonly probe: KeyProbeProps;
    readonly run: (page: Page) => Promise<void>;
}

/** Presses `key` with the caret at the end of `text` and expects the document to become `shape`. */
const pressTo =
    (text: string, key: string, shape: readonly string[], offset?: number) =>
    async (page: Page): Promise<void> => {
        await caretIn(page, text, offset);
        await page.keyboard.press(key);

        await expect.poll(() => shapeOf(page)).toEqual(shape);
        await expect(surfaceOf(page)).toBeFocused();
    };

/** Presses `key` with the caret at the end of `text` and expects focus to leave with the document kept. */
const focusLeavesOn =
    (text: string, key: string) =>
    async (page: Page): Promise<void> => {
        await caretIn(page, text);
        const before = await shapeOf(page);
        await page.keyboard.press(key);

        await expect(surfaceOf(page)).not.toBeFocused();
        expect(await lastKey(page)).toEqual(['Tab', false]);
        expect(await shapeOf(page)).toEqual(before);
    };

/** Presses Escape with nothing shown and expects no change and the event left to the host. */
const escapeLeftToHost =
    (text: string) =>
    async (page: Page): Promise<void> => {
        await caretIn(page, text);
        const before = await shapeOf(page);
        await page.keyboard.press('Escape');

        expect(await lastKey(page)).toEqual(['Escape', false]);
        expect(await shapeOf(page)).toEqual(before);
        await expect(surfaceOf(page)).toBeFocused();
    };

/**
 * Sends `key` as a composition's keydown, with `isComposing` set, or with only `keyCode` 229 as Safari sends the Enter
 * that commits a composition, and expects the editor to leave it to the browser.
 */
const leftToComposition =
    (key: string, signal: 'isComposing' | 'keyCode') =>
    async (page: Page): Promise<void> => {
        await caretIn(page, 'Hello');
        const prevented = await surfaceOf(page).evaluate(
            (surface, [name, by]) => {
                let init: KeyboardEventInit & { keyCode?: number } = { isComposing: true };
                if (by === 'keyCode') {
                    init = { keyCode: 229 };
                }
                const event = new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true, ...init });
                surface.dispatchEvent(event);
                return event.defaultPrevented;
            },
            [key, signal] as const,
        );

        expect(prevented).toBe(false);
        expect(await shapeOf(page)).toEqual(['paragraph(Hello)']);
    };

/** Opens the mention list on `@ad` typed after `text`, with its one option. */
const mentionListAfter = async (page: Page, text: string) => {
    await caretIn(page, text);
    await page.keyboard.type(' @ad');
    await expect(listOf(page).getByRole('option')).toHaveCount(1);
};

/** Fires the bold input rule after `text` and a space, or in an empty first paragraph. */
const boldRuleAfter = async (page: Page, text?: string) => {
    if (text === undefined) {
        await surfaceOf(page).focus();
        await page.keyboard.type('**b**');
    } else {
        await caretIn(page, text);
        await page.keyboard.type(' **b**');
    }
    await expect.poll(() => surfaceOf(page).locator('strong').count()).toBe(1);
};

const document = { features: 'document' } as const;
const comment = { features: 'comment' } as const;

// One case per row of the Key precedence table and key it handles. Deferred: row 5 (table cells, TASK-rte-tables)
// and row 8a (indented blocks, blocks.indent in TASK-rte-extras), whose features are 1.x. Row 4's profile submit keys
// run in surface-keys.ct.tsx, and the Comment profile's Enter in enter-keys.spec.tsx.
const ROWS: readonly Case[] = [
    ...['Enter', 'Backspace', 'Tab', 'Escape'].flatMap((key): Case[] => [
        {
            name: `row 1, composition active: leaves ${key} with isComposing to the browser`,
            probe: { ...document, blocks: [p('Hello')] },
            run: leftToComposition(key, 'isComposing'),
        },
        {
            name: `row 1, composition active: leaves ${key} with only keyCode 229 to the browser`,
            probe: { ...document, blocks: [p('Hello')] },
            run: leftToComposition(key, 'keyCode'),
        },
    ]),
    {
        name: 'row 2, suggestion list open: Enter accepts the active option',
        probe: { ...comment, blocks: [p('Hi')] },
        run: async (page) => {
            await mentionListAfter(page, 'Hi');
            await page.keyboard.press('Enter');

            await expect(listOf(page)).toHaveCount(0);
            await expect.poll(() => shapeOf(page)).toEqual(['paragraph(Hi |mention| )']);
        },
    },
    {
        name: 'row 2, suggestion list open: Backspace edits the query and keeps the list',
        probe: { ...comment, blocks: [p('Hi')] },
        run: async (page) => {
            await mentionListAfter(page, 'Hi');
            await page.keyboard.press('Backspace');

            await expect(listOf(page)).toBeVisible();
            await expect.poll(() => shapeOf(page)).toEqual(['paragraph(Hi @a)']);
        },
    },
    {
        name: 'row 2, suggestion list open: Tab accepts the active option',
        probe: { ...comment, blocks: [p('Hi')] },
        run: async (page) => {
            await mentionListAfter(page, 'Hi');
            await page.keyboard.press('Tab');

            await expect(listOf(page)).toHaveCount(0);
            await expect.poll(() => shapeOf(page)).toEqual(['paragraph(Hi |mention| )']);
            await expect(surfaceOf(page)).toBeFocused();
        },
    },
    {
        name: 'row 2, suggestion list open: Shift+Tab closes the list, keeps the text and moves focus back',
        probe: { ...comment, blocks: [p('Hi')] },
        run: async (page) => {
            await mentionListAfter(page, 'Hi');
            await page.keyboard.press('Shift+Tab');

            await expect(listOf(page)).toHaveCount(0);
            await expect(surfaceOf(page)).not.toBeFocused();
            expect(await shapeOf(page)).toEqual(['paragraph(Hi @ad)']);
        },
    },
    {
        name: 'row 2, suggestion list open: Escape closes the list and keeps the text',
        probe: { ...comment, blocks: [p('Hi')] },
        run: async (page) => {
            await mentionListAfter(page, 'Hi');
            await page.keyboard.press('Escape');

            await expect(listOf(page)).toHaveCount(0);
            await expect(surfaceOf(page)).toBeFocused();
            expect(await shapeOf(page)).toEqual(['paragraph(Hi @ad)']);
        },
    },
    {
        name: 'row 3, right after an input rule: Backspace undoes the rule',
        probe: document,
        run: async (page) => {
            await boldRuleAfter(page);
            await page.keyboard.press('Backspace');

            await expect.poll(() => shapeOf(page)).toEqual(['paragraph(**b**)']);
        },
    },
    {
        name: 'row 3, right after an input rule: Enter passes to the next row and splits the paragraph',
        probe: document,
        run: async (page) => {
            await boldRuleAfter(page);
            await page.keyboard.press('Enter');

            await expect.poll(() => shapeOf(page)).toEqual(['paragraph(b)', 'paragraph']);
        },
    },
    {
        name: 'row 3, right after an input rule: Tab passes to the next row and moves focus out',
        probe: document,
        run: async (page) => {
            await boldRuleAfter(page);
            await page.keyboard.press('Tab');

            await expect(surfaceOf(page)).not.toBeFocused();
            expect(await shapeOf(page)).toEqual(['paragraph(b)']);
        },
    },
    {
        name: 'row 3, right after an input rule: Escape passes to the next row and reaches the host',
        probe: document,
        run: async (page) => {
            await boldRuleAfter(page);
            await page.keyboard.press('Escape');

            expect(await lastKey(page)).toEqual(['Escape', false]);
            expect(await shapeOf(page)).toEqual(['paragraph(b)']);
        },
    },
    {
        name: 'row 4, a definition whose policy makes Enter submit: Enter submits',
        probe: { ...comment, enterBehavior: 'submit', blocks: [p('Hello')] },
        run: async (page) => {
            await caretIn(page, 'Hello');
            await page.keyboard.press('Enter');

            await expect.poll(() => submitted(page)).toEqual(['Hello']);
            expect(await shapeOf(page)).toEqual(['paragraph(Hello)']);
        },
    },
    {
        name: 'row 4, a definition whose policy makes Enter submit: Shift+Enter runs as Enter and splits a list item',
        probe: { ...comment, enterBehavior: 'submit', blocks: [bullets('one')] },
        run: pressTo('one', 'Shift+Enter', ['bullet_list(list_item(paragraph(one))|list_item(paragraph))']),
    },
    {
        name: 'row 4, a definition whose policy makes Enter submit: Backspace passes to the next rows',
        probe: { ...comment, enterBehavior: 'submit', blocks: [p('Hello')] },
        run: pressTo('Hello', 'Backspace', ['paragraph(Hell)']),
    },
    {
        name: 'row 4, a definition whose policy makes Enter submit: Tab passes to the next rows and moves focus out',
        probe: { ...comment, enterBehavior: 'submit', blocks: [p('Hello')] },
        run: focusLeavesOn('Hello', 'Tab'),
    },
    {
        name: 'row 4, a definition whose policy makes Enter submit: Escape passes to the next rows and reaches the host',
        probe: { ...comment, enterBehavior: 'submit', blocks: [p('Hello')] },
        run: escapeLeftToHost('Hello'),
    },
    {
        name: 'row 6, code block: Enter inserts a newline',
        probe: { ...document, blocks: [{ type: 'code_block', content: [{ type: 'text', text: 'x = 1' }] }] },
        run: pressTo('x = 1', 'Enter', ['code_block(x = 1\n)']),
    },
    {
        name: 'row 6, code block: Mod+Enter leaves the block',
        probe: { ...document, blocks: [{ type: 'code_block', content: [{ type: 'text', text: 'x = 1' }] }] },
        run: pressTo('x = 1', 'ControlOrMeta+Enter', ['code_block(x = 1)', 'paragraph']),
    },
    {
        name: 'row 6, code block: Backspace deletes the character before the caret',
        probe: { ...document, blocks: [{ type: 'code_block', content: [{ type: 'text', text: 'x = 1' }] }] },
        run: pressTo('x = 1', 'Backspace', ['code_block(x = )']),
    },
    {
        name: 'row 6, code block: Tab moves focus out of the editor',
        probe: { ...document, blocks: [{ type: 'code_block', content: [{ type: 'text', text: 'x = 1' }] }] },
        run: focusLeavesOn('x = 1', 'Tab'),
    },
    {
        name: 'row 6, code block: Shift+Tab moves focus out of the editor',
        probe: { ...document, blocks: [{ type: 'code_block', content: [{ type: 'text', text: 'x = 1' }] }] },
        run: focusLeavesOn('x = 1', 'Shift+Tab'),
    },
    {
        name: 'row 6, code block: Escape passes to the next row and reaches the host',
        probe: { ...document, blocks: [{ type: 'code_block', content: [{ type: 'text', text: 'x = 1' }] }] },
        run: escapeLeftToHost('x = 1'),
    },
    {
        name: 'row 7, list item: Enter splits the item',
        probe: { ...document, blocks: [bullets('one', 'two')] },
        run: pressTo('one', 'Enter', [
            'bullet_list(list_item(paragraph(one))|list_item(paragraph)|list_item(paragraph(two)))',
        ]),
    },
    {
        name: 'row 7, list item: Backspace at the start of a top-level item turns it into a paragraph',
        probe: { ...document, blocks: [bullets('one', 'two')] },
        run: pressTo('two', 'Backspace', ['bullet_list(list_item(paragraph(one)))', 'paragraph(two)'], 0),
    },
    {
        name: 'row 7, list item: Tab nests an item under its previous sibling',
        probe: { ...document, blocks: [bullets('one', 'two')] },
        run: pressTo('two', 'Tab', ['bullet_list(list_item(paragraph(one)|bullet_list(list_item(paragraph(two)))))']),
    },
    {
        name: 'row 7, list item: Tab moves focus out of an item that cannot move',
        probe: { ...document, blocks: [bullets('one', 'two')] },
        run: focusLeavesOn('one', 'Tab'),
    },
    {
        name: 'row 7, list item: Shift+Tab turns a top-level item into a paragraph',
        probe: { ...document, blocks: [bullets('one', 'two')] },
        run: pressTo('two', 'Shift+Tab', ['bullet_list(list_item(paragraph(one)))', 'paragraph(two)']),
    },
    {
        name: 'row 7, list item: Escape passes to the next row and reaches the host',
        probe: { ...document, blocks: [bullets('one', 'two')] },
        run: escapeLeftToHost('one'),
    },
    {
        name: 'row 8, empty last paragraph of a quote: Enter leaves the quote',
        probe: { ...document, blocks: [{ type: 'blockquote', content: [p('quoted')] }, p('after')] },
        run: async (page) => {
            await caretIn(page, 'quoted');
            // The first Enter splits as row 10 does, leaving the caret in an empty last paragraph of the quote.
            await page.keyboard.press('Enter');
            await expect
                .poll(() => shapeOf(page))
                .toEqual(['blockquote(paragraph(quoted)|paragraph)', 'paragraph(after)']);
            await page.keyboard.press('Enter');

            await expect
                .poll(() => shapeOf(page))
                .toEqual(['blockquote(paragraph(quoted))', 'paragraph', 'paragraph(after)']);
        },
    },
    {
        name: 'row 8, empty last paragraph of a quote in a comment whose Enter submits: Shift+Enter leaves the quote and submits nothing',
        probe: {
            ...comment,
            enterBehavior: 'submit',
            blocks: [{ type: 'blockquote', content: [p('quoted')] }, p('after')],
        },
        run: async (page) => {
            await caretIn(page, 'quoted');
            await page.keyboard.press('Shift+Enter');
            await expect
                .poll(() => shapeOf(page))
                .toEqual(['blockquote(paragraph(quoted)|paragraph)', 'paragraph(after)']);
            await page.keyboard.press('Shift+Enter');

            await expect
                .poll(() => shapeOf(page))
                .toEqual(['blockquote(paragraph(quoted))', 'paragraph', 'paragraph(after)']);
            expect(await submitted(page)).toEqual([]);
        },
    },
    ...(['Backspace', 'Tab', 'Escape'] as const).map(
        (key): Case => ({
            name: `row 8, empty last paragraph of a quote: ${key} passes to the next rows`,
            probe: { ...document, blocks: [{ type: 'blockquote', content: [p('quoted')] }, p('after')] },
            run: async (page) => {
                await caretIn(page, 'quoted');
                await page.keyboard.press('Enter');
                await expect
                    .poll(() => shapeOf(page))
                    .toEqual(['blockquote(paragraph(quoted)|paragraph)', 'paragraph(after)']);
                await page.keyboard.press(key);

                if (key === 'Backspace') {
                    await expect
                        .poll(() => shapeOf(page))
                        .toEqual(['blockquote(paragraph(quoted))', 'paragraph(after)']);
                    return;
                }
                expect(await lastKey(page)).toEqual([key, false]);
                expect(await shapeOf(page)).toEqual(['blockquote(paragraph(quoted)|paragraph)', 'paragraph(after)']);
            },
        }),
    ),
    {
        name: 'row 9, caret right after a column break: Backspace removes the break',
        probe: { features: 'brand-document', blocks: [p('one'), { type: 'column_break' }, p('two')] },
        run: pressTo('two', 'Backspace', ['paragraph(one)', 'paragraph(two)'], 0),
    },
    {
        name: 'row 9, caret right after a column break: Enter passes to the next rows and adds a paragraph',
        probe: { features: 'brand-document', blocks: [p('one'), { type: 'column_break' }, p('two')] },
        run: pressTo('two', 'Enter', ['paragraph(one)', 'column_break', 'paragraph', 'paragraph(two)'], 0),
    },
    {
        name: 'row 9, caret right after a column break: Tab passes to the next rows and moves focus out',
        probe: { features: 'brand-document', blocks: [p('one'), { type: 'column_break' }, p('two')] },
        run: async (page) => {
            await caretIn(page, 'two', 0);
            await page.keyboard.press('Tab');

            await expect(surfaceOf(page)).not.toBeFocused();
            expect(await lastKey(page)).toEqual(['Tab', false]);
        },
    },
    {
        name: 'row 9, caret right after a column break: Escape passes to the next rows and reaches the host',
        probe: { features: 'brand-document', blocks: [p('one'), { type: 'column_break' }, p('two')] },
        run: async (page) => {
            await caretIn(page, 'two', 0);
            await page.keyboard.press('Escape');

            expect(await lastKey(page)).toEqual(['Escape', false]);
            expect(await shapeOf(page)).toEqual(['paragraph(one)', 'column_break', 'paragraph(two)']);
        },
    },
    {
        name: 'row 10, anywhere else: Enter splits the paragraph',
        probe: { ...document, blocks: [p('Hello')] },
        run: pressTo('Hello', 'Enter', ['paragraph(Hel)', 'paragraph(lo)'], 3),
    },
    {
        name: 'row 10, anywhere else: Backspace joins the paragraph to the one before',
        probe: { ...document, blocks: [p('one'), p('two')] },
        run: pressTo('two', 'Backspace', ['paragraph(onetwo)'], 0),
    },
    {
        name: 'row 10, anywhere else: Tab moves focus out of the editor',
        probe: { ...document, blocks: [p('Hello')] },
        run: focusLeavesOn('Hello', 'Tab'),
    },
    {
        name: 'row 10, anywhere else: Shift+Tab moves focus out of the editor',
        probe: { ...document, blocks: [p('Hello')] },
        run: focusLeavesOn('Hello', 'Shift+Tab'),
    },
    {
        name: 'row 10, anywhere else: Escape closes the bubble toolbar and prevents the event',
        probe: { ...document, bubble: true, blocks: [p('Hello')] },
        run: async (page) => {
            await caretIn(page, 'Hello');
            await page.keyboard.press('Shift+Home');
            await expect(bubbleOf(page)).toBeVisible();
            await page.keyboard.press('Escape');

            await expect(bubbleOf(page)).toBeHidden();
            expect(await lastKey(page)).toEqual(['Escape', true]);
        },
    },
    {
        name: 'row 10, anywhere else: Escape with nothing shown reaches the host unprevented',
        probe: { ...document, blocks: [p('Hello')] },
        run: escapeLeftToHost('Hello'),
    },
];

// Where two rows match, the earlier one wins, whatever order the host lists its features in.
const OVERLAPS: readonly Case[] = [
    {
        name: 'a mention list open inside a list item: Enter accepts the option, never splits the item',
        probe: { ...comment, blocks: [bullets('one', 'Hi')] },
        run: async (page) => {
            await mentionListAfter(page, 'Hi');
            await page.keyboard.press('Enter');

            await expect(listOf(page)).toHaveCount(0);
            await expect
                .poll(() => shapeOf(page))
                .toEqual(['bullet_list(list_item(paragraph(one))|list_item(paragraph(Hi |mention| )))']);
        },
    },
    {
        name: 'a mention list open inside a list item: Tab accepts the option, never nests the item',
        probe: { ...comment, blocks: [bullets('one', 'Hi')] },
        run: async (page) => {
            await mentionListAfter(page, 'Hi');
            await page.keyboard.press('Tab');

            await expect(listOf(page)).toHaveCount(0);
            await expect
                .poll(() => shapeOf(page))
                .toEqual(['bullet_list(list_item(paragraph(one))|list_item(paragraph(Hi |mention| )))']);
        },
    },
    {
        name: 'an input rule just fired in a comment whose Enter submits: Backspace undoes the rule and submits nothing',
        probe: { ...comment, enterBehavior: 'submit' },
        run: async (page) => {
            await boldRuleAfter(page);
            await page.keyboard.press('Backspace');

            await expect.poll(() => shapeOf(page)).toEqual(['paragraph(**b**)']);
            expect(await submitted(page)).toEqual([]);
        },
    },
    {
        name: 'an input rule just fired in a comment whose Enter submits: Enter passes the rule row and submits',
        probe: { ...comment, enterBehavior: 'submit' },
        run: async (page) => {
            await boldRuleAfter(page);
            await page.keyboard.press('Enter');

            await expect.poll(() => submitted(page)).toEqual(['b']);
            expect(await shapeOf(page)).toEqual(['paragraph(b)']);
        },
    },
    {
        name: 'an input rule just fired inside a list item: Backspace undoes the rule and keeps the item',
        probe: { ...document, blocks: [bullets('one')] },
        run: async (page) => {
            await boldRuleAfter(page, 'one');
            await page.keyboard.press('Backspace');

            await expect.poll(() => shapeOf(page)).toEqual(['bullet_list(list_item(paragraph(one **b**)))']);
        },
    },
    {
        name: 'the bubble toolbar shown inside a host Dialog: Escape closes the bubble and leaves the dialog open',
        probe: { ...document, bubble: true, inDialog: true, blocks: [p('Hello')] },
        run: async (page) => {
            await caretIn(page, 'Hello');
            await page.keyboard.press('Shift+Home');
            await expect(bubbleOf(page)).toBeVisible();
            // Radix gives the bubble the Escape key a few renders after it shows, so until then the host Dialog gets it.
            await frames(page);
            await page.keyboard.press('Escape');

            await expect(bubbleOf(page)).toBeHidden();
            await expect(page.getByRole('dialog', { name: 'Host dialog' })).toBeVisible();
            expect(await page.evaluate(() => (window.keyProbe as Probe).hostDialogChanges)).toEqual([]);
        },
    },
];

for (const { name, probe, run } of ROWS) {
    test(name, async ({ mount, page }) => {
        await mount(<KeyProbe {...probe} />);
        await ready(page);

        await run(page);
    });
}

for (const { name, probe, run } of OVERLAPS) {
    for (const reversed of [false, true]) {
        const order = reversed ? 'with the feature list reversed' : 'with the feature list in order';
        test(`${name}, ${order}`, async ({ mount, page }) => {
            await mount(<KeyProbe {...probe} reversed={reversed} />);
            await ready(page);

            await run(page);
        });
    }
}
