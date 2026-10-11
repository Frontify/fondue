/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { codeBlock, core } from '#/features';
import { fixtureMention } from '#/features/__tests__/fixtures/features';
import { deliveredProfiles } from '#/features/__tests__/fixtures/profiles';
import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import {
    compileContentModel,
    type ContentNodeJSON,
    defineFeature,
    type Diagnostic,
    type Feature,
    indentLines,
} from '#/model';
import { mountText, para, storedIn, text, textFeatures, textModel } from '#/react/__tests__/fixtures/text';
import { RichTextReader } from '#/reader';
import { runtimeOf } from '#/runtime/runtime';
import { pressKey, setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const model = textModel([...textFeatures(), codeBlock()]);
const code = (value: string, languageId: string | null = null): ContentNodeJSON => ({
    type: 'code_block',
    attrs: { languageId },
    ...(value === '' ? {} : { content: [{ type: 'text', text: value }] }),
});
const blocksOf = (handle: ReturnType<typeof mountText>['handle']) =>
    handle.getSnapshot().document.content.content ?? [];
const blockText = (handle: ReturnType<typeof mountText>['handle'], index = 0) => {
    const block = blocksOf(handle)[index];
    return (block?.content ?? []).map((node) => node.text ?? '').join('');
};
const failureOf = (run: () => unknown) => {
    try {
        run();
    } catch (error) {
        if (error instanceof Error && 'code' in error && 'details' in error) {
            const failed = error as Error & { readonly code: string; readonly details: unknown };
            return { code: failed.code, details: failed.details };
        }
        throw error;
    }
    throw new Error('expected a definition error');
};

/** Presses `key` and reports whether the surface prevented it. */
const press = (
    view: ReturnType<typeof mountText>['view'],
    key: string,
    modifiers: { readonly shift?: boolean } = {},
) => {
    const event = new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        cancelable: true,
        shiftKey: modifiers.shift === true,
    });
    view.dom.dispatchEvent(event);
    return event.defaultPrevented;
};

