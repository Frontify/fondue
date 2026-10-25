/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';

import { defineReactPresentation } from '#/entries/authoring';
import { bold, core, heading, outline } from '#/features';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import { positionOf } from '#/runtime/positions';
import { runtimeOf } from '#/runtime/runtime';

const model = compileContentModel([core(), heading(), bold(), outline()], { id: 'test.outline', version: 1 });
const definition = defineEditor({ id: 'test.outline', model, plugins: unitsOf(model) });

const paragraph = (value: string): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null },
    content: [{ type: 'text', text: value }],
});

const headingBlock = (nodeId: string, level: number, value: string): ContentNodeJSON => ({
    type: 'heading',
    attrs: { nodeId, level, lang: null },
    content: [{ type: 'text', text: value }],
});

const lines = (from: number) => Array.from({ length: 40 }, (_, index) => paragraph(`Line ${from + index}`));

const BLOCKS = {
    last: [...lines(1), headingBlock('later', 2, 'Down here')],
    // A frame scrolled to the end leaves this heading above the visible area.
    middle: [...lines(1), headingBlock('middle', 2, 'Middle'), ...lines(41)],
    // A heading that wraps taller than the frame.
    tall: [...lines(1), headingBlock('tall', 2, `Tall ${'heading words '.repeat(300)}`), ...lines(41)],
};

declare global {
    interface Window {
        outlineRte?: {
            readonly sequence: () => number;
            readonly document: () => string;
            readonly selection: () => {
                readonly empty: boolean;
                readonly parentOffset: number;
                readonly nodeId: unknown;
                readonly type: string;
            } | null;
            /** Selects the node at the start of the heading `nodeId` names, and scrolls it into view. */
            readonly selectHeadingNode: (nodeId: string) => void;
        };
    }
}

/** A tall document in a short scrolling frame, with its one heading at the end or in the middle. */
export const OutlineProbe = ({
    heading: place = 'last',
    defaultToolbarMode,
}: {
    readonly heading?: keyof typeof BLOCKS;
    readonly defaultToolbarMode?: 'fixed' | 'bubble';
}) => {
    const ref = useRef<EditorHandle>(null);
    useEffect(() => {
        const handle = ref.current;
        const runtime = handle === null ? undefined : runtimeOf(handle);
        if (handle === null || runtime === undefined) {
            return;
        }
        window.outlineRte = {
            sequence: () => handle.getSummary().sequence,
            document: () => JSON.stringify(handle.getSnapshot().document),
            selection: () => {
                const { $from, empty } = runtime.state.selection;
                return {
                    empty,
                    parentOffset: $from.parentOffset,
                    nodeId: $from.parent.attrs.nodeId,
                    type: $from.parent.type.name,
                };
            },
            selectHeadingNode: (nodeId) => {
                const pos = positionOf(runtime.state.doc, nodeId);
                if (pos !== undefined) {
                    runtime.select({ node: pos, scroll: true });
                }
            },
        };
    });
    return (
        <div data-test-id="frame" style={{ blockSize: 220, overflow: 'auto' }}>
            <RichTextEditor
                ref={ref}
                aria-label="Notes"
                definition={definition}
                presentation={defineReactPresentation({ toolbar: [['mark.bold.toggle'], ['outline.toggle']] })}
                {...(defaultToolbarMode === undefined ? {} : { defaultToolbarMode })}
                defaultValue={{
                    documentId: 'document-1',
                    revision: null,
                    document: {
                        format: 'frontify.rich-text',
                        formatVersion: 1,
                        model: model.ref,
                        requiredCapabilities: model.capabilities,
                        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: BLOCKS[place] },
                    },
                }}
            />
        </div>
    );
};
