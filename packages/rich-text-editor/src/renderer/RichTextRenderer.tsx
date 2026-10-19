/* (c) Copyright Frontify Ltd., all rights reserved. */

import { memo, type ReactNode, useMemo } from 'react';

import {
    buildPluginRegistry,
    type PluginRegistry,
    type RteBlockNode,
    type RteDocumentOf,
    type RtePlugin,
} from '#/core';

import { blockNode, documentRootSpec } from './documentTree';
import { specToReact, toReact } from './toReact';

export type RendererProps<TBlock extends RteBlockNode = RteBlockNode> = {
    value: RteDocumentOf<TBlock>;
    /**
     * The plugins whose markup draws the document — the editor's list. A node
     * shows its `render.component`, else its `toHtml`. A node whose plugin is
     * missing is skipped (a block keeps its content), with a warning in development.
     */
    plugins?: readonly RtePlugin[];
    /** A class for the element the document sits in, beside the document's own. */
    className?: string;
};

type RegistryRendererProps = {
    value: RteDocumentOf;
    registry: PluginRegistry;
    className?: string;
};

/** One top-level block, memoized on the block itself: the editor keeps the same object for untouched blocks, so an edit redraws only its block. */
const Block = memo(({ block, registry }: { block: RteBlockNode; registry: PluginRegistry }): ReactNode => {
    const drawn = blockNode(block, registry, { useComponents: true });
    return drawn === null ? null : toReact([drawn]);
});

/** The renderer for an already built registry, so the editor's readonly view doesn't gather plugins twice. */
export const RegistryRenderer = ({ value, registry, className }: RegistryRendererProps): ReactNode =>
    specToReact(
        documentRootSpec(registry, className),
        // Blocks carry no id; position is the only key, and the memo skips unchanged ones.
        // eslint-disable-next-line @eslint-react/no-array-index-key
        value.blocks.map((block, index) => <Block key={index} block={block} registry={registry} />),
    );

/** A stored document as React, with no editing engine: readonly display, client or server. */
export const RichTextRenderer = <TBlock extends RteBlockNode = RteBlockNode>({
    value,
    plugins = [],
    className,
}: RendererProps<TBlock>): ReactNode => {
    const registry = useMemo(() => buildPluginRegistry(plugins), [plugins]);
    return <RegistryRenderer value={value} registry={registry} className={className} />;
};
