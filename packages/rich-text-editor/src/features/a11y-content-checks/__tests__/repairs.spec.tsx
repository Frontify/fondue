/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { COALESCE_MS } from '#/bridge/announcer';
import { core, emoji, fontColor } from '#/features';
import { fixtureTableEditor } from '#/features/__tests__/fixtures/editors';
import { fixturePickerPanel, openFind } from '#/features/__tests__/fixtures/panels';
import { mountText, textModel } from '#/react/__tests__/fixtures/text';
import { CHECK_DELAY_MS, contentChecksOf } from '#/runtime/content-issues';
import { positionOf } from '#/runtime/positions';
import { SETTLE_MS } from '#/runtime/settle';
import { setSelection, typeText } from '#/testing';

import {
    checksFeatures,
    checksModel,
    colored,
    headingBlock,
    image,
    link,
    mountChecks,
    para,
    table,
    text,
} from './fixtures/checks';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

type Mounted = ReturnType<typeof mountChecks>;

const openPanel = () => {
    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Accessibility checks' }));
    });
    return screen.getByRole('region', { name: 'Accessibility checks' });
};

const itemOf = (id: string) => {
    const panel = screen.getByRole('region', { name: 'Accessibility checks' });
    return within(panel)
        .getAllByRole('listitem')
        .find((element) => element.getAttribute('data-rte-issue-id') === id);
};

const listed = () =>
    within(screen.getByRole('region', { name: 'Accessibility checks' }))
        .getAllByRole('listitem')
        .map((item) => item.getAttribute('data-rte-issue-id'));

const summary = () => within(screen.getByRole('region', { name: 'Accessibility checks' })).getByRole('heading');

/** Focuses the issue's Fix button and presses it, as the keyboard does. */
const fix = (id: string) => {
    const item = itemOf(id);
    if (item === undefined) {
        throw new Error(`No issue ${id} is listed.`);
    }
    const button = within(item).getByRole('button', { name: 'Fix' });
    act(() => {
        button.focus();
        fireEvent.click(button);
    });
    return button;
};

const flush = async () => {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
    });
};

const nextCheck = () =>
    act(() => {
        vi.advanceTimersByTime(CHECK_DELAY_MS);
    });

const blockTypes = ({ handle }: Mounted) =>
    (handle.getSnapshot().document.content.content ?? []).map((node) => node.type);

const insertParagraph = ({ view }: Mounted, value: string) =>
    act(() => {
        const { schema } = view.state;
        const paragraph = schema.nodes.paragraph?.create(null, schema.text(value));
        if (paragraph === undefined) {
            throw new Error('The model has no paragraph.');
        }
        view.dispatch(view.state.tr.insert(0, paragraph));
    });

const undo = ({ handle }: Mounted) =>
    act(() => {
        handle.execute('history.undo');
    });

