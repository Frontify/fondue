/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type ContentNodeJSON } from '#/model';
import { core, heading, outline, quote } from '#/plugins';
import { mountText, para, text, textModel } from '#/react/__tests__/fixtures/text';
import { positionOf } from '#/runtime/transform/positions';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const model = textModel([core(), heading(), quote(), outline()]);

const headingBlock = (nodeId: string, level: number, value?: string): ContentNodeJSON => ({
    type: 'heading',
    attrs: { nodeId, level, lang: null },
    ...(value === undefined ? {} : { content: [text(value)] }),
});

const blocks = [
    para(text('Intro')),
    headingBlock('second', 2, 'Second'),
    headingBlock('first', 1, 'First later'),
    {
        type: 'blockquote',
        content: [headingBlock('quoted', 3, 'Quoted')],
    },
    headingBlock('empty', 4),
];

const mountOutline = (content: readonly ContentNodeJSON[] = blocks) =>
    mountText({
        model,
        blocks: content,
        toolbar: [['outline.toggle']],
    });

const openOutline = () => {
    fireEvent.click(screen.getByRole('button', { name: 'Outline' }));
};

describe('the outline panel', () => {
    it('lists headings in document order with their stored levels in a named navigation landmark', () => {
        const { unmount } = mountOutline();

        openOutline();

        const nav = screen.getByRole('navigation', { name: 'Outline' });
        const items = within(nav).getAllByRole('button');
        expect(items.map((item) => item.getAttribute('data-level'))).toEqual(['2', '1', '3', '4']);
        expect(items.map((item) => item.textContent?.replaceAll(/\s+/g, ' ').trim())).toEqual([
            'Heading 2 Second',
            'Heading 1 First later',
            'Heading 3 Quoted',
            'Heading 4',
        ]);
        unmount();
    });

    it('opens from the toolbar, shows the button pressed, and closes when the button is pressed again', () => {
        const { unmount } = mountOutline();
        const button = screen.getByRole('button', { name: 'Outline' });

        expect(button).toHaveAttribute('aria-pressed', 'false');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByRole('navigation', { name: 'Outline' })).toBeInTheDocument();
        expect(document.activeElement).toBe(
            within(screen.getByRole('navigation', { name: 'Outline' })).getAllByRole('button')[0],
        );

        fireEvent.click(button);
        expect(screen.queryByRole('navigation', { name: 'Outline' })).not.toBeInTheDocument();
        expect(button).toHaveAttribute('aria-pressed', 'false');
        unmount();
    });

    it('closes on Escape and returns focus to the surface', () => {
        const { view, unmount } = mountOutline();

        openOutline();
        fireEvent.keyDown(screen.getByRole('navigation', { name: 'Outline' }), {
            key: 'Escape',
        });

        expect(screen.queryByRole('navigation', { name: 'Outline' })).not.toBeInTheDocument();
        expect(document.activeElement).toBe(view.dom);
        unmount();
    });

    it('moves the selection to the same heading after a paragraph is inserted above it', () => {
        const content = [headingBlock('stay', 1, 'Stay'), headingBlock('other', 2, 'Other')];
        const { handle, view, unmount } = mountOutline(content);

        openOutline();
        act(() => {
            const type = view.state.schema.nodes.paragraph;
            if (type === undefined) {
                throw new Error('The model has no paragraph.');
            }

            const paragraph = type.create(null, view.state.schema.text('Above'));
            view.dispatch(view.state.tr.insert(0, paragraph));
        });
        const sequence = handle.getSummary().sequence;
        const before = view.state.doc.textContent;

        fireEvent.click(screen.getByRole('button', { name: /Stay/ }));

        const { $from, empty } = view.state.selection;
        expect(empty).toBe(true);
        expect($from.parentOffset).toBe(0);
        expect($from.parent.type.name).toBe('heading');
        expect($from.parent.attrs.nodeId).toBe('stay');
        expect((positionOf(view.state.doc, 'stay') ?? 0) + 1).toBe($from.pos);
        expect(handle.getSummary().sequence).toBe(sequence);
        expect(view.state.doc.textContent).toBe(before);
        unmount();
    });

    it('leaves the selection where it is when the chosen heading is gone and lists the headings that remain', () => {
        const content = [para(text('Intro')), headingBlock('stay', 1, 'Stay'), headingBlock('other', 2, 'Other')];
        const { view, unmount } = mountOutline(content);

        openOutline();
        const stay = screen.getByRole('button', { name: /Stay/ });
        act(() => {
            const pos = positionOf(view.state.doc, 'stay');
            const node = pos === undefined ? undefined : view.state.doc.nodeAt(pos);
            if (pos === undefined || node === null || node === undefined) {
                throw new Error('The heading is missing.');
            }

            view.dispatch(view.state.tr.delete(pos, pos + node.nodeSize));
        });
        const selection = view.state.selection;

        fireEvent.click(stay);

        expect(view.state.selection.eq(selection)).toBe(true);
        const nav = screen.getByRole('navigation', { name: 'Outline' });
        expect(within(nav).queryByRole('button', { name: /Stay/ })).not.toBeInTheDocument();
        expect(within(nav).getByRole('button', { name: /Other/ })).toBeInTheDocument();
        unmount();
    });

    it('says a chosen heading is gone and keeps focus on the outline rather than on another heading', () => {
        const content = [headingBlock('stay', 1, 'Stay'), headingBlock('other', 2, 'Other')];
        const { view, unmount } = mountOutline(content);

        openOutline();
        const stay = screen.getByRole('button', { name: /Stay/ });
        act(() => {
            const pos = positionOf(view.state.doc, 'stay');
            const node = pos === undefined ? undefined : view.state.doc.nodeAt(pos);
            if (pos === undefined || node === null || node === undefined) {
                throw new Error('The heading is missing.');
            }

            view.dispatch(view.state.tr.delete(pos, pos + node.nodeSize));
        });

        fireEvent.click(stay);

        expect(document.activeElement).toBe(screen.getByRole('navigation', { name: 'Outline' }));
        expect(screen.getByTestId('fondue-rich-text-editor-announcer')).toHaveTextContent(
            'That heading is no longer in the document. The outline shows the current headings.',
        );
        unmount();
    });

    it('opens the outline in a readonly editor, since it changes no content', () => {
        const { handle, unmount } = mountText({
            model,
            blocks,
            toolbar: [['outline.toggle']],
            readOnly: true,
        });

        expect(screen.getByRole('button', { name: 'Outline' })).not.toHaveAttribute('aria-disabled', 'true');
        act(() => {
            handle.execute('outline.toggle');
        });

        expect(screen.getByRole('navigation', { name: 'Outline' })).toBeInTheDocument();
        unmount();
    });

    it('leaves focus on a host control outside the editor when the outline closes', () => {
        const { handle, unmount } = mountOutline();
        const host = document.createElement('button');
        document.body.append(host);

        openOutline();
        act(() => host.focus());
        act(() => {
            handle.execute('outline.toggle');
        });

        expect(screen.queryByRole('navigation', { name: 'Outline' })).not.toBeInTheDocument();
        expect(document.activeElement).toBe(host);
        host.remove();
        unmount();
    });

    it('shows a message in the panel when the document has no headings, and not when it has some', () => {
        const empty = mountOutline([para(text('Intro'))]);
        openOutline();
        const nav = screen.getByRole('navigation', { name: 'Outline' });
        expect(nav).toHaveTextContent('No headings yet. Headings you add appear here.');
        expect(within(nav).queryByRole('list')).not.toBeInTheDocument();
        empty.unmount();

        const full = mountOutline();
        openOutline();
        expect(screen.getByRole('navigation', { name: 'Outline' })).not.toHaveTextContent('No headings yet');
        full.unmount();
    });
});
