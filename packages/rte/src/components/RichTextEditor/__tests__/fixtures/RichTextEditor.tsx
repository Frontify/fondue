/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
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
    OrderedListPlugin,
    ParagraphPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    RichTextEditor,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@components/RichTextEditor';
import { orderedListValue, unorderedListValue } from '@components/RichTextEditor/helpers/exampleValues';

export const insertTextAndOpenToolbar = () => cy.get('[contenteditable=true]').click().type('hello{selectall}');

export const TextStylePlugins = [
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
];

export const RichTextWithCustomTextStylesDefaultValues = (): ReactElement => {
    const plugins = new PluginComposer();
    plugins
        .setPlugin(new SoftBreakPlugin())
        .setPlugin(
            new TextStylePlugin({
                textStyles: TextStylePlugins,
            }),
        )
        .setPlugin(
            [
                new BoldPlugin(),
                new ItalicPlugin(),
                new UnderlinePlugin(),
                new StrikethroughPlugin(),
                new LinkPlugin(),
                new CodePlugin(),
            ],
            [
                new AlignLeftPlugin(),
                new AlignCenterPlugin(),
                new AlignRightPlugin(),
                new AlignJustifyPlugin(),
                new UnorderedListPlugin(),
                new CheckboxListPlugin(),
                new OrderedListPlugin(),
                new ResetFormattingPlugin(),
                new EmojiPlugin(),
            ],
        );

    return <RichTextEditor plugins={plugins} />;
};

export const listPlugins = new PluginComposer();
listPlugins
    .setPlugin(new SoftBreakPlugin())
    .setPlugin(
        new TextStylePlugin({
            textStyles: [
                new Heading1Plugin(),
                new ParagraphPlugin(),
                new Custom1Plugin(),
                new Custom2Plugin(),
                new Custom3Plugin(),
            ],
        }),
    )
    .setPlugin([new UnorderedListPlugin(), new OrderedListPlugin(), new AlignRightPlugin()]);

export const RichTextEditorWithUnorderedListStyles = () => (
    <RichTextEditor value={JSON.stringify([unorderedListValue])} plugins={listPlugins} />
);

export const RichTextEditorWithOrderedListStyles = () => (
    <RichTextEditor value={JSON.stringify([orderedListValue])} plugins={listPlugins} />
);
