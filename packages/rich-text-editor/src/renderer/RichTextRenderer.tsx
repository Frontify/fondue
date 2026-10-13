/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type ReactNode, useMemo } from 'react';

import { buildPluginRegistry, type RteBlockNode, type RteDocumentOf, type RtePlugin } from '#/core';

import styles from './document.module.scss';
import { documentTree } from './documentTree';
import { toReact } from './toReact';

export type RichTextRendererProps<TBlock extends RteBlockNode = RteBlockNode> = {
    value: RteDocumentOf<TBlock>;
    /**
     * The plugins whose markup draws the document — the same list the editor
     * is given. Each node shows its `render.component` if it has one, its
     * `toHtml` otherwise. A document drawn without the plugin that wrote part
     * of it throws, naming the missing schema `type`.
     */
    plugins?: readonly RtePlugin[];
    className?: string;
};

/**
 * A stored document as React, with no editing engine: readonly display, on
 * the client or a server.
 */
export const RichTextRenderer = <TBlock extends RteBlockNode = RteBlockNode>({
    value,
    plugins = [],
    className,
}: RichTextRendererProps<TBlock>): ReactNode => {
    const registry = useMemo(() => buildPluginRegistry(plugins), [plugins]);
    const drawn = useMemo(() => toReact(documentTree(value, registry, { useComponents: true })), [value, registry]);
    const contentClassName = [styles.document, className, ...registry.contentClassNames].filter(Boolean).join(' ');
    const style = registry.contentProperties as CSSProperties;

    return (
        <div className={contentClassName} style={Object.keys(style).length > 0 ? style : undefined}>
            {drawn}
        </div>
    );
};
