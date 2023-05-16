/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { Position } from './EditorPositioningWrapper';
import {
    IPSUM,
    buttonValues,
    checkboxValue,
    customControlValues,
    defaultValue,
    htmlValue,
    markdownText,
    mentionValue,
    mentionable,
    nodesToSerialize,
    orderedListValue,
    unorderedListValue,
    value,
} from './helpers/exampleValues';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    BreakAfterPlugin,
    ButtonPlugin,
    CheckboxListPlugin,
    CodePlugin,
    EmojiPlugin,
    ItalicPlugin,
    LinkPlugin,
    MentionPlugin,
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
} from './Plugins';
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from './RichTextEditor';
import {
    MarkdownToSlate,
    SerializeNodesToHtmlOptions,
    SlateToMarkdown,
    Transform,
    serializeNodesToHtml,
} from './serializer';
import { PaddingSizes } from './types';
import { ImageCaptionPlugin } from './Plugins/TextStylePlugin/examples/imageCaptionPlugin';
import { ImageTitlePlugin } from './Plugins/TextStylePlugin/examples/imageTitlePlugin';
import { Heading1Plugin } from './Plugins/TextStylePlugin/examples/heading1Plugin';
import { Custom1Plugin } from './Plugins/TextStylePlugin/examples/custom1Plugin';

import './__tests__/fixtures/theme.css';
import { SubscriptPlugin } from '@components/RichTextEditor/Plugins/SubscriptPlugin';
import { SuperscriptPlugin } from '@components/RichTextEditor/Plugins/SuperscriptPlugin';
import { Heading2Plugin } from './Plugins/TextStylePlugin/examples/heading2Plugin';
import { Heading3Plugin } from './Plugins/TextStylePlugin/examples/heading3Plugin';
import { Heading4Plugin } from './Plugins/TextStylePlugin/examples/heading4Plugin';
import { Custom2Plugin } from './Plugins/TextStylePlugin/examples/custom2Plugin';
import { Custom3Plugin } from './Plugins/TextStylePlugin/examples/custom3Plugin';

export default {
    title: 'Components/Rich Text Editor',
    component: RichTextEditorComponent,
    tags: ['autodocs'],
    args: {
        value: JSON.stringify(value),
        updateValueOnChange: true,
        placeholder: 'Some placeholder',
        readonly: false,
        clear: false,
        position: Position.FLOATING,
        padding: Object.keys(PaddingSizes)[2],
        border: true,
    },
    argTypes: {
        onTextChange: { action: 'onTextChange' },
        onBlur: { action: 'onBlur' },
        value: { type: 'string' },
        updateValueOnChange: { type: 'boolean' },
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

const RichTextEditorTemplate: StoryFn<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);

const allPlugins = new PluginComposer();
allPlugins
    .setPlugin([
        new SoftBreakPlugin(),
        new TextStylePlugin({
            textStyles: [
                new Heading1Plugin(),
                new Heading2Plugin(),
                new Heading3Plugin(),
                new Heading4Plugin(),
                new ParagraphPlugin(),
                new Custom1Plugin(),
                new Custom2Plugin(),
                new Custom3Plugin(),
                new ImageTitlePlugin(),
                new ImageCaptionPlugin(),
            ],
        }),
    ])
    .setPlugin([new MentionPlugin({ mentionableItems: mentionable })])
    .setPlugin(
        [
            new BoldPlugin(),
            new ItalicPlugin(),
            new UnderlinePlugin(),
            new StrikethroughPlugin(),
            new LinkPlugin(),
            new ButtonPlugin(),
            new CodePlugin(),
            new BreakAfterPlugin(),
            new SubscriptPlugin(),
            new SuperscriptPlugin(),
        ],
        [
            new AlignLeftPlugin(),
            new AlignCenterPlugin(),
            new AlignRightPlugin(),
            new AlignJustifyPlugin(),
            new UnorderedListPlugin(),
            new CheckboxListPlugin(),
            new OrderedListPlugin(),
            new EmojiPlugin(),
            new ResetFormattingPlugin(),
        ],
    );

export const FullyFledged = RichTextEditorTemplate.bind({});
FullyFledged.args = {
    plugins: allPlugins,
};

export const EmptyEditor = RichTextEditorTemplate.bind({});
EmptyEditor.args = {
    value: undefined,
    plugins: allPlugins,
};

export const Flex: StoryFn<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <div className="tw-flex tw-gap-x-7 tw-justify-start">
        <div className="tw-min-w-[1rem]">
            <div className="tw-text-left">
                <RichTextEditorComponent {...args} value={undefined} />
            </div>
        </div>
    </div>
);