describe('blocks.code', () => {
    it('keeps spaces, tabs and newlines, and applies no mark or input rule inside a code block', () => {
        const { handle } = mountText({ model, blocks: [code('ab')] });
        setSelection(handle, { text: 'ab', from: 2, to: 2 });

        typeText(handle, '  \t');
        pressKey(handle, 'Enter');
        typeText(handle, '**x** ');
        pressKey(handle, 'Enter');
        typeText(handle, '# ');
        const marked = handle.execute('mark.bold.toggle');

        expect(blocksOf(handle)).toEqual([code('ab  \t\n**x** \n# ')]);
        expect(marked).toMatchObject({ status: 'rejected', code: 'not-applicable' });
    });

    it('turns ``` and a space into a code block with no language, and ```ts into one named ts', () => {
        const plain = mountText({ model, blocks: [para()] });
        const named = mountText({ model, blocks: [para()] });

        typeText(plain.handle, '``` ');
        typeText(named.handle, '```ts ');

        expect(blocksOf(plain.handle)[0]).toMatchObject({ type: 'code_block', attrs: { languageId: null } });
        expect(blocksOf(named.handle)[0]).toMatchObject({ type: 'code_block', attrs: { languageId: 'ts' } });
        expect(plain.handle.execute('history.undo').status).toBe('applied');
        expect(named.handle.execute('history.undo').status).toBe('applied');
        expect(blocksOf(plain.handle)[0]).toMatchObject({ type: 'paragraph', content: [{ text: '``` ' }] });
        expect(blocksOf(named.handle)[0]).toMatchObject({ type: 'paragraph', content: [{ text: '```ts ' }] });
    });

    it('refuses to turn a block holding marks, a mention or a line break into a code block, and converts plain text', () => {
        const withMention = textModel([...textFeatures(), codeBlock(), fixtureMention()]);
        const formatted: ContentNodeJSON = {
            type: 'heading',
            attrs: { nodeId: 'heading-1', level: 2, lang: null },
            content: [text('Brand', 'bold'), { type: 'mention', attrs: { nodeId: 'mention-1', label: 'Ada' } }],
        };
        const heading = mountText({ model: withMention, blocks: [formatted] });
        const broken = mountText({ model: withMention, blocks: [para(text('a'), { type: 'hard_break' }, text('b'))] });
        const plain = mountText({ model: withMention, blocks: [para(text('const a = 1'))] });
        const before = heading.handle.getSnapshot().document.content;

        expect(heading.handle.query('code-block.toggle').disabledReason).toBe('not-allowed');
        expect(heading.handle.execute('code-block.toggle')).toMatchObject({ status: 'rejected', code: 'not-allowed' });
        expect(broken.handle.execute('code-block.toggle')).toMatchObject({ status: 'rejected', code: 'not-allowed' });
        expect(plain.handle.execute('code-block.toggle')).toMatchObject({ status: 'applied' });
        expect(heading.handle.getSnapshot().document.content).toEqual(before);
        expect(blocksOf(plain.handle)).toEqual([code('const a = 1')]);
    });

    it('does not fire the fence rule in a paragraph that holds marks after the caret', () => {
        const { handle } = mountText({ model, blocks: [para(text('```'), text('Brand', 'bold'))] });
        setSelection(handle, { text: '```Brand', from: 3, to: 3 });

        typeText(handle, ' ');

        expect(blocksOf(handle)).toEqual([para(text('``` '), text('Brand', 'bold'))]);
    });

    it('restores the fence text with one undo before the named block is checked', () => {
        const { handle } = mountText({ model, blocks: [para()] });

        typeText(handle, '```ts ');

        expect(blocksOf(handle)[0]).toMatchObject({ type: 'code_block', attrs: { languageId: 'ts' } });
        expect(handle.execute('history.undo').status).toBe('applied');
        expect(blockText(handle)).toBe('```ts ');
    });

    it('indents and outdents the touched lines by two spaces, as one undo step each', () => {
        const source = 'alpha\nbeta\ngamma';
        const { handle, changes } = mountText({ model, blocks: [code(source)] });
        setSelection(handle, { text: 'beta', from: 0, to: 4 });

        const indented = handle.execute('code-block.indent');
        const afterIndent = blockText(handle);
        handle.execute('history.undo');
        const undone = blockText(handle);
        setSelection(handle, { text: 'alpha\nbeta', from: 0, to: 10 });
        const before = changes.length;
        handle.execute('code-block.indent');

        expect(indented.status).toBe('applied');
        expect(afterIndent).toBe('alpha\n  beta\ngamma');
        expect(undone).toBe(source);
        expect(blockText(handle)).toBe('  alpha\n  beta\ngamma');
        expect(changes.length - before).toBe(1);
    });

    it('keeps a single-line selection on the same text when the line is indented', () => {
        const { handle, view } = mountText({ model, blocks: [code('alpha\nbeta\ngamma')] });
        setSelection(handle, { text: 'beta', from: 0, to: 4 });

        handle.execute('code-block.indent');

        expect(view.state.doc.textBetween(view.state.selection.from, view.state.selection.to)).toBe('beta');
    });

    it('outdents one leading space, and does nothing when a line has none', () => {
        const spaced = mountText({ model, blocks: [code(' alpha')] });
        const bare = mountText({ model, blocks: [code('alpha')] });
        setSelection(spaced.handle, { text: ' alpha', from: 2, to: 2 });
        setSelection(bare.handle, { text: 'alpha', from: 1, to: 1 });

        const removed = spaced.handle.execute('code-block.outdent');
        const skipped = bare.handle.execute('code-block.outdent');

        expect(removed.status).toBe('applied');
        expect(blockText(spaced.handle)).toBe('alpha');
        expect(skipped).toMatchObject({ status: 'rejected', code: 'not-applicable' });
        expect(blockText(bare.handle)).toBe('alpha');
    });

    it('does not handle Tab in a code block, including one inside a list item', () => {
        const listed = compileContentModel([core(), listItem(), bulletList(), codeBlock()], {
            id: 'test.code-list',
            version: 1,
        });
        const alone = mountText({ model, blocks: [code('code')] });
        const nested = mountText({
            model: listed,
            blocks: [
                {
                    type: 'bullet_list',
                    attrs: { marker: null },
                    content: [
                        {
                            type: 'list_item',
                            content: [para(text('Item')), code('code')],
                        },
                    ],
                },
            ],
        });
        setSelection(alone.handle, { text: 'code', from: 1, to: 1 });
        setSelection(nested.handle, { text: 'code', from: 1, to: 1 });
        const before = nested.handle.getSnapshot().document.content;

        const left = press(alone.view, 'Tab');
        const stayed = press(nested.view, 'Tab');

        expect(left).toBe(false);
        expect(stayed).toBe(false);
        expect(blockText(alone.handle)).toBe('code');
        expect(nested.handle.getSnapshot().document.content).toEqual(before);
    });

    it.each(Object.entries(deliveredProfiles()))(
        'opens a paragraph after a code block that ends the %s profile',
        (_name, features) => {
            const profile = compileContentModel([...features], { id: 'test.code-profile', version: 1 });
            const { handle, view } = mountText({ model: profile, blocks: [code('const a = 1')] });
            setSelection(handle, { text: 'const a = 1', from: 11, to: 11 });

            pressKey(handle, 'ArrowDown');

            expect(blocksOf(handle).map((block) => block.type)).toEqual(['code_block', 'paragraph']);
            expect(view.state.selection.$from.parent.type.name).toBe('paragraph');
            expect(view.state.selection.$from.parent.content.size).toBe(0);
        },
    );

    it('does not add a paragraph for ArrowDown away from the end, or when a block already follows', () => {
        const middle = mountText({ model, blocks: [code('const a = 1')] });
        const followed = mountText({ model, blocks: [code('const a = 1'), para(text('Next'))] });
        setSelection(middle.handle, { text: 'const a = 1', from: 2, to: 2 });
        setSelection(followed.handle, { text: 'const a = 1', from: 11, to: 11 });

        pressKey(middle.handle, 'ArrowDown');
        pressKey(followed.handle, 'ArrowDown');

        expect(blocksOf(middle.handle)).toEqual([code('const a = 1')]);
        expect(blocksOf(followed.handle).map((block) => block.type)).toEqual(['code_block', 'paragraph']);
        expect(blockText(followed.handle, 1)).toBe('Next');
    });

    it('leaves a code block for a new paragraph on Mod-Enter', () => {
        const { handle, view } = mountText({ model, blocks: [code('const a = 1')] });
        setSelection(handle, { text: 'const a = 1', from: 4, to: 4 });

        pressKey(handle, 'Mod-Enter');

        expect(blocksOf(handle).map((block) => block.type)).toEqual(['code_block', 'paragraph']);
        expect(blockText(handle)).toBe('const a = 1');
        expect(view.state.selection.$from.parent.type.name).toBe('paragraph');
        expect(view.state.selection.$from.parent.content.size).toBe(0);
    });

    it('inserts a newline for Enter inside a code block', () => {
        const { handle } = mountText({ model, blocks: [code('ab')] });
        setSelection(handle, { text: 'ab', from: 1, to: 1 });

        pressKey(handle, 'Enter');

        expect(blocksOf(handle)).toEqual([code('a\nb')]);
    });

    it('pastes plain text into a code block and drops marks', () => {
        const { handle, view } = mountText({ model, blocks: [code('ab')] });
        setSelection(handle, { text: 'ab', from: 1, to: 1 });
        const data = new DataTransfer();
        data.setData('text/plain', '\tx  y\n**z**');
        data.setData('text/html', '<b>x</b>');

        act(() => {
            view.dom.dispatchEvent(
                new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }),
            );
        });

        expect(blocksOf(handle)).toEqual([code('a\tx  y\n**z**b')]);
    });

    it('keeps the stored document when highlighting loads, and decorates a typescript block', async () => {
        const { handle, view, changes } = mountText({
            model,
            blocks: [code('const name: string = "Ada";', 'typescript')],
        });
        const stored = structuredClone(handle.getSnapshot().document);

        await vi.waitFor(() => {
            expect(view.dom.querySelector('[class*="hljs-"]')).not.toBeNull();
        });

        expect(handle.getSnapshot().document).toEqual(stored);
        expect(changes).toEqual([]);
        expect(handle.execute('history.undo').status).not.toBe('applied');
        expect(view.dom.querySelector('[class*="hljs-keyword"]')).not.toBeNull();
    });

    it("sets the language of the block whose menu was chosen while the caret is in another, and checks the block's language", async () => {
        const { handle, unmount } = mountText({ model, blocks: [code('one'), code('two', 'typescript')] });
        setSelection(handle, { text: 'one', from: 1, to: 1 });
        const trigger = await screen.findByRole('button', { name: 'Language: TypeScript' });
        act(() => {
            fireEvent.pointerDown(trigger, {
                button: 0,
                ctrlKey: false,
                pointerType: 'mouse',
            });
        });

        expect(screen.getByRole('menuitemradio', { name: 'TypeScript' })).toHaveAttribute('aria-checked', 'true');
        expect(screen.getByRole('menuitemradio', { name: 'Plain text' })).toHaveAttribute('aria-checked', 'false');
        act(() => {
            fireEvent.click(screen.getByRole('menuitemradio', { name: 'Python' }));
        });

        expect(blocksOf(handle)).toEqual([code('one'), code('two', 'python')]);
        unmount();
    });

    it('runs a node action on a code block, which carries no node ID, at the position its node view reads', () => {
        const { handle, view, unmount } = mountText({ model, blocks: [code('one'), code('two')] });
        setSelection(handle, { text: 'one', from: 1, to: 1 });
        const second = view.state.doc.child(0).nodeSize;
        const actions = runtimeOf(handle)?.nodeActions(() => second);
        const stale = runtimeOf(handle)?.nodeActions(() => undefined);

        let applied: unknown;
        let rejected: unknown;
        act(() => {
            applied = actions?.execute('code-block.language.set', { languageId: 'python' });
            rejected = stale?.execute('code-block.language.set', { languageId: 'python' });
        });

        expect(applied).toMatchObject({ status: 'applied' });
        expect(rejected).toMatchObject({ status: 'rejected', code: 'target-invalid' });
        expect(blocksOf(handle)).toEqual([code('one'), code('two', 'python')]);
        unmount();
    });

    it('renders an unknown language as plain text, with no diagnostic, through the editor, the reader and every codec', async () => {
        const diagnostics: Diagnostic[] = [];
        const document = storedIn(model, [code('const a = 1', 'typescript'), code('plain'), code('x', 'unknown-lang')]);
        const { view, unmount } = mountText({ model, blocks: [code('x', 'unknown-lang')] });
        const reader = render(
            <RichTextReader document={document} model={model} onDiagnostic={(item) => diagnostics.push(item)} />,
        );
        const codecs = createCodecs(model);
        const html = codecs.toHTML(document);
        const plain = codecs.toPlainText(document);
        const markdown = codecs.toMarkdown(document);
        const read = codecs.fromMarkdown(markdown.markdown);

        await act(async () => {
            await import('lowlight');
        });
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(view.dom.querySelector('[class*="hljs-"]')).toBeNull();
        expect(reader.container.querySelector('[class*="hljs-"]')).toBeNull();
        expect(diagnostics).toEqual([]);
        expect([html.diagnostics, plain.diagnostics, markdown.diagnostics, read.diagnostics]).toEqual([[], [], [], []]);
        expect(html.html).toContain('data-language="typescript"');
        expect(html.html).toContain('data-language="unknown-lang"');
        expect(html.html).not.toContain('data-language="null"');
        expect(read).toMatchObject({
            status: 'editable',
            document: {
                content: {
                    content: [
                        { type: 'code_block', attrs: { languageId: 'typescript' } },
                        { type: 'code_block', attrs: { languageId: null } },
                        { type: 'code_block', attrs: { languageId: 'unknown-lang' } },
                    ],
                },
            },
        });
        reader.unmount();
        unmount();
    });

    it('rejects an unknown decoration source and a bad indent direction', () => {
        const decorations = defineFeature({
            id: 'fixture.decorations',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            decorations: ['nope' as 'code-syntax'],
        });
        const direction = defineFeature({
            id: 'fixture.direction',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            commands: { 'code-block.indent': indentLines('sideways' as 'indent') },
        });
        const compile = (feature: Feature) =>
            compileContentModel([core(), feature], { id: 'test.invalid', version: 1 });

        expect(failureOf(() => compile(decorations()))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'fixture.decorations', path: '/decorations/0' },
        });
        expect(failureOf(() => compile(direction()))).toEqual({
            code: 'definition.invalid-declaration',
            details: { feature: 'fixture.direction', path: '/commands/code-block.indent/args/direction' },
        });
    });

    it('offers Code block in the text style picker when the feature is installed', () => {
        const open = (name: string) => {
            act(() => {
                fireEvent.pointerDown(screen.getByRole('button', { name }), {
                    button: 0,
                    ctrlKey: false,
                    pointerType: 'mouse',
                });
            });
            return screen.getAllByRole('menuitemradio').map((row) => row.textContent);
        };
        const withCode = mountText({ model, blocks: [para(text('Hello'))], toolbar: [['text-style']] });
        const offered = open('Normal text');
        withCode.unmount();
        const without = mountText({ blocks: [para(text('Hello'))], toolbar: [['text-style']] });
        const omitted = open('Normal text');

        expect(offered.at(-2)).toBe('Quote');
        expect(offered.at(-1)).toBe('Code block');
        expect(omitted).not.toContain('Code block');
        without.unmount();
    });
});
