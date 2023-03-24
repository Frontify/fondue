/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React, { ComponentProps } from 'react';
import { Position } from './EditorPositioningWrapper';
import {
    IPSUM,
    buttonValues,
    checkboxValue,
    customControlValues,
    customDesignTokens,
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
import { TextStyles } from './Plugins/TextStylePlugin/TextStyles';
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from './RichTextEditor';
import {
    MarkdownToSlate,
    SerializeNodesToHtmlOptions,
    SlateToMarkdown,
    Transform,
    serializeNodesToHtml,
} from './serializer';
import { PaddingSizes } from './types';
import { defaultDesignTokens } from './utils/defaultDesignTokens';

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
    .setPlugin([new SoftBreakPlugin(), new ParagraphPlugin(), new TextStylePlugin()])
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
    return getSerializedContent({
        columns: 2,
    });
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

export const WithCustomTextStyle = RichTextEditorTemplate.bind({});
WithCustomTextStyle.args = {
    designTokens: {
        ...defaultDesignTokens,
        heading1: {
            fontSize: '48px',
            color: 'rgb(0, 0, 0)',
            fontStyle: 'italic',
            fontWeight: '800',
            textDecoration: 'underline',
            textTransform: 'uppercase',
        },
        heading2: {
            fontSize: '32px',
            color: 'rgb(0, 0, 0)',
            fontStyle: 'normal',
            fontWeight: '300',
            textDecoration: 'underline',
            textTransform: 'none',
        },
        heading3: {
            fontSize: '24px',
            color: 'rgb(0, 0, 0)',
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: 'initial',
            textTransform: 'none',
        },
        heading4: {
            fontSize: '18px',
            color: 'rgb(0, 0, 0)',
            fontStyle: 'italic',
            fontWeight: 'normal',
            textDecoration: 'initial',
            textTransform: 'none',
        },
        custom1: {
            fontSize: '14px',
            color: 'rgb(255, 0, 0)',
            fontStyle: 'normal',
            fontWeight: '700',
            textDecoration: 'initial',
            textTransform: 'uppercase',
        },
        custom2: {
            fontSize: '14px',
            color: 'rgb(0, 0, 0)',
            letterSpacing: 10,
        },
        custom3: {
            fontSize: '14px',
            color: 'rgb(0, 0, 0)',
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: 'initial',
            textTransform: 'none',
        },
        quote: {
            fontSize: '16px',
            color: 'rgb(0, 0, 0)',
            fontStyle: 'italic',
            fontWeight: 'normal',
            textDecoration: 'initial',
            textTransform: 'none',
        },
        p: {
            fontSize: '16px',
            color: 'rgb(0, 0, 0)',
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: 'none',
            textTransform: 'none',
        },
    },
};

export const WithCustomButtonStyles = RichTextEditorTemplate.bind({});
WithCustomButtonStyles.args = {
    value: JSON.stringify(buttonValues),
    designTokens: {
        ...defaultDesignTokens,
        buttonPrimary: {
            hover: {
                color: 'rgba(76, 76, 76, 1)',
                backgroundColor: 'rgba(0, 230, 0, 1)',
                borderColor: 'rgba(155, 155, 155, 1)',
            },
            fontFamily: 'inherit',
            fontSize: '13px',
            backgroundColor: 'rgba(230,0,0,1)',
            paddingTop: '10px',
            paddingRight: '20px',
            paddingBottom: '10px',
            paddingLeft: '20px',
            color: 'rgba(102,102,102,1)',
            borderColor: 'rgba(207, 207, 207, 1)',
        },
        buttonSecondary: {
            hover: {
                color: 'rgba(76, 76, 76, 1)',
                backgroundColor: 'rgba(172, 172, 172, 1)',
                borderColor: 'rgba(155, 155, 155, 1)',
            },
            fontFamily: 'inherit',
            fontSize: '13px',
            backgroundColor: 'rgba(230,230,230,1)',
            paddingTop: '20px',
            paddingRight: '40px',
            paddingBottom: '20px',
            paddingLeft: '40px',
            color: 'rgba(102,102,102,1)',
            borderColor: 'rgba(207, 207, 207, 1)',
        },
        buttonTertiary: {
            hover: {
                color: 'rgb(194, 185, 223)',
                borderColor: 'rgb(255, 7, 212)',
                backgroundColor: 'rgb(0, 0, 0)',
            },
            fontSize: '14px',
            color: 'rgb(255, 246, 0)',
            paddingTop: '11px',
            paddingRight: '21px',
            paddingBottom: '11px',
            paddingLeft: '21px',
            fontFamily: 'Arial',
            fontStyle: 'italic',
            fontWeight: '900',
            textTransform: 'uppercase',
            lineHeight: '1.4',
            borderColor: 'rgb(0, 255, 21)',
            borderWidth: '3px',
            borderRadius: '6px',
            backgroundColor: 'rgb(255, 0, 0)',
        },
    },
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
            textStyles: [
                TextStyles.ELEMENT_HEADING1,
                TextStyles.ELEMENT_PARAGRAPH,
                TextStyles.ELEMENT_IMAGE_CAPTION,
                TextStyles.ELEMENT_IMAGE_TITLE,
            ],
        }),
    ])
    .setPlugin([new LinkPlugin()])
    .setPlugin([new ItalicPlugin(), new BoldPlugin(), new UnderlinePlugin()])
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
            textStyles: [TextStyles.ELEMENT_CUSTOM1, TextStyles.ELEMENT_HEADING1, TextStyles.ELEMENT_PARAGRAPH],
        }),
    ]),
};

const mentionAndEmojisPlugins = new PluginComposer();
mentionAndEmojisPlugins
    .setPlugin([new ParagraphPlugin()])
    .setPlugin([new MentionPlugin({ mentionableItems: mentionable })])
    .setPlugin([new UnorderedListPlugin({ isSoftBreak: true }), new OrderedListPlugin({ isSoftBreak: true })])
    .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
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
    ]);
export const WithoutToolbar = RichTextEditorTemplate.bind({});
WithoutToolbar.args = {
    position: Position.TOP,
    plugins: withoutToolbarPlugins,
};

const defaultPluginsWithColumns = new PluginComposer();
defaultPluginsWithColumns
    .setPlugin([new SoftBreakPlugin(), new ParagraphPlugin()])
    .setPlugin(new TextStylePlugin())
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
    ]);

type MultiColumnProps = ComponentProps<typeof RichTextEditorComponent> & { columns: number; columnGap: string };

export const MultiColumns: StoryFn<MultiColumnProps> = (args: MultiColumnProps) => {
    delete args.plugins;

    const plugins = new PluginComposer();
    plugins
        .setPlugin([new SoftBreakPlugin(), new ParagraphPlugin()])
        .setPlugin(new TextStylePlugin())
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
    return getSerializedContent({
        designTokens: customDesignTokens,
        mentionable,
        columns: args.columns,
        columnGap: args.columnGap,
    });
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

function getSerializedContent(
    props: SerializeNodesToHtmlOptions = {
        designTokens: customDesignTokens,
        mentionable,
        columns: 1,
        columnGap: 'normal',
    },
): JSX.Element {
    const serialized = serializeNodesToHtml(nodesToSerialize, props);
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
}
