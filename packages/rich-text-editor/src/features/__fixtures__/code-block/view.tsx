/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineNodeView, NodeChromeButton, NodeChromeToolbar, useRichTextNodeView } from '#/bridge/define';

import { fixtureCodeBlock } from './feature';

/** A language button in the node chrome toolbar, as the code block's language menu opens from (SPEC-rich-text-react, Overlay focus). */
const CodeBlockChrome = () => {
    const { attrs, update } = useRichTextNodeView();
    let language = '';
    if (typeof attrs.language === 'string') {
        language = attrs.language;
    }
    return (
        <NodeChromeToolbar aria-label={language}>
            <NodeChromeButton label={language} onClick={() => update({ language: 'typescript' })} />
        </NodeChromeToolbar>
    );
};

/** The code block stand-in with its node chrome toolbar. */
export const fixtureCodeBlockView = () =>
    defineNodeView(fixtureCodeBlock(), { node: 'chrome_code', component: CodeBlockChrome });
