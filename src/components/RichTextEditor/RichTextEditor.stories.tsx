/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Position } from './EditorPositioningWrapper';
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from './RichTextEditor';
import { serializeNodesToHtml } from './serializer/serializeToHtml';
import {
    IPSUM,
    checkboxValue,
    customDesignTokens,
    htmlValue,
    markdownText,
    mentionValue,
    mentionable,
    nodesToSerialize,
    value,
} from './utils/exampleValues';
import {
    BoldPlugin,
    CheckboxListPlugin,
    InitPlugin,
    ItalicPlugin,
    LinkPlugin,
    MentionPlugin,
    OrderedListPlugin,
    PluginComposer,
    UnderlinePlugin,
    UnorderedListPlugin,
} from './Plugins';
import { PaddingSizes } from './types';
import { MarkdownToSlate } from './serializer/markdown';
import { Transform } from './serializer';

export default {
    title: 'Components/Rich Text Editor',
    component: RichTextEditorComponent,
    args: {
        value: JSON.stringify(value),
        placeholder: 'Some placeholder',
        readonly: false,
        clear: false,
        position: Position.FLOATING,
        padding: PaddingSizes.None,
    },
    argTypes: {
        onTextChange: { action: 'onTextChange' },
        onBlur: { action: 'onBlur' },
        value: { type: 'string' },
        position: {
            options: Object.values(Position),
            mapping: Position,
            control: {
                type: 'radio',
                labels: Object.entries(Position).map(([key, value]) => [value, key]),
            },
        },
        padding: {
            options: Object.keys(PaddingSizes),
            mapping: PaddingSizes,
            control: {
                type: 'radio',
                labels: Object.entries(PaddingSizes).map(([key, value]) => [value, key]),
            },
        },
    },
} as Meta;

const RichTextEditorTemplate: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);

export const RichTextEditor = RichTextEditorTemplate.bind({});

export const RichTextEditorFlex: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <div className="tw-flex tw-gap-x-7 tw-justify-start">
        <div className="tw-min-w-[1rem]">
            <div className="tw-text-left">
                <RichTextEditorComponent {...args} value={undefined} />
            </div>
        </div>
    </div>
);

export const RichTextEditorSerialized: Story<RichTextEditorProps> = () => {
    const serialized = serializeNodesToHtml(nodesToSerialize, customDesignTokens);
    return (
        <>
            {serialized ? (
                <>
                    Serialized:
                    <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-m-6">
                        <code>{serialized}</code>
                    </div>
                    Rendered:
                    <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-m-6">
                        <div dangerouslySetInnerHTML={{ __html: serialized }} />
                    </div>
                </>
            ) : null}
        </>
    );
};

export const MarkdownDeserialized: Story<RichTextEditorProps> = () => {
    const transformer = Transform.use(new MarkdownToSlate());
    const result = transformer.process(markdownText);

    return (
        <>
            Markdown Text:
            <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-m-6">
                <pre>{markdownText}</pre>
            </div>
            Slate JSON Object:
            <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-m-6">
                <pre id="json">{JSON.stringify(result, undefined, 2)}</pre>
            </div>
            Rich Text Editor:
            <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-m-6">
                <RichTextEditorComponent value={JSON.stringify(result)} />
            </div>
        </>
    );
};

export const MultipleRichTextEditors: Story<RichTextEditorProps> = () => (
    <div className="tw-grid tw-grid-cols-2 tw-gap-2">
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder one"
                id="editor-one"
                value="<p>I'm editor <strong>one</strong>.</p>"
            />
        </div>
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder two"
                id="editor-two"
                value="<p>I'm editor <strong>two</strong>.</p>"
            />
        </div>
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder three"
                id="editor-three"
                value="<p>I'm editor <strong>three</strong>.</p>"
            />
        </div>
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder four"
                id="editor-four"
                value="<p>I'm editor <strong>four</strong>.</p>"
            />
        </div>
    </div>
);

export const WithReadonlyState = RichTextEditorTemplate.bind({});
WithReadonlyState.args = {
    readonly: true,
};

export const WithHtmlAsValue = RichTextEditorTemplate.bind({});
WithHtmlAsValue.args = {
    value: htmlValue,
};

export const WithCustomTextStyle = RichTextEditorTemplate.bind({});
WithCustomTextStyle.args = {
    designTokens: {
        heading1: {
            fontSize: '48px',
            fontStyle: 'italic',
            fontWeight: '800',
            textDecoration: 'underline',
            textTransform: 'uppercase',
        },
        heading2: {
            fontFamily: 'inherit',
            fontSize: '32px',
            fontWeight: '300',
            textDecoration: 'underline',
        },
        heading3: {
            fontSize: '24px',
        },
        heading4: {
            fontSize: '18px',
            fontStyle: 'italic',
        },
        custom1: {
            fontSize: '14px',
            color: 'rgb(255, 0, 0)',
            fontWeight: '700',
            textTransform: 'uppercase',
        },
        custom2: {
            fontSize: '14px',
            letterSpacing: 10,
        },
        custom3: {
            fontSize: '14px',
        },
        quote: {
            fontSize: '16px',
            fontStyle: 'italic',
        },
    },
};

export const WithChecklist = RichTextEditorTemplate.bind({});
WithChecklist.args = {
    value: JSON.stringify(checkboxValue),
};

const customPlugins = new PluginComposer();
customPlugins
    .setPlugin([new InitPlugin()])
    .setPlugin([new LinkPlugin()])
    .setPlugin([new ItalicPlugin(), new BoldPlugin(), new UnderlinePlugin()])
    .setPlugin([new OrderedListPlugin(), new UnorderedListPlugin()]);
export const WithCustomControls = RichTextEditorTemplate.bind({});
WithCustomControls.args = {
    value: `<p>${IPSUM}</p>`,
    actions: [],
    plugins: customPlugins,
};

export const WithToolbarTopAndSmallPadding = RichTextEditorTemplate.bind({});
WithToolbarTopAndSmallPadding.args = {
    position: Position.TOP,
    padding: PaddingSizes.Medium,
};

const mentionPlugins = new PluginComposer();
mentionPlugins
    .setPlugin([new InitPlugin()])
    .setPlugin([new MentionPlugin({ mentionableItems: mentionable })])
    .setPlugin([new UnorderedListPlugin(), new OrderedListPlugin()])
    .setPlugin([new BoldPlugin(), new LinkPlugin()]);
export const WithMentions = RichTextEditorTemplate.bind({});
WithMentions.args = {
    value: JSON.stringify(mentionValue),
    actions: [],
    plugins: mentionPlugins,
};

const withoutToolbarPlugins = new PluginComposer({ noToolbar: true });
withoutToolbarPlugins
    .setPlugin([new InitPlugin()])
    .setPlugin([
        new BoldPlugin(),
        new LinkPlugin(),
        new UnorderedListPlugin(),
        new OrderedListPlugin(),
        new CheckboxListPlugin(),
    ]);
export const WithoutToolbar = RichTextEditorTemplate.bind({});
WithoutToolbar.args = {
    position: Position.TOP,
    actions: [],
    plugins: withoutToolbarPlugins,
};
