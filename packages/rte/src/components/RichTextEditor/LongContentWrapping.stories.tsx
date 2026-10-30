/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ScrollArea } from '@frontify/fondue-components';
import { type Meta, type StoryFn } from '@storybook/react-vite';
import { ELEMENT_LI, ELEMENT_LIC, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { type ReactNode } from 'react';

import {
    CheckboxListPlugin,
    ELEMENT_CHECK_ITEM,
    Heading1Plugin,
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    QuotePlugin,
    SoftBreakPlugin,
    TextStylePlugin,
    TextStyles,
    UnorderedListPlugin,
} from './Plugins';
import { RichTextEditor } from './RichTextEditor';

export default {
    title: 'Legacy Components/Rich Text Editor/Long Content Wrapping',
    component: RichTextEditor,
} as Meta;

const LONG_URL = `https://example.com/some/really/long/path/${'segment'.repeat(20)}?token=${'x'.repeat(80)}`;
const LONG_WORD = 'a'.repeat(120);

const plugins = new PluginComposer()
    .setPlugin(new SoftBreakPlugin())
    .setPlugin(new TextStylePlugin({ textStyles: [new Heading1Plugin(), new QuotePlugin(), new ParagraphPlugin()] }))
    .setPlugin([new UnorderedListPlugin(), new OrderedListPlugin(), new CheckboxListPlugin()]);

const value = JSON.stringify([
    { type: TextStyles.heading1, children: [{ text: `Heading, long word: ${LONG_WORD}` }] },
    { type: ELEMENT_PARAGRAPH, children: [{ text: `Paragraph with a long URL: ${LONG_URL}` }] },
    {
        type: ELEMENT_UL,
        children: [
            { type: ELEMENT_LI, children: [{ type: ELEMENT_LIC, children: [{ text: `List item, long word: ${LONG_WORD}` }] }] },
            { type: ELEMENT_LI, children: [{ type: ELEMENT_LIC, children: [{ text: `List item, long URL: ${LONG_URL}` }] }] },
        ],
    },
    { type: ELEMENT_CHECK_ITEM, children: [{ text: `Checklist item, long URL: ${LONG_URL}` }] },
    { type: TextStyles.quote, children: [{ text: `Quote, long URL: ${LONG_URL}` }] },
]);

const Editor = () => <RichTextEditor border={false} plugins={plugins} value={value} />;

const Resizable = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="tw-mb-8">
        <p className="tw-mb-2 tw-text-small tw-text-text-weak">{label} — drag the bottom-right corner to resize the width.</p>
        <div className="tw-resize-x tw-overflow-auto tw-w-[360px] tw-min-w-[120px] tw-max-w-full tw-border tw-border-line tw-rounded tw-p-2">
            {children}
        </div>
    </div>
);

export const LongUnbreakableContent: StoryFn = () => (
    <div className="tw-max-w-[680px]">
        <Resizable label="Shrink-wrapping context (mirrors Radix ScrollArea's viewport)">
            <div className="tw-table tw-min-w-full">
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
