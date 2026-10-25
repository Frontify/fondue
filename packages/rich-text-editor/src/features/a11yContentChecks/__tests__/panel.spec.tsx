/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { COALESCE_MS } from '#/bridge/announcer';
import { defineEditorPart, useEditorApi, useEditorValue } from '#/entries/authoring';
import { contentChecks } from '#/features';
import { pluginsById } from '#/features/plugins';
import { CHECK_DELAY_MS } from '#/runtime/capabilities/checks/contentIssues';
import { positionOf } from '#/runtime/positions';
import { runtimeOf } from '#/runtime/runtime';
import { setSelection, typeText } from '#/testing';

import { colored, headingBlock, image, link, mountChecks, para, text } from './fixtures/checks';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const openPanel = () => {
    fireEvent.click(screen.getByRole('button', { name: 'Accessibility checks' }));
    return screen.getByRole('region', { name: 'Accessibility checks' });
};

const issueItems = (panel: HTMLElement) => within(panel).getAllByRole('listitem');

const itemOf = (panel: HTMLElement, id: string) => {
    const item = issueItems(panel).find((element) => element.getAttribute('data-rte-issue-id') === id);
    if (item === undefined) {
        throw new Error(`No issue ${id} is listed.`);
    }
    return item;
};

const settle = () =>
    act(() => {
        vi.advanceTimersByTime(CHECK_DELAY_MS);
    });

