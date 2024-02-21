/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { ComponentProps } from 'react';
import { Position } from './components/EditorPositioningWrapper';
import {
    IPSUM,
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
    AutoformatPlugin,
    BoldPlugin,
    BreakAfterPlugin,
    CheckboxListPlugin,
    CodePlugin,
    Custom1Plugin,
    Custom2Plugin,
    Custom3Plugin,
    EmojiPlugin,
    Heading1Plugin,
    Heading2Plugin,
    Heading3Plugin,
    Heading4Plugin,
    ImageCaptionPlugin,
    ImageTitlePlugin,
    ItalicPlugin,
    LinkPlugin,
    MentionPlugin,
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    QuotePlugin,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    TextStyles,
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
import { SubscriptPlugin, SuperscriptPlugin } from '@components/RichTextEditor/Plugins/MarkPlugin';

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

const allTextStyles = Object.values(TextStyles);
const allTextStylesPlugin = new TextStylePlugin({
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
        new QuotePlugin(),
    ],
});

const allPlugins = new PluginComposer();
allPlugins
    .setPlugin([new SoftBreakPlugin(), allTextStylesPlugin])
    .setPlugin([new MentionPlugin({ mentionableItems: mentionable })])
    .setPlugin(
        [
            new BoldPlugin(),
            new ItalicPlugin(),
            new UnderlinePlugin(),
            new StrikethroughPlugin(),
            new LinkPlugin(),
            new CodePlugin(),
            new BreakAfterPlugin(),
            new SubscriptPlugin(),
            new SuperscriptPlugin(),
        ],
        [
            new AlignLeftPlugin({
                validTypes: allTextStyles,
            }),
            new AlignCenterPlugin({
                validTypes: allTextStyles,
            }),
            new AlignRightPlugin({
                validTypes: allTextStyles,
            }),
            new AlignJustifyPlugin({
                validTypes: allTextStyles,
            }),
            new UnorderedListPlugin(),
            new CheckboxListPlugin(),
            new OrderedListPlugin(),
            new EmojiPlugin(),
            new ResetFormattingPlugin(),
            new AutoformatPlugin(),
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
    plugins: allPlugins,
    readonly: true,
};

export const WithHtmlAsValue = RichTextEditorTemplate.bind({});
WithHtmlAsValue.args = {
    plugins: allPlugins,
    value: htmlValue,
};

const listPlugins = new PluginComposer();
listPlugins.setPlugin([new UnorderedListPlugin(), new OrderedListPlugin(), allTextStylesPlugin, new BoldPlugin()]);
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
    .setPlugin([new SoftBreakPlugin(), allTextStylesPlugin])
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

export const WithToolbarTopAndSmallPadding = RichTextEditorTemplate.bind({});
WithToolbarTopAndSmallPadding.args = {
    position: Position.TOP,
    padding: PaddingSizes.Medium,
    plugins: allPlugins,
};

export const WithCustomToolbarWidth = RichTextEditorTemplate.bind({});
WithCustomToolbarWidth.args = {
    toolbarWidth: 50,
    plugins: allPlugins,
};

const customStylesPlugin = new PluginComposer();
customStylesPlugin
    .setPlugin(
        new TextStylePlugin({
            textStyles: [
                new Heading1Plugin({
                    styles: {
                        color: 'blue',
                        fontSize: '45px',
                        marginBottom: '20px',
                    },
                }),
                new Heading2Plugin({
                    styles: {
                        color: 'green',
                        fontSize: '40px',
                        textDecoration: 'underline',
                        fontFamily: 'monospace',
                        marginBottom: '15px',
                    },
                }),
                new Heading3Plugin({
                    styles: {
                        color: 'red',
                        fontSize: '35px',
                        marginBottom: '10px',
                    },
                }),
                new Heading4Plugin({
                    styles: {
                        color: 'purple',
                        fontSize: '30px',
                        marginBottom: '5px',
                    },
                }),
                new Custom1Plugin({
                    styles: {
                        color: 'orange',
                        fontSize: '25px',
                        textTransform: 'uppercase',
                        textDecoration: 'strike-through',
                    },
                }),
                new Custom2Plugin({
                    styles: {
                        color: 'yellow',
                        fontSize: '20px',
                        fontStyle: 'italic',
                    },
                }),
                new Custom3Plugin({
                    styles: {
                        color: 'pink',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        fontFamily: 'fantasy',
                    },
                }),
                new ParagraphPlugin({
                    styles: {
                        color: 'red',
                        fontSize: '20px',
                    },
                }),
                new QuotePlugin({
                    styles: {
                        color: 'grey',
                        fontSize: '28px',
                        fontStyle: 'italic',
                        borderLeft: '5px solid black',
                        paddingLeft: '10px',
                        marginBottom: '10px',
                        marginTop: '10px',
                    },
                }),
            ],
        }),
    )
    .setPlugin([
        new BoldPlugin(),
        new LinkPlugin({
            styles: {
                color: 'blue',
                fontSize: '12px',
                textDecoration: 'underline',
            },
        }),
        new UnorderedListPlugin(),
        new OrderedListPlugin(),
        new CheckboxListPlugin(),
        new SubscriptPlugin(),
        new SuperscriptPlugin(),
    ]);

export const WithCustomStyles = RichTextEditorTemplate.bind({});
WithCustomStyles.args = {
    plugins: customStylesPlugin,
    position: Position.FLOATING,
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
    .setPlugin([new SoftBreakPlugin(), allTextStylesPlugin])
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
    .setPlugin(allTextStylesPlugin)
    .setPlugin([
        new BoldPlugin(),
        new ItalicPlugin(),
        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new LinkPlugin(),
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