describe('an issues panel repair', () => {
    it('turns an empty heading into a paragraph as one undo step with origin command, then the issue leaves at the next check', () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        openPanel();

        const button = fix('heading.empty:empty');

        expect(blockTypes(mounted)).toEqual(['paragraph', 'paragraph']);
        expect(mounted.changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([
            ['command', 'paragraph.set'],
        ]);
        expect(listed()).toContain('heading.empty:empty');
        expect(document.activeElement).toBe(button);

        nextCheck();

        expect(listed()).not.toContain('heading.empty:empty');
        expect(document.activeElement).toBe(summary());
        undo(mounted);
        expect(blockTypes(mounted)).toEqual(['paragraph', 'heading']);
        mounted.unmount();
    });

    it('sets a skipped heading one level below the previous one as one undo step with origin command', () => {
        const mounted = mountChecks({ blocks: [headingBlock('top', 2, 'Top'), headingBlock('deep', 5, 'Deep')] });
        openPanel();

        fix('heading.skipped-level:deep');

        const levels = () =>
            (mounted.handle.getSnapshot().document.content.content ?? []).map((node) => node.attrs?.level);
        expect(levels()).toEqual([2, 3]);
        expect(mounted.changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([
            ['command', 'heading.set'],
        ]);
        nextCheck();
        expect(listed()).not.toContain('heading.skipped-level:deep');
        undo(mounted);
        expect(levels()).toEqual([2, 5]);
        mounted.unmount();
    });

    it('sets the deepest creatable level above it when the next level is not creatable', () => {
        const mounted = mountChecks({
            blocks: [headingBlock('top', 2, 'Top'), headingBlock('deep', 5, 'Deep')],
            policy: { creatableHeadingLevels: [1, 2, 4, 5] },
        });
        openPanel();

        const skipped = contentChecksOf(mounted.runtime.state)?.issues.find(
            ({ issue }) => issue.id === 'heading.skipped-level:deep',
        );
        expect(skipped?.issue).toMatchObject({
            repairCommand: 'heading.set',
            repairPayload: { level: 2 },
        });
        mounted.unmount();
    });

    it('offers the contrast and language repairs that the colour and language editor parts install, in the issues data', () => {
        const mounted = mountChecks({ blocks: [para(colored('Pale words', 'pale'))] });
        openPanel();

        const issues = contentChecksOf(mounted.runtime.state)?.issues;
        const repairs = (issues ?? []).map(({ issue }) => [issue.ruleId, issue.repairCommand]);

        expect(repairs).toContainEqual(['contrast.low', 'mark.color.menu.open']);
        expect(repairs).toContainEqual(['language.parts-review', 'mark.language.edit']);
        mounted.unmount();
    });

    it('opens the alternative text dialog, which returns focus to the Fix button on Escape and on Save', async () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), image('photo')] });
        openPanel();

        const button = fix('image.alt-missing:photo');
        await flush();
        const dialog = screen.getByRole('dialog', { name: 'Alternative text' });
        act(() => {
            fireEvent.keyDown(dialog, { key: 'Escape' });
        });
        await flush();

        expect(screen.queryByRole('dialog', { name: 'Alternative text' })).toBeNull();
        expect(document.activeElement).toBe(button);

        fix('image.alt-missing:photo');
        await flush();
        act(() => {
            fireEvent.click(
                within(screen.getByRole('dialog', { name: 'Alternative text' })).getByRole('radio', {
                    name: /Decorative/,
                }),
            );
        });
        act(() => {
            fireEvent.click(
                within(screen.getByRole('dialog', { name: 'Alternative text' })).getByRole('button', { name: 'Save' }),
            );
        });
        await flush();

        expect(document.activeElement).toBe(button);
        expect(mounted.changes).toHaveLength(1);
        nextCheck();
        expect(listed()).not.toContain('image.alt-missing:photo');
        expect(document.activeElement).toBe(summary());
        mounted.unmount();
    });

    it('opens the link popover at the link, which returns focus to the Fix button on Escape and after Apply', async () => {
        const mounted = mountChecks({ blocks: [para(text('Read '), link('here'))] });
        openPanel();

        const button = fix('link.text-vague:0,1');
        await flush();
        const popover = screen.getByRole('dialog', { name: 'Link' });
        expect(within(popover).getByRole('textbox', { name: 'Text' })).toHaveValue('here');
        act(() => {
            fireEvent.keyDown(popover, { key: 'Escape' });
        });
        await flush();
        expect(document.activeElement).toBe(button);

        fix('link.text-vague:0,1');
        await flush();
        act(() => {
            fireEvent.change(
                within(screen.getByRole('dialog', { name: 'Link' })).getByRole('textbox', { name: 'Text' }),
                {
                    target: { value: 'the pricing page' },
                },
            );
        });
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Apply' }));
        });
        await flush();

        expect(document.activeElement).toBe(button);
        const first = mounted.handle.getSnapshot().document.content.content?.[0];
        const children = first?.content;
        const second = children?.[1];
        expect(second?.text).toBe('the pricing page');
        nextCheck();
        expect(listed()).not.toContain('link.text-vague:0,1');
        mounted.unmount();
    });

    it('opens the colour menu with only the tokens that pass, and returns focus to the Fix button after a colour', async () => {
        const mounted = mountChecks({ blocks: [para(colored('Pale words', 'pale'))] });
        openPanel();

        const button = fix('contrast.low:0,0');
        await flush();
        const menu = screen.getByRole('menu', { name: 'Color' });
        expect(
            within(menu)
                .getAllByRole('menuitemradio')
                .map((item) => item.textContent),
        ).toEqual([expect.stringContaining('Ink')]);
        act(() => {
            fireEvent.click(within(menu).getByRole('menuitemradio', { name: 'Ink' }));
        });
        await flush();

        expect(document.activeElement).toBe(button);
        expect(mounted.changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([
            ['command', 'mark.font-color.set'],
        ]);
        nextCheck();
        expect(listed()).not.toContain('contrast.low:0,0');
        mounted.unmount();
    });

    it.each([
        {
            name: 'a suspicious alternative text',
            blocks: [image('photo', { altIntent: 'meaningful', altText: 'team.jpg' })],
            id: 'image.alt-suspicious:photo',
            overlay: () => screen.getByRole('dialog', { name: 'Alternative text' }),
        },
        {
            name: 'an empty link',
            blocks: [para(text('Go '), link('  '))],
            id: 'link.text-empty:0,1',
            overlay: () => screen.getByRole('dialog', { name: 'Link' }),
        },
        {
            name: 'a colour that cannot be measured',
            blocks: [para(colored('Unknown token', 'retired'))],
            id: 'contrast.unknown:0,0',
            overlay: () => screen.getByRole('menu', { name: 'Color' }),
        },
    ])(
        'opens the control that repairs $name, which returns focus to the Fix button on Escape',
        async ({ blocks, id, overlay }) => {
            const mounted = mountChecks({ blocks });
            openPanel();

            const button = fix(id);
            await flush();
            act(() => {
                fireEvent.keyDown(overlay(), { key: 'Escape' });
            });
            await flush();

            expect(document.activeElement).toBe(button);
            expect(mounted.changes).toEqual([]);
            mounted.unmount();
        },
    );

    it('opens the language dialog for the language review, which returns focus to the Fix button on Escape', async () => {
        const mounted = mountChecks({ blocks: [para(text('Bonjour tout le monde'))] });
        openPanel();

        const button = fix('language.parts-review');
        await flush();
        const dialog = screen.getByRole('dialog', { name: 'Language' });
        act(() => {
            fireEvent.keyDown(dialog, { key: 'Escape' });
        });
        await flush();

        expect(document.activeElement).toBe(button);
        expect(mounted.changes).toEqual([]);
        mounted.unmount();
    });

    it('says the repair is not allowed when the policy refuses it, and changes nothing', () => {
        const mounted = mountChecks({
            blocks: [para(text('Intro')), headingBlock('empty', 2)],
            policy: { features: { 'blocks.heading': { create: true, edit: true, remove: false, paste: true } } },
        });
        openPanel();
        const before = mounted.handle.getSnapshot().document;

        fix('heading.empty:empty');
        act(() => {
            vi.advanceTimersByTime(COALESCE_MS);
        });

        expect(mounted.handle.getSnapshot().document).toEqual(before);
        expect(screen.getByTestId('fondue-rich-text-editor-announcer')).toHaveTextContent('Not allowed in this editor');
        mounted.unmount();
    });

    it('runs no repair command against the selection on a keystroke for issues on a node', () => {
        const command = fixtureTableEditor.commands?.['table.header.toggle'];
        if (command === undefined) {
            throw new Error('The fixture table editor has no header toggle.');
        }
        const run = vi.spyOn(command, 'run');
        const mounted = mountChecks({
            blocks: [para(text('Intro')), table('one'), table('two'), table('three'), table('four')],
        });
        openPanel();
        expect(listed().filter((id) => id?.startsWith('table.no-header') === true)).toHaveLength(4);
        run.mockClear();

        act(() => {
            setSelection(mounted.handle, { text: 'Intro', from: 5, to: 5 });
            typeText(mounted.handle, '!');
        });

        expect(run).not.toHaveBeenCalled();
        run.mockRestore();
        mounted.unmount();
    });

    it('offers no Fix in a read-only editor, where no repair can run, and still offers Go to', () => {
        const mounted = mountChecks({ blocks: [headingBlock('empty', 2), image('photo')], readOnly: true });
        openPanel();

        for (const id of ['heading.empty:empty', 'image.alt-missing:photo', 'language.parts-review']) {
            const item = itemOf(id);
            if (item === undefined) {
                throw new Error(`No issue ${id} is listed.`);
            }
            expect(within(item).queryByRole('button', { name: 'Fix' })).toBeNull();
        }
        const heading = itemOf('heading.empty:empty');
        expect(heading === undefined ? null : within(heading).getByRole('button', { name: 'Go to' })).toBeVisible();
        mounted.unmount();
    });

    it('offers no language Fix while Go to has an image selected, and offers it again once text is selected', () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), image('photo')] });
        openPanel();
        const languageFix = () => {
            const item = itemOf('language.parts-review');
            return item === undefined ? null : within(item).queryByRole('button', { name: 'Fix' });
        };
        expect(languageFix()).toBeVisible();

        const photo = itemOf('image.alt-missing:photo');
        if (photo === undefined) {
            throw new Error('No image issue is listed.');
        }
        act(() => {
            fireEvent.click(within(photo).getByRole('button', { name: 'Go to' }));
        });

        expect(languageFix()).toBeNull();
        expect(within(photo).getByRole('button', { name: 'Fix' })).toBeVisible();
        act(() => {
            setSelection(mounted.handle, { text: 'Intro', from: 0, to: 5 });
        });
        expect(languageFix()).toBeVisible();
        mounted.unmount();
    });
});

