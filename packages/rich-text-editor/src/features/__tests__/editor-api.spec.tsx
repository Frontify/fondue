/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { Node } from 'prosemirror-model';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { bold, core, heading, quote } from '#/features';
import { fixtureCallout } from '#/features/__tests__/fixtures/features';
import { spotlight } from '#/features/__tests__/fixtures/spotlight/feature';
import {
    type AuthoringPolicy,
    type CommandOutcome,
    defineEditor,
    defineEditorPlugin,
    type EditorApi,
    type EditorHandle,
    RichTextEditor,
    useEditorApi,
} from '#/index';
import {
    compileContentModel,
    type ContentModel,
    type ContentNodeJSON,
    defineFeature,
    type ResourceLimits,
    type RichTextDocument,
} from '#/model';
import { runtimeOf } from '#/runtime/runtime';
import { type CommandState, type DocumentChange } from '#/runtime/types';
import { pressKey, setSelection, typeText } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

// The probe's commands take any payload, which the shipped command map does not name.
type Handle = EditorHandle<Record<string, unknown>>;

// What the command under test does, and what it saw, set by each test.
let script: (api: EditorApi) => boolean = () => false;
let seen: CommandOutcome | CommandState | undefined;
let walked = 0;
let live: EditorApi | undefined;

const Grab = () => {
    live = useEditorApi();
    return null;
};

const probe = defineEditorPlugin(spotlight, {
    commands: {
        'fixture.api.run': { run: (api) => script(api) },
        'fixture.api.read-only': { readOnly: true, run: (api) => script(api) },
    },
    overlays: [Grab],
});

const model = compileContentModel([core(), bold(), heading(), quote(), spotlight()], { id: 'fixture.api', version: 1 });

const paragraph: ContentNodeJSON = {
    type: 'paragraph',
    attrs: { lang: null },
    content: [
        { type: 'text', text: 'Plain ' },
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
    ],
};
const title: ContentNodeJSON = {
    type: 'heading',
    attrs: { nodeId: 'heading-1', level: 2, lang: null },
    content: [{ type: 'text', text: 'Title' }],
};
const stored = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: model.ref,
    requiredCapabilities: model.capabilities,
    content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [paragraph, title] },
} as unknown as RichTextDocument;

interface Mount {
    readonly policy?: Partial<AuthoringPolicy>;
    readonly limits?: Partial<ResourceLimits>;
    readonly readOnly?: boolean;
    readonly disabled?: boolean;
    readonly model?: ContentModel;
    readonly document?: RichTextDocument;
}

const mount = (options?: Mount) => {
    let given: Mount = {};
    if (options !== undefined) {
        given = options;
    }
    const {
        policy = {},
        limits = {},
        readOnly = false,
        disabled = false,
        model: mounted = model,
        document = stored,
    } = given;
    const definition = defineEditor({ id: 'fixture.api', model: mounted, plugins: [probe], policy, limits });
    const ref = createRef<EditorHandle>();
    const changes: DocumentChange[] = [];
    render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document }}
            readOnly={readOnly}
            disabled={disabled}
            onDocumentChange={(change) => changes.push(change)}
            ref={ref}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    if (ref.current === null) {
        throw new Error('The editor did not mount.');
    }
    return { handle: ref.current as unknown as Handle, changes };
};

const blocksOf = (handle: Handle) => handle.getSnapshot().document.content.content;
/** Runs `run` as a plugin command, as a key or the toolbar would, with the caret in `at`. */
const runIn = (handle: Handle, at: string, run: (api: EditorApi) => boolean, id = 'fixture.api.run') => {
    script = run;
    setSelection(handle, { text: at, from: 1, to: 1 });
    let result: ReturnType<Handle['execute']> | undefined;
    act(() => {
        result = handle.execute(id);
    });
    return result;
};

const selectAll = (handle: Handle) => {
    act(() => {
        pressKey(handle, 'Mod-a');
    });
};

beforeEach(() => {
    script = () => false;
    seen = undefined;
    live = undefined;
});

describe('the blocks a plugin wraps through the editor API', () => {
    const callouts = compileContentModel([core(), bold(), heading(), fixtureCallout(), spotlight()], {
        id: 'fixture.api',
        version: 1,
    });

    it('wraps in a container whose required attribute it gives', () => {
        const { handle } = mount({ model: callouts });

        runIn(handle, 'Plain', (api) => api.blocks.wrap('callout', { tone: 'info' }));

        expect(blocksOf(handle)).toEqual([{ type: 'callout', attrs: { tone: 'info' }, content: [paragraph] }, title]);
    });
});

