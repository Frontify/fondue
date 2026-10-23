/* (c) Copyright Frontify Ltd., all rights reserved. */

import { NodeChromeButton, NodeChromeToolbar, useRichTextNodeView } from '#/bridge/define';
import { defineEditorPlugin } from '#/bridge/plugin';

import { fixtureCodeBlock } from './feature';

/**
 * A language button in the node chrome toolbar, pressed once the language is TypeScript.
 */
const CodeBlockChrome = () => {
    const { attrs, update } = useRichTextNodeView();
    let language = '';
    if (typeof attrs.language === 'string') {
        language = attrs.language;
    }
    return (
        <NodeChromeToolbar aria-label={language}>
            <NodeChromeButton
                label={language}
                pressed={language === 'typescript'}
                onClick={() => update({ language: 'typescript' })}
            />
        </NodeChromeToolbar>
    );
};

/** The code block stand-in's editor part, with its node chrome toolbar. */
export const fixtureCodeBlockEditor = defineEditorPlugin(fixtureCodeBlock, {
    views: [{ node: 'chrome_code', component: CodeBlockChrome }],
});