describe('an issue from an older sequence', () => {
    it('repairs and goes to the empty heading it named after a paragraph was inserted above it within the delay', () => {
        const mounted = mountChecks({ blocks: [headingBlock('empty', 2), para(text('After'))] });
        const { view, runtime, handle } = mounted;
        openPanel();
        const issue = contentChecksOf(runtime.state)?.issues.find(({ issue: { id } }) => id === 'heading.empty:empty');
        expect(issue?.issue.sequence).toBe(handle.getSummary().sequence);

        insertParagraph(mounted, 'Above');
        expect(handle.getSummary().sequence).not.toBe(issue?.issue.sequence);

        const item = itemOf('heading.empty:empty');
        act(() => {
            fireEvent.click(within(item as HTMLElement).getByRole('button', { name: 'Go to' }));
        });
        const { $from } = view.state.selection;
        expect($from.parent.type.name).toBe('heading');
        expect($from.parent.attrs.nodeId).toBe('empty');
        expect(document.activeElement).toBe(view.dom);
        expect(screen.getByRole('region', { name: 'Accessibility checks' })).toBeInTheDocument();

        insertParagraph(mounted, 'Higher');
        fix('heading.empty:empty');

        expect(blockTypes(mounted)).toEqual(['paragraph', 'paragraph', 'paragraph', 'paragraph']);
        expect(mounted.changes.at(-1)).toMatchObject({ origin: 'command', commandId: 'paragraph.set' });
        expect(positionOf(view.state.doc, 'empty')).toBeUndefined();
        mounted.unmount();
    });

    it('does nothing when the checks, run again first, no longer report that rule on that node', () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        const { view, handle } = mounted;
        openPanel();

        act(() => {
            const pos = positionOf(view.state.doc, 'empty');
            if (pos === undefined) {
                throw new Error('The heading is missing.');
            }
            view.dispatch(view.state.tr.insertText('Filled', pos + 1));
        });
        const selection = view.state.selection;
        const changes = mounted.changes.length;

        fix('heading.empty:empty');

        expect(view.state.selection.eq(selection)).toBe(true);
        expect(mounted.changes).toHaveLength(changes);
        expect(blockTypes(mounted)).toEqual(['paragraph', 'heading']);
        expect(listed()).not.toContain('heading.empty:empty');
        expect(handle.getSummary().sequence).toBe(changes);
        mounted.unmount();
    });
});

