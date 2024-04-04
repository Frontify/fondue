/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AlignCenterPlugin, AlignJustifyPlugin, AlignLeftPlugin, AlignRightPlugin } from './AlignPlugin';
import { CheckboxListPlugin } from './CheckboxListPlugin';
import { EmojiPlugin } from './EmojiPlugin';
import { LinkPlugin } from './LinkPlugin';
import { OrderedListPlugin, UnorderedListPlugin } from './ListPlugin';
import { BoldPlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin, UnderlinePlugin } from './MarkPlugin';
import { PluginComposer } from './PluginComposer';
import { ResetFormattingPlugin } from './ResetFormattingPlugin';
import { SoftBreakPlugin } from './SoftBreakPlugin';
import { ParagraphPlugin, TextStylePlugin } from './TextStylePlugin';

export const defaultPlugins = new PluginComposer();
defaultPlugins
    .setPlugin(new SoftBreakPlugin())
    .setPlugin(new TextStylePlugin({ textStyles: [new ParagraphPlugin()] }))
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
