/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BoldPlugin } from './bold';
import { HeadingPlugin } from './heading';
import { ImagePlugin } from './image';
import { ItalicPlugin } from './italic';
import { LinkPlugin } from './link';
import { QuotePlugin } from './quote';

/**
 * Convenience bundle of every built-in plugin, in toolbar order. Nothing is
 * mounted automatically — pass these (or a subset) to RichTextEditor.
 */
export const defaultPlugins = [BoldPlugin, ItalicPlugin, LinkPlugin, HeadingPlugin, QuotePlugin, ImagePlugin];
