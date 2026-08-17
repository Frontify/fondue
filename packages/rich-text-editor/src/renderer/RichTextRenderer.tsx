/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type ReactNode, useMemo } from 'react';

import { buildPluginRegistry, type RteBlockNode, type RteDocumentOf, type RtePlugin } from '#/core';

import { renderDocument } from './renderDocument';

export type RichTextRendererProps<TBlock extends RteBlockNode = RteBlockNode> = {
    value: RteDocumentOf<TBlock>;
    /**
     * The plugins whose `renderComponent` draws the document — the same list
     * the editor is given. A document drawn without the plugin that wrote part
     * of it throws, naming the missing schema `type`.
     */
    plugins?: readonly RtePlugin[];
    className?: string;
};

/**
 * A stored document as React, with no editing engine. Used for readonly
 * display, SSR, and HTML export.
 */
export const RichTextRenderer = <TBlock extends RteBlockNode = RteBlockNode>({
    value,
    plugins = [],
    className,
}: RichTextRendererProps<TBlock>): ReactNode => {
    const registry = useMemo(() => buildPluginRegistry(plugins), [plugins]);
    const contentClassName = [className, ...plugins.map((plugin) => plugin.contentClassName)].filter(Boolean).join(' ');
    const style = Object.fromEntries(
        plugins.flatMap((plugin) => Object.entries(plugin.contentProperties ?? {})),
    ) as CSSProperties;

    return (
        <div className={contentClassName || undefined} style={Object.keys(style).length > 0 ? style : undefined}>
            {renderDocument(value, registry)}
        </div>
    );
};