describe('a repair after edits since its run', () => {
    it('waits out a composition, then repairs the issue once input settles', async () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        const { view, handle } = mounted;
        openPanel();
        act(() => {
            view.focus();
            view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
            view.dispatch(view.state.tr.insertText('か', 1).setMeta('composition', 1));
        });
        expect(handle.getSummary().compositionActive).toBe(true);

        fix('heading.empty:empty');
        expect(blockTypes(mounted)).toEqual(['paragraph', 'heading']);
        act(() => {
            view.dom.dispatchEvent(new CompositionEvent('compositionend'));
        });
        await flush();
        act(() => {
            vi.advanceTimersByTime(SETTLE_MS);
        });
        await flush();

        expect(handle.getSummary().compositionActive).toBe(false);
        expect(blockTypes(mounted)).toEqual(['paragraph', 'paragraph']);
        expect(mounted.changes.at(-1)).toMatchObject({ origin: 'command', commandId: 'paragraph.set' });
        mounted.unmount();
    });

    it('finds the heading again by its nodeId after it was deleted and the deletion undone within the delay', () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        const { view, handle } = mounted;
        openPanel();
        act(() => {
            const pos = positionOf(view.state.doc, 'empty') as number;
            view.dispatch(view.state.tr.delete(pos, pos + 2));
        });
        act(() => {
            handle.execute('history.undo');
        });
        expect(positionOf(view.state.doc, 'empty')).toBeDefined();

        act(() => {
            fireEvent.click(
                within(itemOf('heading.empty:empty') as HTMLElement).getByRole('button', { name: 'Go to' }),
            );
        });
        expect(view.state.selection.$from.parent.attrs.nodeId).toBe('empty');
        fix('heading.empty:empty');

        expect(blockTypes(mounted)).toEqual(['paragraph', 'paragraph']);
        mounted.unmount();
    });

    it('changes nothing when the node it named was replaced by another of the same size', () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), headingBlock('first', 2)] });
        const { view } = mounted;
        openPanel();
        act(() => {
            const pos = positionOf(view.state.doc, 'first') as number;
            const other = view.state.schema.nodes.heading?.create({ nodeId: 'second', level: 2, lang: null });
            if (other === undefined) {
                throw new Error('The model has no heading.');
            }
            view.dispatch(view.state.tr.replaceWith(pos, pos + 2, other));
        });
        const changes = mounted.changes.length;

        fix('heading.empty:first');

        expect(blockTypes(mounted)).toEqual(['paragraph', 'heading']);
        expect(mounted.changes).toHaveLength(changes);
        mounted.unmount();
    });

    it('goes to the second of two headings that share a nodeId, which loads as an island, not to the first', () => {
        const mounted = mountChecks({ blocks: [headingBlock('twin', 2), headingBlock('twin', 3)] });
        openPanel();

        act(() => {
            fireEvent.click(within(itemOf('heading.empty:1') as HTMLElement).getByRole('button', { name: 'Go to' }));
        });

        const { selection, doc } = mounted.view.state;
        expect(selection.from).toBe(doc.child(0).nodeSize);
        expect(selection.$from.parent.type.name).toBe('doc');
        mounted.unmount();
    });

    it('turns the first row of a table into header cells from a caret in its first cell, as one undo step', () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), table('grid')] });
        const cells = () =>
            (mounted.handle.getSnapshot().document.content.content?.[1]?.content?.[0]?.content ?? []).map(
                (cell) => cell.type,
            );
        openPanel();

        fix('table.no-header:grid');

        expect(cells()).toEqual(['table_header']);
        expect(mounted.changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([
            ['command', 'table.header.toggle'],
        ]);
        undo(mounted);
        expect(cells()).toEqual(['table_cell']);
        mounted.unmount();
    });
});

