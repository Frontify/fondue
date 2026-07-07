/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ScrollArea } from '@frontify/fondue-components';
import { type Meta, type StoryFn } from '@storybook/react-vite';
import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { type CSSProperties, type ReactNode } from 'react';

import {
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    SoftBreakPlugin,
    TextStylePlugin,
    UnorderedListPlugin,
} from './Plugins';
import { RichTextEditor } from './RichTextEditor';

const LONG_URL = `https://example.com/some/really/long/path/${'segment'.repeat(20)}?token=${'x'.repeat(80)}`;
const LONG_WORD = 'a'.repeat(120);

const plugins = new PluginComposer()
    .setPlugin(new SoftBreakPlugin())
    .setPlugin(new TextStylePlugin({ textStyles: [new ParagraphPlugin()] }))
    .setPlugin([new UnorderedListPlugin(), new OrderedListPlugin()]);

const value = JSON.stringify([
    { type: ELEMENT_PARAGRAPH, children: [{ text: `Paragraph with a long URL: ${LONG_URL}` }] },
    {
        type: ELEMENT_UL,
        children: [
            { type: ELEMENT_LI, children: [{ type: ELEMENT_LIC, children: [{ text: `List item, long word: ${LONG_WORD}` }] }] },
            { type: ELEMENT_LI, children: [{ type: ELEMENT_LIC, children: [{ text: `List item, long URL: ${LONG_URL}` }] }] },
        ],
    },
]);

const Editor = () => <RichTextEditor border={false} plugins={plugins} value={value} />;

const Resizable = ({ label, children }: { label: string; children: ReactNode }) => (
    <div style={{ marginBottom: 32 }}>
        <p style={{ marginBottom: 8, fontFamily: 'sans-serif', fontSize: 13, color: '#555' }}>
            {label} — drag the bottom-right corner to resize the width.
        </p>
        <div
            style={{
                resize: 'horizontal',
                overflow: 'auto',
                width: 360,
                minWidth: 120,
                maxWidth: '100%',
                border: '1px solid #d1d1d1',
                borderRadius: 4,
                padding: 8,
            }}
        >
            {children}
        </div>
    </div>
);

// Radix ScrollArea's viewport wraps its content in `display: table; min-width: 100%`, which
// shrink-wraps to the widest token — the context in which the overflow bug appears.
const SHRINK_WRAP_CONTEXT: CSSProperties = { display: 'table', minWidth: '100%' };

const Template: StoryFn = () => (
    <div style={{ maxWidth: 680 }}>
        <Resizable label="Shrink-wrapping context (reproduces the bug — mirrors Radix ScrollArea's viewport)">
            <div style={SHRINK_WRAP_CONTEXT}>
                <Editor />
            </div>
        </Resizable>

        <Resizable label="Real Fondue ScrollArea">
            <ScrollArea maxHeight="200px">
                <Editor />
            </ScrollArea>
        </Resizable>

        <Resizable label="Plain block (baseline — always wraps)">
            <Editor />
        </Resizable>
    </div>
);

export default {
    title: 'Legacy Components/Rich Text Editor/Long Content Wrapping',
    component: RichTextEditor,
} as Meta;

export const LongUnbreakableContent = Template.bind({});