describe('a plugin command in an editor that cannot be edited', () => {
    it.each([
        ['read-only', { readOnly: true }],
        ['disabled', { disabled: true }],
    ])('writes nothing in a %s editor, even when it runs there', (_name, options) => {
        const { handle } = mount(options);

        const result = runIn(handle, 'Plain', (api) => api.insert.text('x'), 'fixture.api.read-only');

        expect(result).toEqual({ status: 'rejected', code: 'readonly' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });
});

describe('a command that a plugin command runs', () => {
    it('passes the heading levels of the policy, as a command the host runs does', () => {
        const { handle } = mount({ policy: { creatableHeadingLevels: [1, 2] } });

        runIn(handle, 'Plain', (api) => {
            seen = api.commands.execute('heading.set', { level: 3 });
            return true;
        });
        expect(seen).toEqual({ status: 'rejected', code: 'not-allowed' });

        runIn(handle, 'Plain', (api) => {
            seen = api.commands.query('heading.set', { level: 3 });
            return true;
        });
        expect(seen).toMatchObject({ enabled: false, disabledReason: 'not-allowed' });
    });
});

describe('a write from plugin UI', () => {
    it('is a command of its own, which one undo reverts apart from the typing before it', () => {
        const { handle, changes } = mount();
        setSelection(handle, { text: 'Plain', from: 5, to: 5 });
        act(() => {
            typeText(handle, 'ly');
            live?.insert.text('1');
            live?.insert.text('2');
        });

        expect(changes.at(-1)?.origin).toBe('command');
        const text = () => blocksOf(handle)?.[0]?.content?.[0]?.text;
        expect(text()).toBe('Plainly12 ');
        act(() => {
            handle.execute('history.undo');
        });
        expect(text()).toBe('Plainly1 ');
        act(() => {
            handle.execute('history.undo');
        });
        expect(text()).toBe('Plainly ');
    });
});

const text = (value: string, marks?: ContentNodeJSON['marks']): ContentNodeJSON => ({
    type: 'text',
    text: value,
    ...(marks === undefined ? {} : { marks }),
});
const heading2 = (value: string): ContentNodeJSON => ({
    type: 'heading',
    attrs: { level: 2 },
    content: [text(value)],
});
const textsOf = (handle: Handle) =>
    blocksOf(handle)?.map((block) => (block.content ?? []).map((child) => child.text ?? '').join(''));

describe('the writer of the editor API', () => {
    it.each([
        ['a node the vocabulary does not hold', [{ type: 'table' }]],
        ['a mark the vocabulary does not hold', [text('x', [{ type: 'highlight' }])]],
        ['an attribute its type does not take', [{ type: 'heading', attrs: { level: 9 }, content: [text('x')] }]],
        ['a block where only text fits', [heading2('x')]],
    ])('refuses %s as invalid and changes nothing', (_name, nodes) => {
        const { handle, changes } = mount();

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert(api.selectedRange(), nodes);
            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'invalid' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
        expect(changes).toEqual([]);
    });

    it.each([
        [
            'a feature that may not be created',
            { features: { 'blocks.heading': { create: false, edit: true, remove: true, paste: true } } },
            [heading2('x')],
        ],
        ['a heading level the policy does not offer', { creatableHeadingLevels: [1] }, [heading2('x')]],
    ] as const)('refuses %s as policy and changes nothing', (_name, policy, nodes) => {
        const { handle } = mount({ policy: policy as Partial<AuthoringPolicy> });

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'heading-1', at: 'after' }, nodes as unknown as ContentNodeJSON[]);
            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'policy' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it.each([
        ['text longer than the limit', { maxTextLength: 20 }, 'end', [text('x'.repeat(30))]],
        ['more nodes than the limit', { maxDocumentNodes: 8 }, 'after', [heading2('a'), heading2('b'), heading2('c')]],
        [
            'a nesting deeper than the limit',
            { maxDepth: 3 },
            'after',
            [
                {
                    type: 'quote',
                    content: [
                        {
                            type: 'quote',
                            content: [{ type: 'paragraph', attrs: { lang: null }, content: [text('x')] }],
                        },
                    ],
                },
            ],
        ],
    ] as const)('refuses %s as limit and changes nothing', (_name, limits, at, nodes) => {
        const { handle } = mount({ limits });

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'heading-1', at }, nodes as unknown as ContentNodeJSON[]);
            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'limit' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('checks the structure of the written content only, not of a document of 20,000 nodes', () => {
        const filler = Array.from({ length: 10_000 }, (_value, index) => ({
            type: 'paragraph',
            attrs: { lang: null },
            content: [text(`Filler ${index}`)],
        }));
        const large = {
            ...stored,
            content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [paragraph, title, ...filler] },
        } as unknown as RichTextDocument;
        const { handle } = mount({ document: large });
        setSelection(handle, { text: 'Plain', from: 1, to: 1 });
        script = (api) =>
            api.content.insert({ nodeId: 'heading-1', at: 'after' }, [heading2('Warm')]).status === 'applied';
        // The first write measures the document size, which later writes read from a cache.
        act(() => {
            handle.execute('fixture.api.run');
        });
        script = (api) => {
            const children = vi.spyOn(Node.prototype, 'children', 'get');
            seen = api.content.insert({ nodeId: 'heading-1', at: 'after' }, [heading2('Added')]);
            // The spy counts every read of a node's children during the write, which 20,000 nodes would make 20,000.
            walked = children.mock.calls.length;
            children.mockRestore();
            return true;
        };

        act(() => {
            handle.execute('fixture.api.run');
        });

        expect(seen).toMatchObject({ status: 'applied' });
        expect(walked).toBeLessThan(1000);
    });

    it('writes inline nodes where the paragraph carries a node ID', () => {
        const paragraphIds = defineFeature({
            id: 'fixture.paragraph-ids',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            attributes: { nodeId: { on: ['paragraph'], value: { type: 'string', required: true } } },
            formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
        });
        const identified = compileContentModel([core(), bold(), heading(), spotlight(), paragraphIds()], {
            id: 'fixture.api',
            version: 1,
        });
        const content = [{ ...paragraph, attrs: { nodeId: 'paragraph-1', lang: null } }, title];
        const document = {
            ...stored,
            requiredCapabilities: identified.capabilities,
            content: { ...stored.content, content },
        } as RichTextDocument;
        const { handle } = mount({ model: identified, document });

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert(api.selectedRange(), [text('x')]);
            return true;
        });

        expect(seen).toMatchObject({ status: 'applied' });
        expect(textsOf(handle)).toEqual(['Pxlain bold', 'Title']);
    });

    it('makes each write from plugin UI one undo step', () => {
        const { handle } = mount();
        act(() => {
            live?.content.insert({ nodeId: 'heading-1', at: 'end' }, [text('1')]);
            live?.content.insert({ nodeId: 'heading-1', at: 'end' }, [text('2')]);
        });
        expect(textsOf(handle)?.[1]).toBe('Title12');

        act(() => {
            handle.execute('history.undo');
        });
        expect(textsOf(handle)?.[1]).toBe('Title1');
    });

    it('makes the writes of one command part of its one undo step', () => {
        const { handle } = mount();
        runIn(handle, 'Plain', (api) => {
            api.content.insert({ nodeId: 'heading-1', at: 'end' }, [text('1')]);
            api.content.insert({ nodeId: 'heading-1', at: 'end' }, [text('2')]);
            return true;
        });
        expect(textsOf(handle)?.[1]).toBe('Title12');

        act(() => {
            handle.execute('history.undo');
        });
        expect(textsOf(handle)?.[1]).toBe('Title');
    });
});