describe('a control a panel opened', () => {
    it('returns focus to the panel button that opened it after it applies a change', async () => {
        const model = textModel([core(), emoji(), fixturePickerPanel.feature]);
        const { handle, view, unmount } = mountText({
            model,
            plugins: [fixturePickerPanel.plugin],
            blocks: [para(text('Hello'))],
        });
        act(() => {
            openFind(handle);
        });
        const button = screen.getByRole('button', { name: 'Pick an emoji' });

        act(() => {
            fireEvent.click(button);
        });
        const picker = screen.getByRole('dialog', { name: 'Emoji' });
        const search = within(picker).getByRole('combobox');
        act(() => {
            fireEvent.change(search, { target: { value: 'smile' } });
        });
        await vi.waitFor(() => {
            expect(within(picker).getAllByRole('option').length).toBeGreaterThan(0);
        });
        act(() => {
            fireEvent.keyDown(search, { key: 'Enter' });
        });
        await flush();

        expect(view.state.doc.textContent).not.toBe('Hello');
        expect(document.activeElement).toBe(button);
        unmount();
    });
});

/** Starts a composition as the browser does and composes `value` at `pos`. */
const compose = ({ view }: Mounted, value: string, pos: number) =>
    act(() => {
        view.dom.dispatchEvent(new CompositionEvent('compositionstart'));
        view.dispatch(view.state.tr.insertText(value, pos).setMeta('composition', 1));
    });

