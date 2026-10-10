/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextSelection } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { fixtureFigure } from '#/features/__fixtures__/features';
import { vocabularyLists, vocabularyTables } from '#/features/__fixtures__/vocabulary';
import { type ContentNodeJSON, featureFromManifest } from '#/model';
import { setSelection, typeText } from '#/testing';

import { mountText, para, text, textFeatures, textModel } from '../../../fixtures/editor/text';

/** A data manifest's container: a block whose content is `block+`, with a command that wraps blocks in it. */
const acmeBox = featureFromManifest({
    id: 'acme.box',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        acme_box: { group: 'block', content: 'block+', attrs: {}, html: ['aside', 0], parse: [{ tag: 'aside' }] },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
    commands: { 'acme.box.toggle': { capability: 'wrapIn', node: 'acme_box' } },
});
const model = textModel([...textFeatures(), acmeBox(), vocabularyLists(), vocabularyTables(), fixtureFigure()]);

type Mounted = ReturnType<typeof mountText>;

/** Puts the caret in the document's last empty paragraph, or empty heading, which no text names. */
const caretInEmptyParagraph = ({ view }: Mounted) => {
    let at = 0;
    view.state.doc.descendants((node, pos) => {
        if ((node.type.name === 'paragraph' || node.type.name === 'heading') && node.content.size === 0) {
            at = pos + 1;
        }
    });
    view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, at)));
};
/** Presses Enter at the surface and returns whether the editor prevented it. */
const pressEnter = ({ view }: Mounted, modifiers: KeyboardEventInit = {}) => {
    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true, ...modifiers });
    view.dom.dispatchEvent(event);
    return event.defaultPrevented;
};
const blocksOf = ({ handle }: Mounted) => handle.getSnapshot().document.content.content;
const cell = (...content: readonly ContentNodeJSON[]) => ({
    type: 'table_cell',
    attrs: { colspan: 1, rowspan: 1, colwidth: null },
    content: [...content],
});