export const SerializedToHTML: StoryFn<RichTextEditorProps> = () => {
    return (
        <GetSerializedContent
            props={{
                columns: 2,
            }}
        />
    );
};

export const MarkdownSerializerDeserializer: StoryFn<RichTextEditorProps> = () => {
    const toSlateTransform = Transform.use(new MarkdownToSlate());
    const resultSlate = toSlateTransform.process(markdownText);

    const toMarkdownTransform = Transform.use(new SlateToMarkdown());
    const resultMarkdown = toMarkdownTransform.process(resultSlate);

    return (
        <>
            Markdown Text:
            <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-m-6 tw-h-[400px] tw-overflow-auto">
                <pre>{resultMarkdown}</pre>
            </div>
            Slate JSON Object:
            <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-m-6 tw-h-[400px] tw-overflow-auto">
                <pre id="json">{JSON.stringify(resultSlate, undefined, 2)}</pre>
            </div>
            Rich Text Editor:
            <div className="tw-m-6">
                <RichTextEditorComponent
                    value={JSON.stringify(resultSlate)}
                    plugins={allPlugins}
                    padding={PaddingSizes.Medium}
                />
            </div>
        </>
    );
};

export const Multiple: StoryFn<RichTextEditorProps> = () => (
    <div className="tw-grid tw-grid-cols-2 tw-gap-2">
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder one"
                id="editor-one"
                value="<p>I'm editor <strong>one</strong>.</p>"
                border={false}
            />
        </div>
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder two"
                id="editor-two"
                value="<p>I'm editor <strong>two</strong>.</p>"
                border={false}
            />
        </div>
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder three"
                id="editor-three"
                value="<p>I'm editor <strong>three</strong>.</p>"
                border={false}
            />
        </div>
        <div className="tw-border-2 tw-border-black-10 tw-p-2 tw-h-36">
            <RichTextEditorComponent
                placeholder="I'm placeholder four"
                id="editor-four"
                value="<p>I'm editor <strong>four</strong>.</p>"
                border={false}
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

export const WithCustomButtonStyles = RichTextEditorTemplate.bind({});
WithCustomButtonStyles.args = {
    value: JSON.stringify(buttonValues),
};

const listPlugins = new PluginComposer();
listPlugins.setPlugin([new UnorderedListPlugin(), new OrderedListPlugin(), new TextStylePlugin(), new BoldPlugin()]);
export const WithList = RichTextEditorTemplate.bind({});
WithList.args = {
    plugins: listPlugins,
    value: JSON.stringify([unorderedListValue, orderedListValue]),
};

export const WithChecklist = RichTextEditorTemplate.bind({});
WithChecklist.args = {
    value: JSON.stringify(checkboxValue),
};

const customPlugins = new PluginComposer();
customPlugins
    .setPlugin([
        new SoftBreakPlugin(),
        new TextStylePlugin({
            textStyles: [new Heading1Plugin(), new ParagraphPlugin(), new ImageCaptionPlugin(), new ImageTitlePlugin()],
        }),
    ])
    .setPlugin([new LinkPlugin()])
    .setPlugin([
        new ItalicPlugin(),
        new BoldPlugin(),
        new UnderlinePlugin(),
        new SubscriptPlugin(),
        new SuperscriptPlugin(),
    ])
    .setPlugin([new OrderedListPlugin(), new UnorderedListPlugin()]);
export const WithCustomControls = RichTextEditorTemplate.bind({});
WithCustomControls.args = {
    value: JSON.stringify(customControlValues),
    plugins: customPlugins,
};

const topbarPlugins = new PluginComposer();
export const WithToolbarTopAndSmallPadding = RichTextEditorTemplate.bind({});
WithToolbarTopAndSmallPadding.args = {
    position: Position.TOP,
    padding: PaddingSizes.Medium,
    plugins: topbarPlugins.setPlugin([
        new TextStylePlugin({
            textStyles: [new Custom1Plugin(), new Heading1Plugin(), new ParagraphPlugin()],
        }),
    ]),
};

export const WithCustomToolbarWidth = RichTextEditorTemplate.bind({});
WithCustomToolbarWidth.args = {
    toolbarWidth: 50,
};

const mentionAndEmojisPlugins = new PluginComposer();
mentionAndEmojisPlugins
    .setPlugin([new ParagraphPlugin()])
    .setPlugin([new MentionPlugin({ mentionableItems: mentionable })])
    .setPlugin([new UnorderedListPlugin({ isSoftBreak: true }), new OrderedListPlugin({ isSoftBreak: true })])
    .setPlugin([
        new BoldPlugin(),
        new ItalicPlugin(),
        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new SubscriptPlugin(),
        new SuperscriptPlugin(),
    ])
    .setPlugin([new EmojiPlugin(), new LinkPlugin()]);
export const WithMentionsAndEmojis = RichTextEditorTemplate.bind({});
WithMentionsAndEmojis.args = {
    value: JSON.stringify(mentionValue),
    plugins: mentionAndEmojisPlugins,
    position: Position.BOTTOM,
};

const withoutToolbarPlugins = new PluginComposer({ noToolbar: true });
withoutToolbarPlugins
    .setPlugin([new SoftBreakPlugin(), new ParagraphPlugin()])
    .setPlugin([
        new BoldPlugin(),
        new LinkPlugin(),
        new UnorderedListPlugin(),
        new OrderedListPlugin(),
        new CheckboxListPlugin(),
        new SubscriptPlugin(),
        new SuperscriptPlugin(),
    ]);
export const WithoutToolbar = RichTextEditorTemplate.bind({});
WithoutToolbar.args = {
    position: Position.TOP,
    plugins: withoutToolbarPlugins,
};

const defaultPluginsWithColumns = new PluginComposer();
defaultPluginsWithColumns
    .setPlugin([new SoftBreakPlugin(), new ParagraphPlugin()])
    .setPlugin(
        new TextStylePlugin({
            textStyles: [
                new Heading1Plugin(),
                new ParagraphPlugin(),
                new ImageCaptionPlugin(),
                new ImageTitlePlugin(),
                new Custom1Plugin(),
            ],
        }),
    )
    .setPlugin([
        new BoldPlugin(),
        new ItalicPlugin(),
        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new LinkPlugin(),
        new ButtonPlugin(),
        new CodePlugin(),
        new UnorderedListPlugin(),
        new OrderedListPlugin(),
        new BreakAfterPlugin({ columns: 5, gap: 20 }),
        new SubscriptPlugin(),
        new SuperscriptPlugin(),
    ]);

type MultiColumnProps = ComponentProps<typeof RichTextEditorComponent> & { columns: number; columnGap: string };

export const MultiColumns: StoryFn<MultiColumnProps> = (args: MultiColumnProps) => {
    delete args.plugins;

    const plugins = new PluginComposer();
    plugins
        .setPlugin([new SoftBreakPlugin(), new ParagraphPlugin()])
        .setPlugin([
            new BoldPlugin(),
            new ItalicPlugin(),
            new UnderlinePlugin(),
            new StrikethroughPlugin(),
            new LinkPlugin(),
            new ButtonPlugin(),
            new CodePlugin(),
            new UnorderedListPlugin(),
            new OrderedListPlugin(),
            new BreakAfterPlugin({ columns: args.columns, gap: 20 }),
            new SubscriptPlugin(),
            new SuperscriptPlugin(),
        ]);

    return <RichTextEditorComponent updateValueOnChange={false} plugins={plugins} {...args} />;
};

MultiColumns.args = {
    value: JSON.stringify(defaultValue),
    plugins: defaultPluginsWithColumns,
    border: false,
    columns: 2,
    columnGap: '20px',
};

export const MultiColumnsSerializedToHTML: StoryFn<MultiColumnProps> = (args) => {
    return (
        <GetSerializedContent
            props={{
                mentionable,
                columns: args.columns,
                columnGap: args.columnGap,
            }}
        />
    );
};

MultiColumnsSerializedToHTML.args = {
    columns: 2,
    columnGap: '20px',
};

export const SimpleMultiColumns: StoryFn<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
SimpleMultiColumns.args = {
    value: `<p>${IPSUM}</p>`,
    plugins: defaultPluginsWithColumns,
    border: false,
};

export const GetSerializedContent = ({
    props = { mentionable, columns: 1, columnGap: 'normal' },
}: {
    props: SerializeNodesToHtmlOptions;
}): JSX.Element | null => {
    const serialized = serializeNodesToHtml(nodesToSerialize, props);

    return serialized ? (
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
    ) : null;
};