describe('the active state of the editor API', () => {
    it('answers for a container around the selection, not only for textblocks', () => {
        const quoted: ContentNodeJSON = { type: 'blockquote', attrs: {}, content: [paragraph] };
        const document = { ...stored, content: { ...stored.content, content: [quoted, title] } };
        const { handle } = mount({ document: document as unknown as RichTextDocument });

        setSelection(handle, { text: 'Plain' });
        const inside = live?.blocks.active('blockquote');
        setSelection(handle, { text: 'Title' });
        const outside = live?.blocks.active('blockquote');
        selectAll(handle);
        const spanning = live?.blocks.active('blockquote');

        expect([inside, outside, spanning]).toEqual([true, false, 'mixed']);
    });
});

describe('the history of the editor API', () => {
    it('undoes and redoes, and a query reads whether it can undo without running anything', () => {
        const { handle } = mount();
        const canUndo = (): CommandState => {
            script = (api) => api.history.canUndo();
            return handle.query('fixture.api.run');
        };
        const before = [live?.history.canUndo(), canUndo().enabled];
        setSelection(handle, { text: 'Plain', from: 0, to: 0 });
        typeText(handle, 'x');
        const typed = handle.getSnapshot().document;
        const undoable = live?.history.canUndo();
        const queryable = canUndo().enabled;
        const redoable = live?.history.canRedo();
        const after = [undoable, queryable, redoable];
        const queried = handle.getSnapshot().document;

        act(() => {
            live?.history.undo();
        });
        const undone = [blocksOf(handle), live?.history.canRedo()];
        act(() => {
            live?.history.redo();
        });

        expect(before).toEqual([false, false]);
        expect(after).toEqual([true, true, false]);
        expect(queried).toBe(typed);
        expect(undone).toEqual([[paragraph, title], true]);
        expect(handle.getSnapshot().document).toEqual(typed);
    });
});

