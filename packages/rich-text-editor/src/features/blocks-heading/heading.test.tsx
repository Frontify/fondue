/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { vocabularyAlign, vocabularyStyles } from '#/features/__fixtures__/vocabulary';
import { type ContentNodeJSON } from '#/model';
import { setSelection, typeText } from '#/testing';

import { mountText, para, storedIn, text, textFeatures, textModel } from '../../../fixtures/editor/text';

import headings from './fixtures/headings.json';

const headingOf = (level: number, ...content: readonly ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'heading',
    attrs: { nodeId: `heading-${level}`, level, lang: null },
    content: [...content],
});
const firstBlock = (handle: ReturnType<typeof mountText>['handle']) =>
    handle.getSnapshot().document.content.content?.[0];

describe('blocks.heading', () => {
    it('SPEC-rich-text-editing/AC-013 returns not-allowed for heading.set with a level outside creatableHeadingLevels', () => {
        const { handle } = mountText({ blocks: [para(text('Title'))], policy: { creatableHeadingLevels: [2, 3] } });
        setSelection(handle, { text: 'Title', from: 1, to: 1 });

        const outside = ([1, 4, 5, 6] as const).map((level) => handle.execute('heading.set', { level }));
        const inside = handle.execute('heading.set', { level: 3 });

        expect(outside.map((result) => result.status === 'rejected' && result.code)).toEqual([
            'not-allowed',
            'not-allowed',
            'not-allowed',
            'not-allowed',
        ]);
        expect(inside.status).toBe('applied');
        expect(firstBlock(handle)).toMatchObject({ type: 'heading', attrs: { level: 3 } });
    });

    it('SPEC-rich-text-editing/AC-014 keeps a stored h1 and names it in the text style picker with levels 2 to 4 creatable', () => {
        const { handle, getByRole } = mountText({
            blocks: [headingOf(1, text('Stored title'))],
            policy: { creatableHeadingLevels: [2, 3, 4] },
            toolbar: [['text-style']],
        });
        setSelection(handle, { text: 'Stored title', from: 6, to: 6 });
        typeText(handle, ' kept');
        const picker = getByRole('button', { name: 'Heading 1' });
        act(() => {
            fireEvent.pointerDown(picker, { button: 0, ctrlKey: false, pointerType: 'mouse' });
        });

        expect(firstBlock(handle)).toMatchObject({ type: 'heading', attrs: { level: 1 } });
        expect(firstBlock(handle)).toMatchObject({ content: [{ text: 'Stored kept title' }] });
        expect(screen.getAllByRole('menuitemradio').map((row) => row.textContent)).toEqual([
            'Normal text',
            'Heading 2',
            'Heading 3',
            'Heading 4',
            'Quote',
        ]);
    });

    it('SPEC-rich-text-editing/AC-015 opens every heading fixture with zero document changes', () => {
        const model = textModel();
        const levels = [1, 2, 3, 4, 5, 6].map((level) => storedIn(model, [headingOf(level, text(`Level ${level}`))]));
        const documents = [{ ...headings, model: model.ref } as never, ...levels];
        const opened = documents.map((document) => {
            const { handle, view, changes, unmount } = mountText({
                model,
                document,
                policy: { creatableHeadingLevels: [] },
            });
            const snapshot = handle.getSnapshot();
            // The editor holds each stored heading as a heading of its level, not as an island.
            const shown = view.state.doc.children.map(
                (block) => `${block.type.name} ${JSON.stringify(block.attrs.level)}`,
            );
            unmount();
            return [changes.length, snapshot.stamp.sequence, snapshot.document.content, shown];
        });
        const stored = (document: { readonly content: { readonly content?: readonly ContentNodeJSON[] } }) =>
            (document.content.content ?? []).map((block) => {
                let level: unknown;
                if (block.attrs !== undefined) {
                    level = block.attrs.level;
                }
                return `${block.type} ${JSON.stringify(level)}`;
            });

        expect(opened).toEqual(documents.map((document) => [0, 0, document.content, stored(document)]));
    });

    it('SPEC-rich-text-editing/AC-016 keeps inline content, marks, align, lang and styleId when paragraph.set runs on a heading', () => {
        const model = textModel([...textFeatures(), vocabularyStyles(), vocabularyAlign()]);
        const { handle } = mountText({
            model,
            blocks: [
                {
                    type: 'heading',
                    attrs: { nodeId: 'heading-1', level: 2, lang: 'de-CH', align: 'center', styleId: 'brand-title' },
                    content: [text('Kept '), text('bold', 'bold'), text(' text')],
                },
            ],
        });
        setSelection(handle, { text: 'Kept', from: 2, to: 2 });

        expect(handle.execute('paragraph.set').status).toBe('applied');
        expect(firstBlock(handle)).toEqual({
            type: 'paragraph',
            attrs: { lang: 'de-CH', align: 'center', styleId: 'brand-title' },
            content: [text('Kept '), text('bold', 'bold'), text(' text')],
        });
    });

    it('SPEC-rich-text-editing/AC-013 returns not-allowed for a level outside creatableHeadingLevels in a heading of that level', () => {
        const { handle } = mountText({
            blocks: [headingOf(1, text('Title'))],
            policy: { creatableHeadingLevels: [2, 3] },
        });
        setSelection(handle, { text: 'Title', from: 1, to: 1 });

        expect(handle.execute('heading.set', { level: 1 })).toEqual({ status: 'rejected', code: 'not-allowed' });
    });

    it('SPEC-rich-text-editing/AC-014 splits a stored h1 with Enter, and undoes its deletion, with level 1 not creatable', () => {
        const blocks = [para(text('Before')), headingOf(1, text('Title')), para(text('After'))];
        const policy = { creatableHeadingLevels: [2] as const };
        const levelsOf = (mounted: ReturnType<typeof mountText>) =>
            mounted.handle.getSnapshot().document.content.content?.map((block) => block.attrs?.level);
        const split = mountText({ blocks, policy });
        setSelection(split.handle, { text: 'Title', from: 2, to: 2 });
        split.view.dom.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
        const deleted = mountText({ blocks, policy });
        const { doc } = deleted.view.state;
        const heading = doc.child(1);
        const from = doc.child(0).nodeSize;
        deleted.view.dispatch(deleted.view.state.tr.delete(from, from + heading.nodeSize));
        const undone = deleted.handle.execute('history.undo');

        expect(levelsOf(split)).toEqual([undefined, 1, 1, undefined]);
        expect(undone.status).toBe('applied');
        expect(levelsOf(deleted)).toEqual([undefined, 1, undefined]);
    });

    it('SPEC-rich-text-editing/AC-014 names Quote in the text style picker for a paragraph inside a quote', () => {
        const { getByRole } = mountText({
            blocks: [{ type: 'blockquote', content: [para(text('Quoted'))] }],
            toolbar: [['text-style']],
        });

        expect(getByRole('button', { name: 'Quote' })).toBeTruthy();
    });
});
