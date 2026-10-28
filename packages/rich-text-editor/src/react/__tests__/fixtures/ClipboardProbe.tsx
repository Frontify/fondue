/* (c) Copyright Frontify Ltd., all rights reserved. */

import { NodeSelection } from 'prosemirror-state';
import { useEffect, useRef, useState } from 'react';

import { defineReactPresentation } from '#/entries/authoring';
import { defineEditor, type DocumentChange, type EditorHandle, RichTextEditor, type UploadService } from '#/index';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import { bold, core } from '#/plugins';
import { fixtureLabelledMention } from '#/plugins/__tests__/fixtures/features';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { checkList as taskListFeature } from '#/plugins/CheckList/feature';
import { runtimeOf } from '#/runtime/runtime';
import { type SelectionTarget, setSelection } from '#/testing';

const model = compileContentModel([core(), bold(), fixtureLabelledMention()], { id: 'test.clipboard', version: 1 });
const definition = defineEditor({ id: 'test.clipboard', model, plugins: pluginsFor(model) });
const taskEditorModel = compileContentModel([core(), bold(), fixtureLabelledMention(), taskListFeature()], {
    id: 'test.clipboard',
    version: 1,
});
const taskDefinition = defineEditor({
    id: 'test.clipboard',
    model: taskEditorModel,
    plugins: pluginsFor(taskEditorModel),
});
const ALLOW = { create: true, edit: true, remove: true };
// The mentions may move and be created, but no paste or drop brings one in.
const unpastedMentions = defineEditor({
    id: 'test.clipboard',
    model,
    policy: { features: { 'fixture.labelled-mention': { ...ALLOW, paste: false } } },
    plugins: pluginsFor(model),
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
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** The mounted editor and what the clipboard tests read of it. */
        clip?: {
            handle: EditorHandle;
            changes: readonly DocumentChange[];
            /** How often the upload service was called. */
            uploads: () => number;
            /** The stored content of the published document. */
            content: () => unknown;
            select: (target: SelectionTarget) => void;
            /** Selects the top-level block at `index` as a node. */
            selectBlock: (index: number) => void;
            /** The selection's anchor and head. */
            selection: () => readonly [number, number];
        };
    }
}

/** One task item the probe stores when `tasks` is set. */
type ProbeTask = {
    nodeId: string;
    text: string;
    checked: boolean;
};

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
    texts?: readonly string[];
    readOnly?: boolean;
    /** Mounts the definition whose policy sets `paste: false` for the mention. */
    unpasted?: boolean;
    /** Ends the document with an unknown `callout` block of `nodeId` `c-1` and the text Kept, which loads as an island. */
    island?: boolean;
    scroll?: boolean;
    dragged?: string;
    /** Replaces the paragraphs with one task list of these items, on a model that installs `lists.task`. */
    tasks?: readonly ProbeTask[];
}) => {
    const ref = useRef<EditorHandle<object>>(null);
    const [changes] = useState<DocumentChange[]>([]);
    const [uploads] = useState(() => {
        let calls = 0;
        const service: UploadService = {
            upload: () => {
                calls += 1;

                return Promise.reject(new Error('no upload'));
            },
            releaseUnused: () => Promise.resolve(),
        };

        return { service, calls: () => calls };
    });
    useEffect(() => {
        const handle = ref.current as EditorHandle | null;
        const runtime = runtimeOf(handle ?? {});
        if (handle === null || runtime === undefined) {
            return;
        }

        window.clip = {
            handle,
            changes,
            uploads: uploads.calls,
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
    }, [changes, uploads]);
    let blocks: ContentNodeJSON[] = texts.map(paragraphOf);
    let shown = definition;
    let documentModel: { id: string; version: number } = { id: 'test.clipboard', version: 1 };
    let requiredCapabilities: readonly { id: string; version: number }[] = [{ id: 'core', version: 1 }];
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
            services={{ uploads: uploads.service }}
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
