/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    NodeChromeButton,
    NodeChromeToolbar,
    NodeViewContent,
    type NodeViewDeclaration,
    useRichTextNodeView,
} from '#/index';

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

export const calloutView: NodeViewDeclaration = { node: 'callout', component: CalloutView };