/** Ends the composition and lets input settle. */
const endComposition = async ({ view }: Mounted) => {
    act(() => {
        view.dom.dispatchEvent(new CompositionEvent('compositionend'));
    });
    await flush();
    act(() => {
        vi.advanceTimersByTime(SETTLE_MS);
    });
    await flush();
};

describe('a repair or Go to while text is composed', () => {
    it('does nothing when the composition outlasts the wait, even once it settles later', async () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        openPanel();
        compose(mounted, 'Title', (positionOf(mounted.view.state.doc, 'empty') as number) + 1);
        const execute = vi.spyOn(mounted.handle, 'execute');
        const selection = mounted.view.state.selection;

        fix('heading.empty:empty');
        await act(async () => {
            await vi.advanceTimersByTimeAsync(1000);
        });

        expect(execute).not.toHaveBeenCalled();
        expect(mounted.view.state.selection.eq(selection)).toBe(true);
        await endComposition(mounted);
        nextCheck();

        expect(execute).not.toHaveBeenCalled();
        expect(blockTypes(mounted)).toEqual(['paragraph', 'heading']);
        expect(mounted.changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([['input', null]]);
        mounted.unmount();
    });

    it('checks the live document again right before a repair, even when no change was published since the run', () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        openPanel();
        const checked = contentChecksOf(mounted.runtime.state)?.runs;
        const runs = checked ?? 0;
        const runChecks = vi.spyOn(mounted.runtime, 'runChecks');

        fix('heading.empty:empty');

        expect(runChecks).toHaveBeenCalledTimes(1);
        expect(contentChecksOf(mounted.runtime.state)?.runs).toBe(runs + 1);
        expect(blockTypes(mounted)).toEqual(['paragraph', 'paragraph']);
        expect(mounted.changes.map(({ origin, commandId }) => [origin, commandId])).toEqual([
            ['command', 'paragraph.set'],
        ]);
        undo(mounted);
        expect(blockTypes(mounted)).toEqual(['paragraph', 'heading']);
        mounted.unmount();
    });

    it('checks the live document again before it repairs, and skips a heading that the composition filled', async () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        openPanel();
        compose(mounted, 'Title', (positionOf(mounted.view.state.doc, 'empty') as number) + 1);

        fix('heading.empty:empty');
        await endComposition(mounted);

        expect(blockTypes(mounted)).toEqual(['paragraph', 'heading']);
        expect(mounted.changes.map(({ commandId }) => commandId)).toEqual([null]);
        mounted.unmount();
    });

    it('goes to the issue once the composition settles, after content above it moved it', async () => {
        const mounted = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        openPanel();
        insertParagraph(mounted, 'Above');
        compose(mounted, 'x', 1);

        act(() => {
            fireEvent.click(
                within(itemOf('heading.empty:empty') as HTMLElement).getByRole('button', { name: 'Go to' }),
            );
        });
        await endComposition(mounted);

        expect(mounted.view.state.selection.$from.parent.attrs.nodeId).toBe('empty');
        expect(document.activeElement).toBe(mounted.view.dom);
        mounted.unmount();
    });
});