describe('the issues panel', () => {
    it('lists Accessibility checks in the More menu', () => {
        const { unmount } = mountChecks({ blocks: [image('photo')], toolbar: [['link.edit']] });

        fireEvent.keyDown(screen.getByRole('button', { name: 'More' }), { key: 'Enter' });

        expect(screen.getByRole('menuitem', { name: 'Accessibility checks' })).toBeVisible();
        unmount();
    });

    it('comes from the editor part with checks.open and its toolbar entry, and reads the checks through the editor API', () => {
        const part = pluginsById(['a11y.content-checks'])[0]?.editor;
        const panels = part?.panels;
        const toolbar = part?.toolbar;
        expect(panels?.map(({ control }) => control)).toEqual(['checks']);
        expect(toolbar?.map(({ command }) => command)).toEqual(['checks.open']);
        const Listed = () => {
            const api = useEditorApi();
            const ids = useEditorValue((read) =>
                read?.services
                    .checks()
                    ?.current()
                    .issues.map(({ issue }) => issue.id)
                    .join(' '),
            );
            return (
                <div>
                    <button type="button" onClick={() => api?.services.checks()?.run()}>
                        Run
                    </button>
                    <output>{ids}</output>
                </div>
            );
        };
        const host = defineEditorPart(contentChecks, { panels: [{ control: 'checks', component: Listed }] });
        const { unmount } = mountChecks({ blocks: [image('photo')], plugins: [host] });

        fireEvent.click(screen.getByRole('button', { name: 'Accessibility checks' }));
        fireEvent.click(screen.getByRole('button', { name: 'Run' }));

        expect(screen.getByRole('status')).toHaveTextContent('image.alt-missing:photo');
        unmount();
    });

    it('opens on its summary heading and lists each issue in document order with its severity, rule and excerpt', () => {
        const { unmount } = mountChecks({
            blocks: [
                headingBlock('title', 1, 'Quarterly report'),
                para(text('Read the '), link('here')),
                image('photo'),
                para(colored('Pale words', 'pale')),
            ],
        });

        const panel = openPanel();
        const summary = within(panel).getByRole('heading', { level: 2 });

        expect(summary).toHaveTextContent('Errors: 2. Warnings: 1. To review: 7.');
        expect(document.activeElement).toBe(summary);
        const items = issueItems(panel);
        const ids = items.map((item) => item.getAttribute('data-rte-issue-id'));
        expect(ids).toEqual([
            'language.parts-review',
            'sensory.review',
            'structure.review',
            'heading.descriptive-review:title',
            'link.text-vague:1,1',
            'link.purpose-review:1,1',
            'image.alt-missing:photo',
            'image.content-review:photo',
            'contrast.low:3,0',
            'color.meaning-review:3,0',
        ]);
        for (const item of items) {
            const issueId = item.getAttribute('data-rte-issue-id');
            const rule = issueId?.split(':')[0];
            const ruleId = rule ?? '';
            expect(item).toHaveTextContent(`(${ruleId})`);
        }
        const vague = itemOf(panel, 'link.text-vague:1,1');
        expect(vague).toHaveTextContent('Warning Link text that does not say where it goes (link.text-vague)');
        expect(within(vague).getByRole('button', { name: 'Go to' })).toBeInTheDocument();
        expect(within(vague).getByRole('button', { name: 'Fix' })).toBeInTheDocument();
        const missing = itemOf(panel, 'image.alt-missing:photo');
        expect(missing).toHaveTextContent('Error Image without alternative text (image.alt-missing)');
        expect(missing).toHaveTextContent('Team.jpg');
        expect(itemOf(panel, 'sensory.review')).toHaveTextContent('To review');
        expect(within(itemOf(panel, 'sensory.review')).queryByRole('button', { name: 'Fix' })).toBeNull();
        expect(within(itemOf(panel, 'sensory.review')).queryByRole('button', { name: 'Go to' })).toBeNull();
        expect(itemOf(panel, 'heading.descriptive-review:title')).toHaveTextContent('Quarterly report');
        unmount();
    });

    it('shows at most 60 characters of the excerpt, inside one bdi so its direction cannot reorder the panel text', () => {
        const arabic = 'نص عربي '.repeat(12);
        const { unmount } = mountChecks({ blocks: [headingBlock('long', 1, arabic)] });

        const item = itemOf(openPanel(), 'heading.descriptive-review:long');
        const isolated = item.querySelectorAll('bdi');

        expect(isolated).toHaveLength(1);
        const isolatedText = isolated[0]?.textContent;
        expect([...(isolatedText ?? '')].length).toBeLessThanOrEqual(60);
        expect(isolatedText?.endsWith('…')).toBe(true);
        unmount();
    });

    it('offers an expandable explanation of how to decide for each warning and review', () => {
        const { unmount } = mountChecks({ blocks: [para(link('click here'))] });

        const panel = openPanel();
        for (const id of ['link.text-vague:0,0', 'link.purpose-review:0,0', 'sensory.review']) {
            const details = itemOf(panel, id).querySelector('details');
            expect(details?.querySelector('summary')).toHaveTextContent('How to decide');
            expect(details?.open).toBe(false);
        }
        const help = itemOf(panel, 'link.text-vague:0,0').querySelector('details');
        fireEvent.click(help?.querySelector('summary') as HTMLElement);

        expect(help).toHaveTextContent('Read the link text alone, as a list of links shows it.');
        unmount();
    });

    it('offers no Dismiss on an error', () => {
        const { unmount } = mountChecks({ blocks: [image('photo'), para(link('  '))] });

        const panel = openPanel();

        for (const id of ['image.alt-missing:photo', 'link.text-empty:1,0']) {
            expect(within(itemOf(panel, id)).queryByRole('button', { name: 'Dismiss' })).toBeNull();
        }
        expect(
            within(itemOf(panel, 'image.content-review:photo')).getByRole('button', { name: 'Dismiss' }),
        ).toBeVisible();
        unmount();
    });

    it('dismisses a warning and a review for the session, lists them again on request, and brings the warning back when its link changes', () => {
        const { handle, unmount } = mountChecks({ blocks: [para(link('click here')), image('photo')] });
        const panel = openPanel();
        const summary = within(panel).getByRole('heading', { level: 2 });
        expect(summary).toHaveTextContent('Errors: 1. Warnings: 1. To review: 5.');

        fireEvent.click(within(itemOf(panel, 'link.text-vague:0,0')).getByRole('button', { name: 'Dismiss' }));
        fireEvent.click(within(itemOf(panel, 'image.content-review:photo')).getByRole('button', { name: 'Dismiss' }));

        expect(summary).toHaveTextContent('Errors: 1. Warnings: 0. To review: 4.');
        const ids = () => issueItems(panel).map((item) => item.getAttribute('data-rte-issue-id'));
        expect(ids()).not.toContain('link.text-vague:0,0');
        expect(ids()).not.toContain('image.content-review:photo');
        expect(document.querySelector('[data-rte-issue="warning"]')).toBeNull();

        fireEvent.click(within(panel).getByRole('checkbox', { name: 'Show dismissed' }));
        expect(ids()).toContain('image.content-review:photo');
        expect(itemOf(panel, 'image.content-review:photo')).toHaveTextContent('Dismissed');
        expect(summary).toHaveTextContent('Errors: 1. Warnings: 0. To review: 4.');
        fireEvent.click(within(panel).getByRole('checkbox', { name: 'Show dismissed' }));

        act(() => {
            setSelection(handle, { text: 'click here', from: 0, to: 1 });
            typeText(handle, 'C');
        });
        settle();

        expect(ids()).toContain('link.text-vague:0,0');
        expect(summary).toHaveTextContent('Errors: 1. Warnings: 1. To review: 4.');
        expect(document.querySelector('[data-rte-issue="warning"]')).not.toBeNull();
        unmount();
    });

    it('marks each automatic issue in the surface with an outline and an icon only while it is open', () => {
        const { view, unmount } = mountChecks({
            blocks: [headingBlock('empty', 2), para(link('here')), image('photo')],
        });
        const marked = () =>
            [...view.dom.querySelectorAll('[data-rte-issue]')].map((element) => element.getAttribute('data-rte-issue'));

        expect(marked()).toEqual([]);
        openPanel();

        expect(marked()).toEqual(['error', 'warning', 'error']);
        const icons = [...view.dom.querySelectorAll('[data-rte-issue-icon]')];
        expect(icons.map((icon) => icon.getAttribute('data-rte-issue-icon'))).toEqual(['error', 'warning', 'error']);
        for (const icon of icons) {
            expect(icon).toHaveAttribute('aria-hidden', 'true');
            expect(icon.querySelector('svg')).not.toBeNull();
        }
        expect(view.dom.querySelector('h2[data-rte-issue="error"]')).not.toBeNull();

        fireEvent.keyDown(screen.getByRole('region', { name: 'Accessibility checks' }), { key: 'Escape' });

        expect(screen.queryByRole('region', { name: 'Accessibility checks' })).toBeNull();
        expect(marked()).toEqual([]);
        expect(view.dom.querySelectorAll('[data-rte-issue-icon]')).toHaveLength(0);
        unmount();
    });

    it('closes from its Close button, with its slot and surface marks gone and focus back in the surface', () => {
        const { view, unmount } = mountChecks({ blocks: [headingBlock('empty', 2)] });
        const panel = openPanel();
        expect(view.dom.querySelectorAll('[data-rte-issue-icon]').length).toBeGreaterThan(0);

        fireEvent.click(within(panel).getByRole('button', { name: 'Close' }));

        expect(screen.queryByRole('region', { name: 'Accessibility checks' })).toBeNull();
        expect(document.querySelector('[data-rte-panel]')).toBeNull();
        expect(view.dom.querySelectorAll('[data-rte-issue-icon]')).toHaveLength(0);
        expect(document.activeElement).toBe(view.dom);
        unmount();
    });

    it('moves focus to the issue last acted on when its button is pressed while the panel is open', () => {
        const { view, unmount } = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        const panel = openPanel();
        const goTo = within(itemOf(panel, 'heading.empty:empty')).getByRole('button', { name: 'Go to' });

        fireEvent.click(goTo);
        expect(document.activeElement).toBe(view.dom);
        expect(screen.getByRole('region', { name: 'Accessibility checks' })).toBe(panel);

        fireEvent.click(screen.getByRole('button', { name: 'Accessibility checks' }));

        expect(document.activeElement).toBe(goTo);
        expect(screen.getByRole('region', { name: 'Accessibility checks' })).toBe(panel);
        unmount();
    });

    it('moves focus to the summary heading when the issue whose Dismiss had focus leaves the list after a blur to nowhere', () => {
        const { unmount } = mountChecks({ blocks: [para(link('click here'))] });
        const panel = openPanel();
        const dismiss = within(itemOf(panel, 'link.text-vague:0,0')).getByRole('button', { name: 'Dismiss' });

        act(() => {
            dismiss.focus();
            // A browser blurs the focused button with no next element as its row leaves the document.
            fireEvent.blur(dismiss, { relatedTarget: null });
            fireEvent.click(dismiss);
        });

        expect(document.activeElement).toBe(within(panel).getByRole('heading', { level: 2 }));
        unmount();
    });

    it('announces the summary politely when a later run changes the counts, and not when the panel opens', () => {
        const { handle, unmount } = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        const region = screen.getByTestId('fondue-rich-text-editor-announcer');

        openPanel();
        expect(region.textContent).toBe('');

        act(() => {
            setSelection(handle, { text: 'Intro', from: 5, to: 5 });
            typeText(handle, '!');
        });
        settle();
        expect(region.textContent).toBe('');

        act(() => {
            const view = runtimeOf(handle)?.view;
            const pos = view === undefined ? undefined : positionOf(view.state.doc, 'empty');
            if (view === undefined || pos === undefined) {
                throw new Error('The heading is missing.');
            }
            view.dispatch(view.state.tr.insertText('Filled', pos + 1));
        });
        settle();
        act(() => {
            vi.advanceTimersByTime(COALESCE_MS);
        });

        expect(region.textContent).toBe('Errors: 0. Warnings: 0. To review: 4.');
        expect(region).toHaveAttribute('aria-live', 'polite');
        unmount();
    });

    it('describes each action of an issue by its title and its excerpt, so two issues of one rule differ', () => {
        const { unmount } = mountChecks({ blocks: [para(link('here')), para(link('more'))] });
        const panel = openPanel();

        const descriptions = ['link.text-vague:0,0', 'link.text-vague:1,0'].map((id) => {
            const item = itemOf(panel, id);
            const controls = [
                within(item).getByRole('button', { name: 'Go to' }),
                within(item).getByRole('button', { name: 'Fix' }),
                within(item).getByRole('button', { name: 'Dismiss' }),
                item.querySelector('summary') as HTMLElement,
            ];
            const [first, ...rest] = controls.map((control) => control.getAttribute('aria-describedby'));
            expect(new Set(rest)).toEqual(new Set([first]));
            return within(item).getByRole('button', { name: 'Go to' });
        });

        expect(descriptions[0]).toHaveAccessibleDescription(/Link text that does not say where it goes.*here$/);
        expect(descriptions[1]).toHaveAccessibleDescription(/Link text that does not say where it goes.*more$/);
        unmount();
    });

    it('keeps focus on an issue whose path-based ID changes when content is inserted above it', () => {
        const { view, unmount } = mountChecks({ blocks: [para(link('here'))] });
        const panel = openPanel();
        const goTo = within(itemOf(panel, 'link.text-vague:0,0')).getByRole('button', { name: 'Go to' });
        act(() => {
            goTo.focus();
        });

        act(() => {
            const paragraph = view.state.schema.nodes.paragraph?.create(null, view.state.schema.text('Above'));
            if (paragraph === undefined) {
                throw new Error('The model has no paragraph.');
            }
            view.dispatch(view.state.tr.insert(0, paragraph));
        });
        settle();

        expect(itemOf(panel, 'link.text-vague:1,0')).toContainElement(document.activeElement as HTMLElement);
        expect(goTo.isConnected).toBe(true);
        unmount();
    });

    it('lists both issues of two nodes that share a nodeId, each under its own path', () => {
        const error = vi.spyOn(console, 'error');
        const { unmount } = mountChecks({ blocks: [headingBlock('twin', 2), headingBlock('twin', 3)] });

        const panel = openPanel();

        expect(issueItems(panel).map((item) => item.getAttribute('data-rte-issue-id'))).toEqual(
            expect.arrayContaining(['heading.empty:0', 'heading.empty:1']),
        );
        expect(error.mock.calls.flat().join(' ')).not.toMatch(/same key/);
        error.mockRestore();
        unmount();
    });

    it('marks a node with two automatic issues once, in the stronger severity', () => {
        const { view, unmount } = mountChecks({ blocks: [headingBlock('top', 1, 'Top'), headingBlock('deep', 4)] });

        openPanel();

        const marked = view.dom.querySelectorAll('h4[data-rte-issue]');
        expect([...marked].map((element) => element.getAttribute('data-rte-issue'))).toEqual(['error']);
        expect(view.dom.querySelectorAll('h4 [data-rte-issue-icon]')).toHaveLength(1);
        expect(view.dom.querySelector('h4 [data-rte-issue-icon]')).toHaveAttribute('data-rte-issue-icon', 'error');
        unmount();
    });

    it('moves focus to the summary heading when the first of two identical links is dismissed, and the checks button no longer goes to the second', () => {
        const { unmount } = mountChecks({ blocks: [para(link('here')), para(link('here'))] });
        const panel = openPanel();
        const first = itemOf(panel, 'link.text-vague:0,0');
        const second = itemOf(panel, 'link.text-vague:1,0');
        const dismiss = within(first).getByRole('button', { name: 'Dismiss' });

        act(() => {
            dismiss.focus();
            fireEvent.blur(dismiss, { relatedTarget: null });
            fireEvent.click(dismiss);
        });

        const heading = within(panel).getByRole('heading', { level: 2 });
        expect(document.activeElement).toBe(heading);
        expect(itemOf(panel, 'link.text-vague:1,0')).toBe(second);

        fireEvent.click(screen.getByRole('button', { name: 'Accessibility checks' }));

        expect(document.activeElement).toBe(heading);
        unmount();
    });

    it('speaks no summary when focus moves to the summary heading because the focused issue left', () => {
        const { view, unmount } = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        const panel = openPanel();
        const region = screen.getByTestId('fondue-rich-text-editor-announcer');
        const fix = within(itemOf(panel, 'heading.empty:empty')).getByRole('button', { name: 'Fix' });

        act(() => {
            fix.focus();
            fireEvent.click(fix);
        });
        settle();
        act(() => {
            vi.advanceTimersByTime(COALESCE_MS);
        });

        expect(view.state.doc.child(1).type.name).toBe('paragraph');
        expect(document.activeElement).toBe(within(panel).getByRole('heading', { level: 2 }));
        expect(region.textContent).toBe('');
        unmount();
    });

    it('holds the summary back until runs pause, so a message the change set off stays in the live region', () => {
        const { handle, unmount } = mountChecks({ blocks: [para(text('Intro')), headingBlock('empty', 2)] });
        openPanel();
        const region = screen.getByTestId('fondue-rich-text-editor-announcer');

        act(() => {
            const view = runtimeOf(handle)?.view;
            const pos = view === undefined ? undefined : positionOf(view.state.doc, 'empty');
            if (view === undefined || pos === undefined) {
                throw new Error('The heading is missing.');
            }
            view.dispatch(view.state.tr.insertText('Filled', pos + 1));
            region.textContent = 'Upload finished';
        });
        settle();

        expect(region.textContent).toBe('Upload finished');
        act(() => {
            vi.advanceTimersByTime(COALESCE_MS);
        });
        expect(region.textContent).toBe('Errors: 0. Warnings: 0. To review: 4.');
        unmount();
    });
});
