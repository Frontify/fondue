/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    defineEditorPart,
    definePlugin,
    NodeChromeButton,
    NodeChromeToolbar,
    NodeViewContent,
    type NodeViewDeclaration,
    useRichTextNodeView,
} from '#/entries/authoring';
import { defineFeature } from '#/model';

/** A host block: a box of paragraphs with a tone, stored as `callout`. */
const callout = defineFeature({
    id: 'acme.callout',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    nodes: {
        callout: {
            group: 'block',
            content: 'paragraph+',
            attrs: {
                tone: { type: 'enum', values: ['note', 'warning'], default: 'note' },
            },
            html: ['aside', { 'data-tone': { attr: 'tone' } }, 0],
            parse: [{ tag: 'aside[data-tone]', attrs: { tone: { from: 'data-tone' } } }],
        },
    },
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
});

/** The callout's chrome: its tone, a button that switches it, and the editable paragraphs. */
const CalloutView = () => {
    const { attrs, update } = useRichTextNodeView();
    let tone = 'Note';
    let next = 'warning';
    if (attrs.tone === 'warning') {
        tone = 'Warning';
        next = 'note';
    }

    return (
        <>
            <div contentEditable={false}>
                <NodeChromeToolbar aria-label={`${tone} callout`}>
                    <NodeChromeButton label={`Switch to ${next}`} onClick={() => update({ tone: next })} />
                </NodeChromeToolbar>
                <strong>{tone}</strong>
            </div>
            <NodeViewContent />
        </>
    );
};

const calloutView: NodeViewDeclaration = { node: 'callout', component: CalloutView };

/** The host block as one plugin: no server reads its content, so the vocabulary and the editor part share this file. */
export const calloutPlugin = definePlugin({
    feature: callout,
    editor: defineEditorPart(callout, {
        // The commands below read only `blocks`, so only that facet is declared.
        needs: ['blocks'],
        commands: {
            'callout.toggle': {
                run: (api) => api.blocks.wrap('callout'),
                active: (api) => api.blocks.active('callout'),
            },
        },
        toolbar: [
            {
                id: 'callout',
                kind: 'toggle',
                command: 'callout.toggle',
                label: { 'en-US': 'Callout' },
                icon: 'IconInfo',
            },
        ],
        views: [calloutView],
    }),
});
