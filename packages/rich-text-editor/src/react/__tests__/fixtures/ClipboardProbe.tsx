/* (c) Copyright Frontify Ltd., all rights reserved. */

import { NodeSelection } from 'prosemirror-state';
import { useEffect, useRef, useState } from 'react';

import { bold, core } from '#/features';
import { fixtureLabelledMention } from '#/features/__tests__/fixtures/features';
import { taskList as taskListFeature } from '#/features/lists-task/feature';
import { defineEditor, defineReactPresentation, type DocumentChange, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import { runtimeOf } from '#/runtime/runtime';
import { type SelectionTarget, setSelection } from '#/testing';

const model = compileContentModel([core(), bold(), fixtureLabelledMention()], { id: 'test.clipboard', version: 1 });
const definition = defineEditor({ id: 'test.clipboard', model });
const taskEditorModel = compileContentModel([core(), bold(), fixtureLabelledMention(), taskListFeature()], {
    id: 'test.clipboard',
    version: 1,
});
const taskDefinition = defineEditor({ id: 'test.clipboard', model: taskEditorModel });
const ALLOW = { create: true, edit: true, remove: true };
// The mentions may move and be created, but no paste or drop brings one in.
const unpastedMentions = defineEditor({
    id: 'test.clipboard',
    model,
    policy: { features: { 'fixture.labelled-mention': { ...ALLOW, paste: false } } },
});
const presentation = defineReactPresentation({ sliceContext: 'ct' });

/** A paragraph of `text`, with `@` standing for the mention `m-1` labelled Ada. */
const paragraphOf = (text: string): ContentNodeJSON => {
    const content = text.split(/(@)/).flatMap((part): readonly object[] => {
        if (part === '') {
            return [];
        }
        if (part === '@') {
            const attrs = { nodeId: 'm-1', resourceType: 'user', resourceId: 'u-1', labelSnapshot: 'Ada' };
            return [{ type: 'mention', attrs }];
        }
        return [{ type: 'text', text: part }];
    });
    return { type: 'paragraph', attrs: { lang: null }, content } as unknown as ContentNodeJSON;
};

declare global {
    interface Window {
        /** The mounted editor and what the clipboard tests read of it. */
        clip?: {
            readonly handle: EditorHandle;
            readonly changes: readonly DocumentChange[];
            /** The stored content of the published document. */
            readonly content: () => unknown;
            readonly select: (target: SelectionTarget) => void;
            /** Selects the top-level block at `index` as a node. */
            readonly selectBlock: (index: number) => void;
            /** The selection's anchor and head. */
            readonly selection: () => readonly [number, number];
        };
    }
}

/** One task item the probe stores when `tasks` is set. */
interface ProbeTask {
    readonly nodeId: string;
    readonly text: string;
    readonly checked: boolean;
}

/**
 * The editor of `core`, bold and a visible mention, or a task list when `tasks` is set, in a scrolling box when
 * `scroll` is set, after a draggable host element whose `text/plain` is `dragged` and whose `text/html` holds it in a
 * paragraph.
 */
export const ClipboardProbe = ({
    texts = ['ab'],
    readOnly = false,
    unpasted = false,
    island = false,
    scroll = false,
    dragged = 'Dropped',
    tasks,
}: {
    readonly texts?: readonly string[];
    readonly readOnly?: boolean;
    /** Mounts the definition whose policy sets `paste: false` for the mention. */
    readonly unpasted?: boolean;
    /** Ends the document with an unknown `callout` block of `nodeId` `c-1` and the text Kept, which loads as an island. */
    readonly island?: boolean;
    readonly scroll?: boolean;
    readonly dragged?: string;
    /** Replaces the paragraphs with one task list of these items, on a model that installs `lists.task`. */
    readonly tasks?: readonly ProbeTask[];
}) => {
    const ref = useRef<EditorHandle<object>>(null);
    const [changes] = useState<DocumentChange[]>([]);
    useEffect(() => {
        const handle = ref.current as EditorHandle | null;
        const runtime = runtimeOf(handle ?? {});
        if (handle === null || runtime === undefined) {
            return;
        }
        window.clip = {
            handle,
            changes,
            content: () => handle.getSnapshot().document.content.content,
            select: (target) => {
                setSelection(handle, target);
                handle.focus();
            },
            selectBlock: (index) => {
                const { view } = runtime;
                if (view === undefined) {
                    return;
                }
                let position = 0;
                for (let child = 0; child < index; child += 1) {
                    position += view.state.doc.child(child).nodeSize;
                }
                view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, position)));
                handle.focus();
            },
            selection: () => [runtime.state.selection.anchor, runtime.state.selection.head],
        };
    }, [changes]);
    let blocks: ContentNodeJSON[] = texts.map(paragraphOf);
    let shown = definition;
    let documentModel: { readonly id: string; readonly version: number } = { id: 'test.clipboard', version: 1 };
    let requiredCapabilities: readonly { readonly id: string; readonly version: number }[] = [
        { id: 'core', version: 1 },
    ];
    if (unpasted) {
        shown = unpastedMentions;
    }
    if (tasks !== undefined) {
        shown = taskDefinition;
        documentModel = taskEditorModel.ref;
        requiredCapabilities = taskEditorModel.capabilities;
        blocks = [
            {
                type: 'task_list',
                content: tasks.map((item) => ({
                    type: 'task_item',
                    attrs: { nodeId: item.nodeId, checked: item.checked },
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { lang: null },
                            content: [{ type: 'text', text: item.text }],
                        },
                    ],
                })),
            } as unknown as ContentNodeJSON,
        ];
    }
    if (island) {
        blocks.push({
            type: 'callout',
            attrs: { nodeId: 'c-1' },
            content: [paragraphOf('Kept')],
        } as unknown as ContentNodeJSON);
    }
    const document = {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: documentModel,
        requiredCapabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    };
    let editor = (
        <RichTextEditor
            aria-label="Notes"
            definition={shown}
            defaultValue={{ documentId: 'document-1', revision: null, document }}
            presentation={presentation}
            readOnly={readOnly}
            ref={ref}
            onDocumentChange={(change) => changes.push(change)}
        />
    );
    if (scroll) {
        editor = (
            <div data-test-id="scroller" style={{ blockSize: 300, overflow: 'auto' }}>
                {editor}
            </div>
        );
    }
    return (
        <>
            <style>
                {'[data-mention] { display: inline-block; } [data-mention]::before { content: attr(data-mention); }'}
            </style>
            <div
                draggable
                data-test-id="host-drag"
                style={{ display: 'inline-block', padding: 8 }}
                onDragStart={(event) => {
                    event.dataTransfer.setData('text/html', `<p>${dragged}</p>`);
                    event.dataTransfer.setData('text/plain', dragged);
                }}
            >
                Drag me
            </div>
            {editor}
        </>
    );
};
