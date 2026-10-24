/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render, screen } from '@testing-library/react';
import { Node } from 'prosemirror-model';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { align, bold, codeBlock, core, fontColor, heading, links, mediaImage, quote } from '#/features';
import { fixtureCallout } from '#/features/__tests__/fixtures/features';
import { spotlight } from '#/features/__tests__/fixtures/spotlight/feature';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { taskList } from '#/features/lists-task/feature';
import {
    type AuthoringPolicy,
    type CommandOutcome,
    defineEditor,
    defineEditorPlugin,
    defineReactPresentation,
    type EditorApi,
    type EditorHandle,
    type ReactPresentation,
    RichTextEditor,
    type SelectionHandle,
    useEditorApi,
} from '#/index';
import {
    type ColorToken,
    compileContentModel,
    type ContentModel,
    type ContentNodeJSON,
    decodeDocument,
    defineFeature,
    type JsonObject,
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

const PANEL = 'fixture.api';

// The probe's commands take any payload, which the shipped command map does not name.
type Handle = EditorHandle<Record<string, unknown>>;

// What the command under test does, and what it saw, set by each test.
let script: (api: EditorApi) => boolean = () => false;
let seen: CommandOutcome | CommandState | undefined;
let held: SelectionHandle | undefined;
let walked = 0;
let live: EditorApi | undefined;

const ProbePanel = () => <section aria-label="Probe panel" />;

const Grab = () => {
    live = useEditorApi();
    return null;
};

const probe = defineEditorPlugin(spotlight, {
    commands: {
        'fixture.api.run': { run: (api) => script(api) },
        'fixture.api.read-only': { readOnly: true, run: (api) => script(api) },
        'fixture.api.open': {
            run: (api) => {
                api.panels.open(PANEL);
                return true;
            },
        },
        'fixture.api.enabled': {
            enabled: (api) => {
                api.panels.open(PANEL);
                return true;
            },
            run: (api) => api.insert.text('x'),
        },
    },
    keys: { 'Mod-Alt-8': (api) => script(api) },
    overlays: [Grab],
    panels: [{ control: PANEL, component: ProbePanel }],
});

const model = compileContentModel(
    [core(), bold(), heading(), links(), fontColor(), codeBlock(), mediaImage(), quote(), spotlight()],
    { id: 'fixture.api', version: 1 },
);

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
    readonly presentation?: ReactPresentation;
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
        presentation,
        policy = {},
        limits = {},
        readOnly = false,
        disabled = false,
        model: own = model,
        document = stored,
    } = given;
    const definition = defineEditor({ id: 'fixture.api', model: own, plugins: unitsOf(own, [probe]), policy, limits });
    const ref = createRef<EditorHandle>();
    const changes: DocumentChange[] = [];
    const shown: { presentation?: ReactPresentation } = {};
    if (presentation !== undefined) {
        shown.presentation = presentation;
    }
    render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document }}
            {...shown}
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
const blockAt = (handle: Handle, index: number) => {
    const blocks = blocksOf(handle);
    return blocks?.[index];
};
const attrsAt = (handle: Handle, index: number) => {
    const block = blockAt(handle, index);
    return block?.attrs;
};
const childAt = (handle: Handle, index: number) => {
    const block = blockAt(handle, index);
    const children = block?.content;
    return children?.[0];
};

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

const probePanel = () => screen.queryByRole('region', { name: 'Probe panel' });

beforeEach(() => {
    script = () => false;
    seen = undefined;
    held = undefined;
    live = undefined;
});

describe('the blocks a plugin wraps through the editor API', () => {
    const callouts = compileContentModel(
        [core(), bold(), heading(), links(), mediaImage(), fixtureCallout(), spotlight()],
        {
            id: 'fixture.api',
            version: 1,
        },
    );

    it('wraps in a container whose required attribute it gives', () => {
        const { handle } = mount({ model: callouts });

        runIn(handle, 'Plain', (api) => api.blocks.wrap('callout', { tone: 'info' }));

        expect(blocksOf(handle)).toEqual([{ type: 'callout', attrs: { tone: 'info' }, content: [paragraph] }, title]);
    });
});

