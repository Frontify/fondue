/* (c) Copyright Frontify Ltd., all rights reserved. */

import { memo, type ReactNode, useMemo } from 'react';

import {
    buildContentRegistry,
    type ContentRegistry,
    type HtmlAttributes,
    type RteBlockNode,
    type RteContent,
    type RteDocumentOf,
    type RtePlugin,
} from '#/core';

import { blockNode, documentRootSpec } from './documentTree';
import { specToReact, toReact } from './toReact';

export type RendererProps<TBlock extends RteBlockNode = RteBlockNode> = {
    /** The id of the element the document sits in. */
    id?: HtmlAttributes['id'];
    value: RteDocumentOf<TBlock>;
    /**
     * The plugins, or only their content, whose markup draws the document. A node
     * shows its `render.component`, else its `toHtml`. A node whose plugin is
     * missing is skipped (a block keeps its content), with a warning in development.
     */
    plugins: readonly (RtePlugin | RteContent)[];
    /**
     * A class for the element the document sits in, beside the document's own
     */
    className?: string;
    /** The test id of the element the document sits in. */
    'data-test-id'?: HtmlAttributes['data-test-id'];
};

type RegistryRendererProps = Pick<RendererProps, 'id'> & {
    value: RteDocumentOf;
    registry: ContentRegistry;
    className?: string;
} & Pick<RendererProps, 'data-test-id'>;

type BlockProps = {
    block: RteBlockNode;
    registry: ContentRegistry;
};

/** One top-level block, memoized on the block itself: the editor keeps the same object for untouched blocks, so an edit redraws only its block. */
const Block = memo(({ block, registry }: BlockProps): ReactNode => {
    const drawn = blockNode(block, registry, { useComponents: true });
    return drawn === null ? null : toReact([drawn]);
});

/** The renderer for an already built registry, so the editor's readonly view doesn't gather plugins twice. */
export const RegistryRenderer = ({
    id,
    value,
    registry,
    className,
    'data-test-id': dataTestId,
}: RegistryRendererProps): ReactNode => {
    const root = documentRootSpec(registry, className);

    return specToReact(
        { ...root, attrs: { id, ...root.attrs, 'data-test-id': dataTestId } },
        // Blocks carry no id; position is the only key, and the memo skips unchanged ones.
        // eslint-disable-next-line @eslint-react/no-array-index-key
        value.blocks.map((block, index) => <Block key={index} block={block} registry={registry} />),
    );
};

/** A stored document as React, with no editing engine: readonly display, client or server. */
export const RichTextRenderer = <TBlock extends RteBlockNode = RteBlockNode>({
    id,
    value,
    plugins,
    className,
    'data-test-id': dataTestId,
}: RendererProps<TBlock>): ReactNode => {
    const registry = useMemo(() => buildContentRegistry(plugins), [plugins]);

    return (
        <RegistryRenderer id={id} value={value} registry={registry} className={className} data-test-id={dataTestId} />
    );
};
