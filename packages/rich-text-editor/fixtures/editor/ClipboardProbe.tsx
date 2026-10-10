/* (c) Copyright Frontify Ltd., all rights reserved. */

import { NodeSelection } from 'prosemirror-state';
import { useEffect, useRef, useState } from 'react';

import { bold, core } from '../../src/features';
import { fixtureLabelledMention } from '../../src/features/__fixtures__/features';
import {
    defineEditor,
    defineReactPresentation,
    type DocumentChange,
    type EditorHandle,
    RichTextEditor,
    type UploadService,
} from '../../src/index';
import { compileContentModel, type ContentNodeJSON } from '../../src/model';
import { runtimeOf } from '../../src/runtime/runtime';
import { type SelectionTarget, setSelection } from '../../src/testing';

const model = compileContentModel([core(), bold(), fixtureLabelledMention()], { id: 'test.clipboard', version: 1 });
const definition = defineEditor({ id: 'test.clipboard', model });
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
            /** How often the upload service was called. */
            readonly uploads: () => number;
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

/**
 * The editor of `core`, bold and a visible mention, in a scrolling box when `scroll` is set, after a draggable host
 * element whose `text/plain` is `dragged` and whose `text/html` holds it in a paragraph.
 */
export const ClipboardProbe = ({
    texts = ['ab'],
    readOnly = false,
    unpasted = false,
    scroll = false,
    dragged = 'Dropped',
}: {
    readonly texts?: readonly string[];
    readonly readOnly?: boolean;
    /** Mounts the definition whose policy sets `paste: false` for the mention. */
    readonly unpasted?: boolean;
    readonly scroll?: boolean;
    readonly dragged?: string;
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
    const document = {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'test.clipboard', version: 1 },
        requiredCapabilities: [{ id: 'core', version: 1 }],
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: texts.map(paragraphOf) },
    };
    let shown = definition;
    if (unpasted) {
        shown = unpastedMentions;
    }
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
