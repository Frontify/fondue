/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-components/styles';
import '@frontify/fondue-tokens/styles';
import { type BoldMark } from './plugins/bold';
import { type HeadingBlock } from './plugins/heading';
import { type ImageBlock } from './plugins/image';
import { type ItalicMark } from './plugins/italic';
import { type LinkMark } from './plugins/link';
import { type QuoteBlock } from './plugins/quote';
import {
    type FrontifyBlockNode,
    type FrontifyDocument,
    type FrontifyTextNode,
    type ParagraphBlock,
} from './RichTextEditor';

/**
 * The package's public API: the editor surface (src/RichTextEditor) plus
 * the built-in plugins and the official document format assembled from
 * them. Nothing is mounted automatically — the `plugins` prop is the
 * complete, explicit plugin list.
 */

// The editor: component, plugin contract, structural document types
export * from './RichTextEditor';

// The built-in plugins (compose your own list; `defaultPlugins` bundles all
// of them in toolbar order) and their document types
export { defaultPlugins } from './plugins';
export { BoldPlugin, type BoldMark } from './plugins/bold';
export { ItalicPlugin, type ItalicMark } from './plugins/italic';
export { LinkPlugin, type LinkMark } from './plugins/link';
export { HeadingPlugin, type HeadingBlock, isHeadingBlock } from './plugins/heading';
export { QuotePlugin, type QuoteBlock, isQuoteBlock } from './plugins/quote';
export { ImagePlugin, type ImageBlock, isImageBlock } from './plugins/image';

/**
 * The official Frontify document format: the assembled union of every
 * block and mark type the built-in plugins produce. Apps, serializers, and
 * backend code should consume THESE types — the structural *Node types are
 * only the skeleton. Extending these unions is a wire-format change and
 * should be a deliberate act, made in the same PR that ships the plugin
 * implementing the new type.
 */
export type FrontifyBlock = ParagraphBlock | HeadingBlock | QuoteBlock | ImageBlock;
export type FrontifyText = FrontifyTextNode & BoldMark & ItalicMark & LinkMark;

/**
 * Build a document from plain block literals — no type annotations needed.
 * Block types and their attrs are fully checked; mark flags and inline
 * elements are open by design (the wire format admits contributions from
 * plugins this build doesn't know). When the document uses a consumer
 * plugin's own block type, pass it once: `createDocument<CalloutBlock>([...])`.
 */
export const createDocument = <TExtraBlock extends FrontifyBlockNode = never>(
    // NoInfer: TExtraBlock must be passed explicitly — inferring it from the
    // literal would accept any block shape and disable checking entirely.
    blocks: readonly (FrontifyBlock | NoInfer<TExtraBlock>)[],
): FrontifyDocument => ({
    version: 1,
    blocks: [...blocks],
});