describe('the attributes a plugin writes through the editor API', () => {
    it('sets an attribute only on the listed types that declare it, and refuses one that none declares', () => {
        const aligned = compileContentModel(
            [core(), bold(), heading(), align(), links(), fontColor(), codeBlock(), mediaImage(), spotlight()],
            { id: 'fixture.api', version: 1 },
        );
        const { handle } = mount({ model: aligned });

        expect(runIn(handle, 'Plain', (api) => api.attributes.set('textblocks', { missing: 1 }))?.status).toBe(
            'rejected',
        );
        expect(runIn(handle, 'Plain', (api) => api.attributes.set('textblocks', { align: 'center' }))?.status).toBe(
            'applied',
        );
        expect(attrsAt(handle, 0)?.align).toBe('center');
    });

    it('changes nothing when no selected node of the listed types declares the attribute', () => {
        const { handle } = mount();

        const result = runIn(handle, 'Plain', (api) => api.attributes.set(['paragraph', 'heading'], { level: 3 }));

        expect(result?.status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('refuses a mark that sets both attributes of which exactly one is set', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain' });
        script = (api) => api.marks.set('font_color', { tokenId: 'brand.blue', value: '#ff0000' });

        expect(handle.execute('fixture.api.run').status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);

        script = (api) => api.marks.set('font_color', { tokenId: 'brand.blue' });
        expect(handle.execute('fixture.api.run').status).toBe('applied');
    });

    it('refuses a mark without an attribute that has no default', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain' });
        script = (api) => api.marks.set('link', { openInNewWindow: true });

        expect(handle.execute('fixture.api.run').status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('refuses an attribute longer than the definition allows', () => {
        const { handle } = mount({ limits: { maxAttributeLength: 50 } });
        setSelection(handle, { text: 'Plain' });
        script = (api) => api.marks.set('link', { href: 'https://frontify.com/brand', styleId: 'a'.repeat(100) });

        expect(handle.execute('fixture.api.run').status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);

        script = (api) => api.marks.set('link', { href: 'https://frontify.com/brand' });
        expect(handle.execute('fixture.api.run').status).toBe('applied');
    });

    it('sets a link longer than the attribute limit, which decode leaves to the URL check', () => {
        const { handle } = mount({ limits: { maxAttributeLength: 100 } });
        setSelection(handle, { text: 'Plain' });
        script = (api) => api.marks.set('link', { href: `https://frontify.com/${'a'.repeat(300)}` });

        expect(handle.execute('fixture.api.run').status).toBe('applied');
    });

    it('inserts a block with the attributes given, and refuses ones its type does not take', () => {
        const { handle } = mount();

        const insert = (attrs: JsonObject) =>
            runIn(handle, 'Plain', (api) => api.insert.node('heading', attrs).status === 'applied');

        expect(insert({ level: 9 })?.status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);

        expect(insert({ level: 3 })?.status).toBe('applied');
        expect(blocksOf(handle)?.map((block) => block.attrs?.level ?? null)).toEqual([null, 3, 2]);
    });

    it('refuses a heading level that the policy does not offer, by every write that makes one', () => {
        const { handle } = mount({ policy: { creatableHeadingLevels: [1, 2] } });

        const results = [
            runIn(handle, 'Plain', (api) => api.blocks.set('heading', { level: 3 })),
            runIn(handle, 'Title', (api) => api.attributes.set('heading', { level: 3 })),
            runIn(handle, 'Plain', (api) => api.insert.node('heading', { level: 3 }).status === 'applied'),
        ];

        expect(results.map((result) => result?.status)).toEqual(['rejected', 'rejected', 'rejected']);
        expect(blocksOf(handle)).toEqual([paragraph, title]);
        expect(runIn(handle, 'Plain', (api) => api.blocks.set('heading', { level: 2 }))?.status).toBe('applied');
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

    it('refuses the write of a command it runs, and still opens what only opens', () => {
        const { handle } = mount({ readOnly: true });

        runIn(
            handle,
            'Plain',
            (api) => {
                seen = api.commands.execute('text.insert', { text: 'x' });
                return true;
            },
            'fixture.api.read-only',
        );
        expect(seen).toEqual({ status: 'rejected', code: 'readonly' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);

        runIn(
            handle,
            'Plain',
            (api) => {
                api.panels.open(PANEL);
                return true;
            },
            'fixture.api.read-only',
        );
        expect(probePanel()).not.toBeNull();
    });
});

describe('a command that a plugin command runs', () => {
    it('opens its panel as the outer command would', () => {
        const { handle } = mount();

        runIn(handle, 'Plain', (api) => api.commands.execute('fixture.api.open').status === 'applied');

        expect(probePanel()).not.toBeNull();
    });

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

    it('is refused where it would drop content its target cannot hold', () => {
        const { handle } = mount();

        runIn(handle, 'Plain', (api) => {
            seen = api.commands.execute('code-block.toggle', { languageId: 'typescript' });
            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'not-allowed' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('reports not-allowed when its run returns false after a write was refused as not allowed', () => {
        const { handle } = mount();
        // The paragraph holds bold text, which a code block cannot keep.
        script = (api) => api.blocks.set('code_block');
        setSelection(handle, { text: 'Plain', from: 1, to: 1 });

        let result: ReturnType<Handle['execute']> | undefined;
        act(() => {
            result = handle.execute('fixture.api.run');
        });

        expect(result).toEqual({ status: 'rejected', code: 'not-allowed' });
        expect(handle.query('fixture.api.run')).toMatchObject({ enabled: false, disabledReason: 'not-allowed' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('is not enabled where it would open the picker for content the policy refuses', () => {
        const { handle } = mount({
            policy: { features: { 'media.image': { create: false, edit: true, remove: true, paste: true } } },
        });

        runIn(handle, 'Plain', (api) => {
            seen = api.commands.query('image.insert');
            return true;
        });

        expect(seen).toMatchObject({ enabled: false, disabledReason: 'not-allowed' });
    });
});

describe('what a plugin command defers', () => {
    it('runs nothing that its `enabled` check asked for', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain', from: 0, to: 0 });

        let result: ReturnType<Handle['execute']> | undefined;
        act(() => {
            result = handle.execute('fixture.api.enabled');
        });

        expect(result?.status).toBe('applied');
        expect(probePanel()).toBeNull();
    });

    it('releases no target when it is only queried', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain', from: 0, to: 0 });
        const captured = handle.captureTarget({ purpose: 'format', onIntersectingEdit: 'map' });
        if (captured.status !== 'captured') {
            throw new Error('The target was not captured.');
        }
        held = captured.target;
        script = (api) => {
            if (held !== undefined) {
                api.targets.release(held);
            }
            return true;
        };

        handle.query('fixture.api.run');

        expect(handle.execute('text.insert', { text: 'x' }, { target: held }).status).toBe('applied');
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
    it('replaces, inserts and deletes stored nodes by range or node ID', () => {
        const { handle } = mount();

        runIn(handle, 'Plain', (api) => {
            const run = api.blocks.list('heading')[0];
            if (run === undefined) {
                return false;
            }
            seen = api.content.replace(run.range, [heading2('Renamed')]);
            return seen.status === 'applied';
        });
        expect(seen).toMatchObject({ status: 'applied' });
        expect(textsOf(handle)).toEqual(['Plain bold', 'Renamed']);

        const renamed = () => blocksOf(handle)?.[1]?.attrs?.nodeId as string;
        expect(renamed()).not.toBe('heading-1');

        const nodeId = renamed();
        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId, at: 'before' }, [heading2('Before')]);
            return true;
        });
        expect(textsOf(handle)).toEqual(['Plain bold', 'Before', 'Renamed']);

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId, at: 'end' }, [text('!')]);
            return true;
        });
        expect(textsOf(handle)).toEqual(['Plain bold', 'Before', 'Renamed!']);

        runIn(handle, 'Plain', (api) => {
            seen = api.content.delete({ nodeId });
            return true;
        });
        expect(seen).toMatchObject({ status: 'applied' });
        expect(textsOf(handle)).toEqual(['Plain bold', 'Before']);
    });

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

    it('refuses bold text in a code block as invalid, where paste would drop the mark', () => {
        const { handle } = mount();

        runIn(handle, 'Title', (api) => {
            api.blocks.set('code_block');
            seen = api.content.insert(api.selectedRange(), [text('x', [{ type: 'bold' }])]);
            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'invalid' });
    });

    it.each([
        [
            'a feature that may not be pasted',
            { features: { 'marks.bold': { create: true, edit: true, remove: true, paste: false } } },
            [text('x', [{ type: 'bold' }])],
        ],
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

    it("refuses a link the host's URL policy refuses as policy and changes nothing", () => {
        const narrowed = compileContentModel(
            [
                core(),
                bold(),
                heading(),
                links({ allowedHosts: ['frontify.com'] }),
                fontColor(),
                codeBlock(),
                mediaImage(),
                spotlight(),
            ],
            { id: 'fixture.api', version: 1 },
        );
        const { handle } = mount({ model: narrowed });
        const link = [{ type: 'link', attrs: { href: 'https://evil.example/' } }];

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'heading-1' }, [{ type: 'paragraph', content: [text('x', link)] }]);
            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'policy' });
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('writes inline nodes where the paragraph carries a node ID', () => {
        const paragraphIds = defineFeature({
            id: 'fixture.paragraph-ids',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            attributes: { nodeId: { on: ['paragraph'], value: { type: 'string', required: true } } },
            formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
        });
        const identified = compileContentModel(
            [core(), bold(), heading(), links(), fontColor(), codeBlock(), mediaImage(), spotlight(), paragraphIds()],
            { id: 'fixture.api', version: 1 },
        );
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

    it('reads the stored nodes under a range, marks and a nested list included, which a command writes back changed', () => {
        const listModel = compileContentModel([core(), bold(), listItem(), bulletList(), spotlight()], {
            id: 'fixture.api',
            version: 1,
        });
        const item = (...content: ContentNodeJSON[]): ContentNodeJSON => ({ type: 'list_item', content });
        const list = (...content: ContentNodeJSON[]): ContentNodeJSON => ({
            type: 'bullet_list',
            attrs: { marker: null },
            content,
        });
        const para = (...content: ContentNodeJSON[]): ContentNodeJSON => ({
            type: 'paragraph',
            attrs: { lang: null },
            content,
        });
        const withoutMarks = (node: ContentNodeJSON): ContentNodeJSON => {
            const copy: Record<string, unknown> = { ...node };
            delete copy.marks;
            if (node.content !== undefined) {
                copy.content = node.content.map(withoutMarks);
            }
            return copy as unknown as ContentNodeJSON;
        };
        const nested = list(
            item(
                para(text('One '), text('bold', [{ type: 'bold' }])),
                list(item(para(text('Two', [{ type: 'bold' }])))),
            ),
        );
        const document = {
            ...stored,
            model: listModel.ref,
            requiredCapabilities: listModel.capabilities,
            content: { ...stored.content, content: [para(text('Before')), nested] },
        } as unknown as RichTextDocument;
        const { handle } = mount({ model: listModel, document });
        let read: readonly ContentNodeJSON[] | undefined;

        runIn(handle, 'Before', (api) => {
            const [outer] = api.blocks.list('bullet_list');
            const [first] = api.blocks.list('paragraph');
            if (outer === undefined || first === undefined) {
                return false;
            }
            api.content.replace(first.range, [para(text('A longer first paragraph'))]);
            read = api.content.read(outer.range);
            seen = api.content.replace(outer.range, (read ?? []).map(withoutMarks));
            return true;
        });

        expect(read).toEqual([nested]);
        expect(seen).toMatchObject({ status: 'applied' });
        expect(blocksOf(handle)).toEqual([
            para(text('A longer first paragraph')),
            list(item(para(text('One bold')), list(item(para(text('Two')))))),
        ]);
    });
});

describe('a range of the editor API', () => {
    it('maps through the writes its command made since it was read', () => {
        const { handle } = mount();

        runIn(handle, 'Plain', (api) => {
            const [first] = api.blocks.list('paragraph');
            const [second] = api.blocks.list('heading');
            if (first === undefined || second === undefined) {
                return false;
            }
            api.content.replace(first.range, [{ type: 'paragraph', content: [text('A much longer paragraph')] }]);
            seen = api.content.replace(second.range, [heading2('Second')]);
            return true;
        });

        expect(seen).toMatchObject({ status: 'applied' });
        expect(textsOf(handle)).toEqual(['A much longer paragraph', 'Second']);
    });

    it('is refused once the document it was read from changed outside a command', () => {
        const { handle } = mount();
        const headings = live?.blocks.list('heading');
        const firstHeading = headings?.[0];
        const range = firstHeading?.range;
        setSelection(handle, { text: 'Plain', from: 0, to: 0 });
        act(() => {
            typeText(handle, 'More ');
        });
        if (range === undefined || live === undefined) {
            throw new Error('The editor API did not mount.');
        }

        expect(live.content.replace(range, [heading2('Stale')])).toEqual({
            status: 'rejected',
            code: 'target-invalid',
        });
        expect(live.content.read(range)).toBeUndefined();
        expect(live.select(range)).toBe(false);
        expect(live.targets.capture(range)).toBeUndefined();
        expect(textsOf(handle)).toEqual(['More Plain bold', 'Title']);
    });

    it('captures a target that maps through later changes', () => {
        const { handle } = mount();
        const headings = live?.blocks.list('heading');
        const firstHeading = headings?.[0];
        const range = firstHeading?.range;
        const target = live?.targets.capture(range);
        if (target === undefined) {
            throw new Error('The target was not captured.');
        }
        setSelection(handle, { text: 'Plain', from: 0, to: 0 });
        act(() => {
            typeText(handle, 'More ');
        });

        expect(handle.execute('text.insert', { text: 'New ' }, { target }).status).toBe('applied');
        expect(textsOf(handle)).toEqual(['More Plain bold', 'New ']);
    });
});

describe('the selection of the editor API', () => {
    const quoted = (...content: ContentNodeJSON[]): ContentNodeJSON => ({ type: 'blockquote', attrs: {}, content });
    const line = (...content: ContentNodeJSON[]): ContentNodeJSON => ({
        type: 'paragraph',
        attrs: { lang: null },
        content,
    });
    const code: ContentNodeJSON = {
        type: 'code_block',
        attrs: { languageId: null },
        content: [{ type: 'text', text: 'let x' }],
    };

    it('reads the caret context: the nodes around it, its place in its textblock, the node before it and verbatim text', () => {
        const blocks = [
            quoted(line({ type: 'text', text: 'first' }), line({ type: 'text', text: 'Quoted' })),
            line({ type: 'text', text: 'one' }, { type: 'hard_break' }, { type: 'text', text: 'two' }),
            code,
        ];
        const document = { ...stored, content: { ...stored.content, content: blocks } };
        const { handle } = mount({ document: document as unknown as RichTextDocument });

        setSelection(handle, { text: 'Quoted', from: 6, to: 6 });
        const quote = live?.selection();
        setSelection(handle, { text: 'two', from: 0, to: 0 });
        const broken = live?.selection();
        setSelection(handle, { text: 'let x', from: 0, to: 0 });
        const verbatim = live?.selection();

        expect(quote).toMatchObject({
            kind: 'text',
            blockType: 'paragraph',
            ancestors: [
                { type: 'blockquote', attrs: {}, nodeId: null, index: 0, childCount: 2, last: false, empty: false },
                {
                    type: 'paragraph',
                    attrs: { lang: null },
                    nodeId: null,
                    index: 1,
                    childCount: 1,
                    last: true,
                    empty: false,
                },
            ],
            atStart: false,
            atEnd: true,
            verbatim: false,
        });
        expect(broken).toMatchObject({
            atStart: false,
            atEnd: false,
            nodeBefore: { type: 'hard_break', attrs: {}, nodeId: null },
        });
        expect(verbatim).toMatchObject({
            blockType: 'code_block',
            ancestors: [{ type: 'code_block', index: 2, last: true }],
            atStart: true,
            verbatim: true,
            nodeBefore: null,
        });
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

    it('reads the attributes of the selected nodes of the listed types as all, some or none', () => {
        const aligned = compileContentModel(
            [core(), bold(), heading(), align(), links(), fontColor(), codeBlock(), mediaImage(), spotlight()],
            { id: 'fixture.api', version: 1 },
        );
        const { handle } = mount({ model: aligned });
        runIn(handle, 'Plain', (api) => api.attributes.set('textblocks', { align: 'center' }));
        const read = () => [
            live?.attributes.active('textblocks', { align: 'center' }),
            live?.attributes.active('heading', { align: 'center' }),
            live?.attributes.active('textblocks', { align: 'center' }, { nodeId: 'heading-1' }),
        ];

        setSelection(handle, { text: 'Plain' });
        const one = read();
        selectAll(handle);
        const both = read();

        expect(one).toEqual([true, false, false]);
        expect(both).toEqual(['mixed', false, false]);
    });
});

describe('the key handlers of a plugin', () => {
    it('scrolls the selection into view when a handler takes its key', () => {
        const aligned = compileContentModel(
            [core(), bold(), heading(), align(), links(), fontColor(), codeBlock(), mediaImage(), spotlight()],
            { id: 'fixture.api', version: 1 },
        );
        const { handle } = mount({ model: aligned });
        const view = runtimeOf(handle)?.view;
        script = (api) => api.attributes.set('textblocks', { align: 'center' });
        setSelection(handle, { text: 'Plain', from: 1, to: 1 });
        const scrolls = () => (view?.state as unknown as { scrollToSelection: number }).scrollToSelection;
        const before = scrolls();

        act(() => {
            pressKey(handle, 'Mod-Alt-8');
        });

        expect(attrsAt(handle, 0)?.align).toBe('center');
        expect(scrolls()).toBe(before + 1);
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

describe('the marks of the editor API', () => {
    it('names the marks the model installs', () => {
        mount();

        expect(live?.marks.installed()).toEqual(model.manifest.marks);
        expect(live?.marks.installed()).toContain('bold');
    });

    describe('reapply', () => {
        const runOn = (handle: Handle, at: string, run: (api: EditorApi) => boolean) => {
            script = run;
            setSelection(handle, { text: at });
            act(() => {
                handle.execute('fixture.api.run');
            });
        };

        it('changes nothing before a command set any of the named marks', () => {
            const { handle } = mount();

            runOn(handle, 'bold', (api) => api.marks.reapply(['font_color']));

            expect(blocksOf(handle)).toEqual([paragraph, title]);
        });

        it('sets again the last of the named marks a command set in the session, on another selection', () => {
            const { handle } = mount();

            runOn(handle, 'Plain', (api) => api.marks.set('font_color', { tokenId: 'brand.blue' }));
            runOn(handle, 'Title', (api) => api.marks.set('link', { href: 'https://frontify.com' }));
            runOn(handle, 'bold', (api) => api.marks.reapply(['font_color']));

            const content = blockAt(handle, 0)?.content;
            const types = (content ?? []).map(({ text, marks }) => [
                text,
                (marks ?? []).map(({ type }) => type).sort(),
            ]);
            expect(types).toEqual([
                ['Plain', ['font_color']],
                [' ', []],
                ['bold', ['bold', 'font_color']],
            ]);
        });
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

    it('reads the node with `nodeId`, or its nearest ancestor of the type, whatever the selection', () => {
        const image = (nodeId: string): ContentNodeJSON =>
            ({
                type: 'asset_image',
                attrs: {
                    nodeId,
                    assetId: 'asset-logo',
                    labelSnapshot: 'logo.png',
                    altIntent: 'meaningful',
                    altText: 'Logo',
                    width: 40,
                    height: 30,
                    displayWidth: null,
                    mediaType: 'image/png',
                },
            }) as unknown as ContentNodeJSON;
        const figures = (['left', 'right'] as const).map((side, index) => ({
            type: 'figure',
            attrs: { nodeId: `figure-${index}`, align: side },
            content: [image(`image-${index}`)],
        })) as unknown as ContentNodeJSON[];
        const { handle } = mount({
            document: {
                ...stored,
                content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [paragraph, title, ...figures] },
            } as unknown as RichTextDocument,
        });
        let found: unknown[] = [];

        runIn(handle, 'Title', (api) => {
            const rightAlign = api.nearest('figure', 'image-1')?.attrs.align;
            const figureId = api.nearest('figure', 'image-1')?.nodeId;
            const imageId = api.nearest('asset_image', 'image-1')?.nodeId;
            const leftAlign = api.nearest('figure', 'figure-0')?.attrs.align;
            const headingFigure = api.nearest('figure', 'heading-1');
            const missing = api.nearest('figure', 'missing');
            const headingId = api.nearest('heading')?.nodeId;
            found = [rightAlign, figureId, imageId, leftAlign, headingFigure, missing, headingId];
            return true;
        });

        expect(found).toEqual(['right', 'figure-1', 'image-1', 'left', undefined, undefined, 'heading-1']);
    });
});

describe('the services of the editor API', () => {
    it('holds the host data that only some plugins use apart from the document members', () => {
        mount();

        expect(live?.services.presentation()).toEqual({
            styles: [],
            colorTokens: [],
            columns: 1,
            columnGap: undefined,
        });
        expect(live?.services.references()).toBeUndefined();
        expect(live !== undefined && 'presentation' in live).toBe(false);
    });

    it("reads the presentation's styles, colour tokens and columns", () => {
        const colorTokens: ColorToken[] = [
            { id: 'brand.blue', label: 'Blue', value: '#0000ff', usage: ['font_color'] },
        ];
        mount({ presentation: defineReactPresentation({ colorTokens, columns: 3, columnGap: '24px' }) });

        expect(live?.services.presentation()).toEqual({ styles: [], colorTokens, columns: 3, columnGap: '24px' });
    });
});

describe('a mark write of the editor API', () => {
    it('reaches the run a caret touches at its trailing edge with `touching`', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain' });
        script = (api) => api.marks.set('link', { href: 'https://frontify.com' });
        act(() => {
            handle.execute('fixture.api.run');
        });

        const linked = childAt(handle, 0)?.marks;
        setSelection(handle, { text: 'Plain', from: 5, to: 5 });
        script = (api) => api.marks.remove('link', { extendToMarkRange: true });
        act(() => {
            handle.execute('fixture.api.run');
        });
        expect(childAt(handle, 0)?.marks).toEqual(linked);

        setSelection(handle, { text: 'Plain', from: 5, to: 5 });
        script = (api) => api.marks.remove('link', { extendToMarkRange: 'touching' });
        act(() => {
            handle.execute('fixture.api.run');
        });
        expect(childAt(handle, 0)?.marks).toBeUndefined();
    });

    it('refuses to turn text into a block that drops its marks', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain bold' });

        const result = runIn(handle, 'bold', (api) => api.blocks.set('code_block'));

        expect(result?.status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });
});

describe('the clearing of blocks in the editor API', () => {
    it('refuses the attribute name nodeId and changes nothing', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Title', from: 1, to: 1 });
        script = (api) => api.blocks.clear(['nodeId']);

        let result: ReturnType<Handle['execute']> | undefined;
        act(() => {
            result = handle.execute('fixture.api.run');
        });

        expect(result?.status).toBe('rejected');
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });

    it('applies a clear of an unknown attribute name and turns the heading into a paragraph', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Title', from: 1, to: 1 });
        script = (api) => api.blocks.clear(['unknown']);

        let result: ReturnType<Handle['execute']> | undefined;
        act(() => {
            result = handle.execute('fixture.api.run');
        });

        expect(result?.status).toBe('applied');
        expect(blocksOf(handle)?.map(({ type }) => type)).toEqual(['paragraph', 'paragraph']);
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

describe('the blocks of the editor API in a container', () => {
    const quoted = (...content: ContentNodeJSON[]): ContentNodeJSON => ({ type: 'blockquote', attrs: {}, content });

    it('lists the blocks of a type that sit inside another block of that type', () => {
        const nested = { ...stored, content: { ...stored.content, content: [quoted(quoted(paragraph)), title] } };
        const { handle } = mount({ document: nested as unknown as RichTextDocument });

        runIn(handle, 'Plain', (api) => {
            const found = api.blocks.list('blockquote');
            seen = { status: found.length === 2 && found[1]?.text === 'Plain bold' ? 'applied' : 'no-op' };
            return false;
        });

        expect(seen).toEqual({ status: 'applied' });
    });

    it('inserts a container with the content its model requires', () => {
        const { handle } = mount();

        const result = runIn(handle, 'Plain', (api) => api.insert.node('blockquote').status === 'applied');

        const document = handle.getSnapshot().document;
        const inserted = blocksOf(handle)?.find(({ type }) => type === 'blockquote');
        expect(result?.status).toBe('applied');
        const insertedContent = inserted?.content;
        expect(insertedContent?.length).toBeGreaterThan(0);
        expect(decodeDocument(document, model)).toMatchObject({ status: 'editable', diagnostics: [] });
    });
});

describe('the lists of the editor API', () => {
    const listed = compileContentModel([core(), listItem(), bulletList(), taskList(), spotlight()], {
        id: 'fixture.api-lists',
        version: 1,
    });
    const line = (value: string): ContentNodeJSON => ({
        type: 'paragraph',
        attrs: { lang: null },
        content: value === '' ? [] : [{ type: 'text', text: value }],
    });
    const entry = (value: string, ...nested: ContentNodeJSON[]): ContentNodeJSON => ({
        type: 'list_item',
        content: [line(value), ...nested],
    });
    const bullets = (...items: ContentNodeJSON[]): ContentNodeJSON => ({
        type: 'bullet_list',
        attrs: { marker: null },
        content: items,
    });
    const mountLists = (...content: ContentNodeJSON[]) =>
        mount({
            model: listed,
            document: {
                ...stored,
                model: listed.ref,
                requiredCapabilities: listed.capabilities,
                content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content },
            } as unknown as RichTextDocument,
        });
    /** Each top-level block as the text of its paragraphs, a list as the list of its items. */
    const shape = (handle: Handle): unknown => {
        const of = (node: ContentNodeJSON): unknown => {
            if (node.type === 'paragraph') {
                return (node.content ?? []).map((child) => child.text).join('');
            }
            if (node.type === 'list_item' || node.type === 'task_item') {
                return (node.content ?? []).map(of);
            }
            return { [node.type]: (node.content ?? []).map(of) };
        };
        return (blocksOf(handle) ?? []).map(of);
    };

    it('reads whether the selection sits in a list of a type, with its attributes', () => {
        const { handle } = mountLists(line('zero'), bullets(entry('one')));

        setSelection(handle, { text: 'one' });
        const inList = live?.blocks.active('bullet_list');
        const inCircleList = live?.blocks.active('bullet_list', { marker: 'circle' });
        const inside = [inList, inCircleList];
        setSelection(handle, { text: 'zero' });

        expect([...inside, live?.blocks.active('bullet_list')]).toEqual([true, false, false]);
    });

    it('toggles, reads, indents and outdents lists, with the attributes of the item at the caret', () => {
        const { handle } = mountLists(line('zero'), bullets(entry('one'), entry('two')));
        const tasks: (boolean | undefined)[] = [];

        const wrapped = runIn(handle, 'zero', (api) => api.lists.toggle('bullet_list', 'list_item'))?.status;
        runIn(handle, 'one', (api) => {
            seen = { status: api.lists.active('bullet_list') && !api.lists.active('task_list') ? 'applied' : 'no-op' };
            return false;
        });
        const indentedOne = runIn(handle, 'one', (api) => api.lists.indent('list_item'))?.status;
        const indentedTwo = runIn(handle, 'two', (api) => api.lists.indent('list_item'))?.status;
        const indented = [indentedOne, indentedTwo];
        const nested = shape(handle);
        runIn(handle, 'two', (api) => api.lists.outdent('list_item'));
        const refused = runIn(handle, 'zero', (api) => api.lists.toggle('task_list', 'task_item', { done: true }));
        runIn(handle, 'one', (api) => api.lists.toggle('task_list', 'task_item', { checked: true }));
        const collect = (nodes: readonly ContentNodeJSON[] | undefined) => {
            for (const node of nodes ?? []) {
                if (node.type === 'task_item' || node.type === 'list_item') {
                    tasks.push(node.attrs?.checked as boolean | undefined);
                }
                collect(node.content);
            }
        };
        collect(blocksOf(handle));

        expect(wrapped).toBe('applied');
        expect(seen).toEqual({ status: 'applied' });
        expect(indented).toEqual(['applied', 'applied']);
        expect(nested).toEqual([{ bullet_list: [['zero', { bullet_list: [['one'], ['two']] }]] }]);
        expect(refused?.status).toBe('rejected');
        expect(tasks).toEqual([undefined, true, undefined]);
    });

    it('splits an item, moves an empty one out, and outdents an item from its start only with `atStart`', () => {
        const { handle } = mountLists(bullets(entry('one'), entry('two')));
        const at = (text: string, offset: number, run: (api: EditorApi) => boolean) => {
            setSelection(handle, { text, from: offset, to: offset });
            script = run;
            let result: ReturnType<Handle['execute']> | undefined;
            act(() => {
                result = handle.execute('fixture.api.run');
            });
            return result?.status;
        };

        const split = at('one', 1, (api) => api.lists.split('list_item'));
        const splitShape = shape(handle);
        // The first split leaves the caret in a new, empty item, which the second moves out of the list.
        const left = at('ne', 2, (api) => api.lists.split('list_item') && api.lists.split('list_item'));
        const leftShape = shape(handle);
        const midText = at('two', 1, (api) => api.lists.outdent('list_item', { atStart: true }));
        const atStart = at('two', 0, (api) => api.lists.outdent('list_item', { atStart: true }));
        const outside = at('two', 1, (api) => api.lists.split('list_item'));

        expect([split, left, midText, atStart, outside]).toEqual([
            'applied',
            'applied',
            'rejected',
            'applied',
            'rejected',
        ]);
        expect(splitShape).toEqual([{ bullet_list: [['o'], ['ne'], ['two']] }]);
        expect(leftShape).toEqual([{ bullet_list: [['o'], ['ne']] }, '', { bullet_list: [['two']] }]);
        expect(shape(handle)).toEqual([{ bullet_list: [['o'], ['ne']] }, '', 'two']);
    });
});

describe('the inserts of the editor API', () => {
    const inQuote = {
        ...stored,
        content: { ...stored.content, content: [{ type: 'blockquote', attrs: {}, content: [paragraph] }, title] },
    } as unknown as RichTextDocument;
    const image = { type: 'asset_image', attrs: { assetId: 'asset-1', labelSnapshot: 'Photo' } };

    it('puts a block after the top-level block that holds the selection', () => {
        const { handle } = mount({ document: inQuote });

        runIn(handle, 'Plain', (api) => {
            seen = api.insert.node('heading', { level: 3 }, { place: 'after-top-level-block' });
            return seen.status === 'applied';
        });

        expect(seen).toMatchObject({ status: 'applied' });
        expect(blocksOf(handle)?.map(({ type }) => type)).toEqual(['blockquote', 'heading', 'heading']);
        expect(attrsAt(handle, 1)?.level).toBe(3);
    });

    it('fills a block with the stored content given, and refuses content that does not fit it as it is', () => {
        const { handle } = mount();
        const outcomes: string[] = [];

        runIn(handle, 'Plain', (api) => {
            outcomes.push(
                api.insert.node('figure', {}, { content: [{ type: 'paragraph', content: [text('x')] }] }).status,
                api.insert.node('figure', {}, { content: [image] }).status,
            );
            return true;
        });

        const figure = blocksOf(handle)?.find(({ type }) => type === 'figure');
        expect(outcomes).toEqual(['rejected', 'applied']);
        const figureContent = figure?.content;
        expect(figureContent?.[0]).toMatchObject(image);
    });

    it('tells an `enabled` check whether a node has a spot at the selection', () => {
        const { handle } = mount({ document: inQuote });
        let answers: boolean[] = [];

        runIn(handle, 'Plain', (api) => {
            answers = [
                api.insert.allowed('figure'),
                api.insert.allowed('figure', { place: 'after-top-level-block' }),
                api.insert.allowed('asset_image'),
            ];
            return false;
        });

        expect(answers).toEqual([true, true, false]);
    });
});

describe('the range a write of the editor API wrote', () => {
    it('takes the caret into a paragraph a command added after a code block', () => {
        const { handle } = mount();

        runIn(handle, 'Title', (api) => {
            api.blocks.set('code_block');
            const code = api.nearest('code_block');
            if (code === undefined) {
                return false;
            }
            const written = api.content.insert(code.range, [{ type: 'paragraph' }]);
            return written.status === 'applied' && api.select(written.range);
        });
        act(() => {
            typeText(handle, 'x');
        });

        expect(textsOf(handle)).toEqual(['Plain bold', 'Title', 'x']);
    });

    it('selects the node a plugin UI inserted', () => {
        const { handle } = mount();
        setSelection(handle, { text: 'Plain', from: 0, to: 0 });
        let outcome: ReturnType<EditorApi['insert']['node']> | undefined;

        act(() => {
            outcome = live?.insert.node('heading', { level: 3 }, { content: [text('New')] });
            if (outcome?.status === 'applied') {
                live?.select(outcome.range);
            }
        });

        expect(live?.selectedText()).toBe('New');
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

describe('the line indents of the editor API', () => {
    const source: ContentNodeJSON = {
        type: 'code_block',
        attrs: { languageId: null },
        content: [{ type: 'text', text: 'one\ntwo\nthree' }],
    };
    const codeOnly = { ...stored, content: { ...stored.content, content: [source, paragraph] } };

    it('indents and outdents the lines the selection touches in a code block, and refuses elsewhere', () => {
        const { handle } = mount({ document: codeOnly as unknown as RichTextDocument });
        const indent = (direction: 'indent' | 'outdent') => {
            script = (api) => api.blocks.indentLines(direction);
            let result: ReturnType<Handle['execute']> | undefined;
            act(() => {
                result = handle.execute('fixture.api.run');
            });
            return result?.status;
        };

        setSelection(handle, { text: 'two', from: 0, to: 3 });
        const indented = indent('indent');
        const afterIndent = childAt(handle, 0)?.text;
        const outdented = indent('outdent');
        const afterOutdent = childAt(handle, 0)?.text;
        const bare = indent('outdent');
        setSelection(handle, { text: 'Plain ', from: 0, to: 0 });
        const elsewhere = indent('indent');

        expect([indented, outdented, bare, elsewhere]).toEqual(['applied', 'applied', 'rejected', 'rejected']);
        expect(afterIndent).toBe('one\n  two\nthree');
        expect(afterOutdent).toBe('one\ntwo\nthree');
    });
});

describe('a name the model does not install, in the editor API', () => {
    it('is answered with false or nothing by every member that takes a mark, a node or a list item', () => {
        const { handle } = mount();
        const answers: Record<string, unknown> = {};

        runIn(handle, 'Plain', (api) => {
            answers.markActive = api.marks.active('missing');
            answers.markAttrs = api.marks.attrs('missing');
            answers.markAllowed = api.marks.allowed('missing');
            answers.markRun = api.marks.run('missing');
            answers.markToggle = api.marks.toggle('missing');
            answers.markSet = api.marks.set('missing', {});
            answers.markRemove = api.marks.remove(['missing']);
            answers.blockActive = api.blocks.active('missing');
            answers.blockSet = api.blocks.set('missing');
            answers.blockWrap = api.blocks.wrap('missing');
            answers.blockLift = api.blocks.lift('missing');
            answers.listToggle = api.lists.toggle('missing', 'missing');
            answers.listIndent = api.lists.indent('missing');
            answers.listOutdent = api.lists.outdent('missing');
            answers.listSplit = api.lists.split('missing');
            answers.insertAllowed = api.insert.allowed('missing');
            answers.insertNode = api.insert.node('missing');
            answers.nearest = api.nearest('missing');
            answers.select = api.select({ nodeId: 'missing' });
            return false;
        });

        expect(answers).toEqual({
            markActive: false,
            markAttrs: undefined,
            markAllowed: false,
            markRun: undefined,
            markToggle: false,
            markSet: false,
            markRemove: false,
            blockActive: false,
            blockSet: false,
            blockWrap: false,
            blockLift: false,
            listToggle: false,
            listIndent: false,
            listOutdent: false,
            listSplit: false,
            insertAllowed: false,
            insertNode: { status: 'rejected', code: 'invalid' },
            nearest: undefined,
            select: false,
        });
    });
});

describe('the mark runs of the editor API', () => {
    it('reads no run for a caret at the trailing edge of the run, or for an element outside the editor', () => {
        const { handle } = mount();
        const reads: unknown[] = [];
        setSelection(handle, { text: 'bold', from: 4, to: 4 });
        script = (api) => {
            reads.push(api.marks.run('bold'), api.marks.run('bold', { extendToMarkRange: 'touching' })?.text);
            reads.push(api.marks.run('bold', { at: document.createElement('span') }));
            return false;
        };

        act(() => {
            handle.execute('fixture.api.run');
        });

        expect(reads).toEqual([undefined, 'bold', undefined]);
    });
});

describe('a command that a plugin command runs, given a name or payload it cannot take', () => {
    it('is rejected as an unknown command or an invalid payload, and a query of either is disabled', () => {
        const { handle } = mount();
        const answers: unknown[] = [];

        runIn(handle, 'Plain', (api) => {
            answers.push(
                api.commands.execute('missing.command'),
                api.commands.execute('link.set', { href: 'javascript:alert(1)' }),
                api.commands.execute('link.set', { href: 1 }),
                api.commands.query('missing.command'),
                api.commands.query('link.set', { href: 'javascript:alert(1)' }),
            );
            return false;
        });

        expect(answers).toEqual([
            { status: 'rejected', code: 'unknown-command' },
            { status: 'rejected', code: 'invalid-payload' },
            { status: 'rejected', code: 'invalid-payload' },
            { enabled: false, active: false, disabledReason: 'unknown-command' },
            { enabled: false, active: false, disabledReason: 'invalid-payload' },
        ]);
    });
});

describe('the content writes of the editor API that change nothing or go too far', () => {
    const withImage = {
        ...stored,
        content: {
            ...stored.content,
            content: [
                paragraph,
                title,
                {
                    type: 'figure',
                    attrs: { nodeId: 'figure-1', align: 'left' },
                    content: [
                        {
                            type: 'asset_image',
                            attrs: {
                                nodeId: 'image-1',
                                assetId: 'asset-logo',
                                labelSnapshot: 'logo.png',
                                altIntent: 'meaningful',
                                altText: 'Logo',
                                width: 40,
                                height: 30,
                                displayWidth: null,
                                mediaType: 'image/png',
                            },
                        },
                    ],
                },
            ],
        },
    } as unknown as RichTextDocument;

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

    it('writes at the start of a node that holds content, and refuses it in a node that holds none', () => {
        const { handle } = mount({ document: withImage });

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'heading-1', at: 'start' }, [text('>> ')]);
            return true;
        });
        expect(textsOf(handle)?.slice(0, 2)).toEqual(['Plain bold', '>> Title']);

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert({ nodeId: 'image-1', at: 'start' }, [text('x')]);
            return true;
        });
        expect(seen).toEqual({ status: 'rejected', code: 'target-invalid' });
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

describe('the attribute writes of the editor API that cannot be checked', () => {
    it('refuses an unknown node name, an attribute named nodeId and a link the URL policy refuses', () => {
        const { handle } = mount();
        const answers: unknown[] = [];

        runIn(handle, 'Plain', (api) => {
            answers.push(
                api.attributes.set('missing', { level: 1 }),
                api.attributes.set('textblocks', { nodeId: 'other' }),
                api.marks.set('link', { href: 'javascript:alert(1)' }),
            );
            return false;
        });

        expect(answers).toEqual([false, false, false]);
        expect(blocksOf(handle)).toEqual([paragraph, title]);
    });
});

describe('an inline node inserted through the editor API', () => {
    it('is refused as invalid without its required attributes, and as not applicable where the paragraph cannot hold it', () => {
        const { handle } = mount();
        const answers: unknown[] = [];

        runIn(handle, 'Plain', (api) => {
            answers.push(
                api.insert.node('asset_image'),
                api.insert.node('asset_image', { assetId: 'asset-1', labelSnapshot: 'Photo' }),
            );
            return false;
        });

        expect(answers).toEqual([
            { status: 'rejected', code: 'invalid' },
            { status: 'rejected', code: 'not-applicable' },
        ]);
    });
});