describe('blocks.quote', () => {
    for (const container of ['blockquote', 'acme_box']) {
        it(`SPEC-rich-text-editing/AC-026 leaves a ${container} on Enter in its empty last paragraph, with a new paragraph after it`, () => {
            const mounted = mountText({
                model,
                blocks: [{ type: container, content: [para(text('Quoted')), para()] }, para(text('After'))],
            });
            caretInEmptyParagraph(mounted);

            const prevented = pressEnter(mounted);
            typeText(mounted.handle, 'x');

            expect(prevented).toBe(true);
            expect(blocksOf(mounted)).toEqual([
                { type: container, content: [para(text('Quoted'))] },
                para(text('x')),
                para(text('After')),
            ]);
        });
    }

    it('SPEC-rich-text-editing/AC-026 leaves a quote whose only paragraph is empty, putting a paragraph in its place', () => {
        const mounted = mountText({ model, blocks: [para(text('Before')), { type: 'blockquote', content: [para()] }] });
        caretInEmptyParagraph(mounted);

        expect(pressEnter(mounted)).toBe(true);
        expect(blocksOf(mounted)).toEqual([para(text('Before')), { type: 'paragraph', attrs: { lang: null } }]);
    });

    it('SPEC-rich-text-editing/AC-026 keeps Enter in an empty paragraph that is not last in a quote to the base keys, which lift it out', () => {
        const mounted = mountText({
            model,
            blocks: [{ type: 'blockquote', content: [para(), para(text('x'))] }],
        });
        caretInEmptyParagraph(mounted);

        expect(pressEnter(mounted)).toBe(true);
        expect(blocksOf(mounted)).toEqual([
            { type: 'paragraph', attrs: { lang: null } },
            { type: 'blockquote', content: [para(text('x'))] },
        ]);
    });

    it('SPEC-rich-text-editing/AC-026 does not turn an empty last heading of a quote into a paragraph on Enter', () => {
        const heading = { type: 'heading', attrs: { nodeId: 'heading-1', level: 2, lang: null } };
        const quote = { type: 'blockquote', content: [para(text('Quoted')), { ...heading, content: [] }] };
        const mounted = mountText({ model, blocks: [quote, para(text('After'))] });
        caretInEmptyParagraph(mounted);

        pressEnter(mounted);

        expect(blocksOf(mounted)).toEqual([
            { type: 'blockquote', content: [para(text('Quoted'))] },
            heading,
            para(text('After')),
        ]);
    });

    it('SPEC-rich-text-editing/AC-026 does not leave a quote on Enter with Ctrl, Alt or Meta held', () => {
        const blocks = [{ type: 'blockquote', content: [para(text('Quoted')), para()] }, para(text('After'))];
        const results = [{ ctrlKey: true }, { altKey: true }, { metaKey: true }].map((held) => {
            const mounted = mountText({ model, blocks });
            caretInEmptyParagraph(mounted);
            const prevented = pressEnter(mounted, held);
            const after = blocksOf(mounted) ?? [];
            const [quote] = after;
            let kept = 0;
            if (quote?.content !== undefined) {
                kept = quote.content.length;
            }
            mounted.unmount();
            return [prevented, after.length, kept];
        });

        expect(results).toEqual([
            [false, 2, 2],
            [false, 2, 2],
            [false, 2, 2],
        ]);
    });

    it('SPEC-rich-text-editing/AC-026 does not reach a block group whose content also takes a node outside the block group', () => {
        const mixed = featureFromManifest({
            id: 'acme.mixed',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            nodes: {
                acme_mixed: {
                    group: 'block',
                    content: '(paragraph | acme_part)+',
                    attrs: {},
                    html: ['aside', 0],
                    parse: [{ tag: 'aside' }],
                },
                acme_part: { content: 'inline*', attrs: {}, html: ['div', 0], parse: [] },
            },
            formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
        });
        const mounted = mountText({
            model: textModel([...textFeatures(), mixed()]),
            blocks: [{ type: 'acme_mixed', content: [para(text('Kept')), para()] }, para(text('After'))],
        });
        caretInEmptyParagraph(mounted);
        const { view } = mounted;
        const row = view.state.plugins.find((plugin) =>
            (plugin as unknown as { key: string }).key.startsWith('container-keys$'),
        );
        if (row === undefined) {
            throw new Error('The model has no container keys.');
        }

        expect(row.props.handleKeyDown?.call(row, view, new KeyboardEvent('keydown', { key: 'Enter' }))).toBe(false);
    });

    it('SPEC-rich-text-editing/AC-026 does not reach a list item, a table cell or a figure, which are no containers', () => {
        const list = {
            type: 'bullet_list',
            attrs: { marker: null },
            content: [{ type: 'list_item', content: [para(text('Item')), para()] }],
        };
        const table = {
            type: 'table',
            attrs: { nodeId: 'table-1' },
            content: [{ type: 'table_row', content: [cell(para(text('Cell')), para())] }],
        };
        const figure = {
            type: 'figure',
            attrs: { nodeId: 'figure-1' },
            content: [{ type: 'figure_image', attrs: { nodeId: 'image-1' } }],
        };
        const quote = { type: 'blockquote', content: [para(text('Quoted')), para()] };
        // Whether the container row takes Enter, apart from the base keys of later rows.
        const reached = [list, table, figure, quote].map((block) => {
            const mounted = mountText({ model, blocks: [block, para(text('After'))] });
            if (block === figure) {
                setSelection(mounted.handle, { nodeId: 'image-1' });
            } else {
                caretInEmptyParagraph(mounted);
            }
            const { view } = mounted;
            const row = view.state.plugins.find((plugin) =>
                (plugin as unknown as { key: string }).key.startsWith('container-keys$'),
            );
            if (row === undefined) {
                throw new Error('The model has no container keys.');
            }
            const result = row.props.handleKeyDown?.call(row, view, new KeyboardEvent('keydown', { key: 'Enter' }));
            mounted.unmount();
            return result;
        });

        expect(reached).toEqual([false, false, false, true]);
    });

    it('SPEC-rich-text-editing/AC-037 keeps > and a space typed inside a quote as text, never lifting the quote', () => {
        const mounted = mountText({ model, blocks: [{ type: 'blockquote', content: [para(text('Quoted'))] }] });
        setSelection(mounted.handle, { text: 'Quoted', from: 0, to: 0 });
        typeText(mounted.handle, '> ');

        expect(blocksOf(mounted)).toEqual([{ type: 'blockquote', content: [para(text('> Quoted'))] }]);
    });

    it('SPEC-rich-text-editing/AC-069 moves a quote whose only paragraph holds the caret', () => {
        const quote = { type: 'blockquote', content: [para(text('Quoted'))] };
        const mounted = mountText({ model, blocks: [para(text('one')), quote, para(text('two'))] });
        setSelection(mounted.handle, { text: 'Quoted', from: 1, to: 1 });

        const up = mounted.handle.execute('block.move.up').status;
        const moved = blocksOf(mounted);
        const down = mounted.handle.execute('block.move.down').status;

        expect([up, down]).toEqual(['applied', 'applied']);
        expect(moved).toEqual([quote, para(text('one')), para(text('two'))]);
        expect(blocksOf(mounted)).toEqual([para(text('one')), quote, para(text('two'))]);
    });

    it('SPEC-rich-text-editing/AC-069 moves two selected paragraphs as a pair, and one undo restores their order', () => {
        const blocks = ['one', 'two', 'three', 'four'].map((value) => para(text(value)));
        const mounted = mountText({ model, blocks });
        const { view } = mounted;
        // From the first character of 'two' to the first of 'three'.
        const spanning = () => {
            const one = view.state.doc.child(0).nodeSize;
            const two = view.state.doc.child(1).nodeSize;
            view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, one + 2, one + two + 2)));
        };
        const order = () => view.state.doc.children.map((child) => child.textContent);

        spanning();
        const up = mounted.handle.execute('block.move.up').status;
        const movedUp = order();
        const undoneUp = mounted.handle.execute('history.undo').status;
        const restoredUp = order();
        spanning();
        const down = mounted.handle.execute('block.move.down').status;
        const movedDown = order();
        const undoneDown = mounted.handle.execute('history.undo').status;

        expect([up, down, undoneUp, undoneDown]).toEqual(['applied', 'applied', 'applied', 'applied']);
        expect([movedUp, restoredUp, movedDown, order()]).toEqual([
            ['two', 'three', 'one', 'four'],
            ['one', 'two', 'three', 'four'],
            ['one', 'four', 'two', 'three'],
            ['one', 'two', 'three', 'four'],
        ]);
    });
});