describe('an issue whose text changed inside it within the delay', () => {
    it('is still the target of Go to and Fix while its rule still matches', async () => {
        const mounted = mountChecks({ blocks: [para(text('Read '), link('click here'))] });
        const { view } = mounted;
        openPanel();
        act(() => {
            view.dispatch(view.state.tr.insertText('I', 8, 9));
        });
        expect(view.state.doc.textContent).toBe('Read clIck here');

        act(() => {
            fireEvent.click(
                within(itemOf('link.text-vague:0,1') as HTMLElement).getByRole('button', { name: 'Go to' }),
            );
        });
        expect([view.state.selection.from, view.state.selection.to]).toEqual([6, 16]);

        fix('link.text-vague:0,1');
        await flush();
        expect(within(screen.getByRole('dialog', { name: 'Link' })).getByRole('textbox', { name: 'Text' })).toHaveValue(
            'clIck here',
        );
        mounted.unmount();
    });
});

describe('a control a repair opened, after it applies a change', () => {
    it('returns focus to Fix from the language dialog, which focuses its own field as it opens', async () => {
        const mounted = mountChecks({ blocks: [para(text('Bonjour'))] });
        act(() => {
            setSelection(mounted.handle, { text: 'Bonjour' });
        });
        openPanel();

        const button = fix('language.parts-review');
        await flush();
        act(() => {
            fireEvent.change(screen.getByRole('textbox', { name: 'Language tag' }), { target: { value: 'fr' } });
        });
        act(() => {
            fireEvent.click(
                within(screen.getByRole('dialog', { name: 'Language' })).getByRole('button', { name: 'Apply' }),
            );
        });
        await flush();

        expect(screen.queryByRole('dialog', { name: 'Language' })).toBeNull();
        expect(mounted.changes.at(-1)).toMatchObject({ origin: 'command', commandId: 'mark.language.set' });
        expect(document.activeElement).toBe(button);

        fix('language.parts-review');
        await flush();
        act(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Remove language' }));
        });
        await flush();
        expect(document.activeElement).toBe(button);
        mounted.unmount();
    });

    it('returns focus to Fix from the custom colour draft on Save and on Escape', async () => {
        const features = checksFeatures().map((feature) =>
            feature.id === 'marks.font-color' ? fontColor({ literalColors: true }) : feature,
        );
        const mounted = mountChecks({ blocks: [para(colored('Pale words', 'pale'))], model: checksModel(features) });
        openPanel();

        const openDraft = async () => {
            const button = fix('contrast.low:0,0');
            await flush();
            act(() => {
                fireEvent.click(screen.getByRole('menuitemradio', { name: /Custom text color/ }));
            });
            await flush();
            return button;
        };
        const button = await openDraft();
        const draft = screen.getByRole('dialog', { name: 'Custom text color' });
        act(() => {
            fireEvent.keyDown(draft, { key: 'Escape' });
        });
        await flush();
        expect(document.activeElement).toBe(button);

        await openDraft();
        act(() => {
            fireEvent.click(
                within(screen.getByRole('dialog', { name: 'Custom text color' })).getByRole('button', { name: 'Save' }),
            );
        });
        await flush();
        expect(mounted.changes.at(-1)).toMatchObject({ origin: 'command', commandId: 'mark.font-color.set' });
        expect(document.activeElement).toBe(button);
        mounted.unmount();
    });
});