describe('the nearest node of the editor API', () => {
    it('reads the node of a type around the selection, or none', () => {
        const { handle } = mount();

        runIn(handle, 'Title', (api) => {
            const found = api.nearest('heading');
            seen = { status: found?.nodeId === 'heading-1' && found.attrs.level === 2 ? 'applied' : 'no-op' };
            return api.nearest('paragraph') === undefined;
        });

        expect(seen).toEqual({ status: 'applied' });
    });
});

describe('the marks of the editor API at a caret', () => {
    it('scrolls the selection into view when it only drops the stored marks', () => {
        const { handle } = mount();
        const view = runtimeOf(handle)?.view;
        setSelection(handle, { text: 'bold', from: 2, to: 2 });
        script = (api) => api.marks.remove('bold');
        const scrolls = () => (view?.state as unknown as { scrollToSelection: number }).scrollToSelection;
        const before = scrolls();

        act(() => {
            handle.execute('fixture.api.run');
        });

        expect(scrolls()).toBe(before + 1);
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });
});

describe('the block moves of the editor API', () => {
    it('moves the selected block up and down, and refuses a move past the first block', () => {
        const { handle } = mount();

        const up = runIn(handle, 'Title', (api) => api.blocks.move('up'))?.status;
        const moved = textsOf(handle);
        const past = runIn(handle, 'Title', (api) => api.blocks.move('up'))?.status;
        const down = runIn(handle, 'Title', (api) => api.blocks.move('down'))?.status;

        expect([up, past, down]).toEqual(['applied', 'rejected', 'applied']);
        expect(moved).toEqual(['Title', 'Plain bold']);
        expect(textsOf(handle)).toEqual(['Plain bold', 'Title']);
    });
});

describe('a name the model does not install, in the editor API', () => {
    it('is answered with false or nothing by every member that takes a mark, a node or a list item', () => {
        const { handle } = mount();
        const answers: Record<string, unknown> = {};

        runIn(handle, 'Plain', (api) => {
            answers.markActive = api.marks.active('missing');
            answers.markToggle = api.marks.toggle('missing');
            answers.blockActive = api.blocks.active('missing');
            answers.blockSet = api.blocks.set('missing');
            answers.nearest = api.nearest('missing');
            return false;
        });

        expect(answers).toEqual({
            markActive: false,
            markToggle: false,
            blockActive: false,
            blockSet: false,
            nearest: undefined,
        });
    });
});

describe('the content writes of the editor API that change nothing or go too far', () => {
    it('reports no-op for an empty insert and an empty replacement at a caret', () => {
        const { handle, changes } = mount();
        const outcomes: unknown[] = [];

        runIn(handle, 'Plain', (api) => {
            outcomes.push(api.content.insert(api.selectedRange(), []).status);
            outcomes.push(api.content.replace(api.selectedRange(), []).status);
            return true;
        });

        expect(outcomes).toEqual(['no-op', 'no-op']);
        expect(changes).toEqual([]);
    });

    it('refuses a write that takes the document past a resource limit', () => {
        const { handle, changes } = mount({ limits: { maxDocumentNodes: 8 } });

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'heading-1', at: 'after' }, [
                { type: 'paragraph', content: [text('a')] },
                { type: 'paragraph', content: [text('b')] },
            ]);
            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'limit' });
        expect(changes).toEqual([]);
    });

    it('refuses a write from plugin UI in an editor that cannot be edited, with the rejection of the session', () => {
        const { handle } = mount({ readOnly: true });
        setSelection(handle, { text: 'Plain', from: 1, to: 1 });
        let outcome: unknown;

        act(() => {
            outcome = live?.content.insert(live.selectedRange(), [text('x')]);
        });

        expect(outcome).toEqual({ status: 'rejected', code: 'readonly' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });
});
