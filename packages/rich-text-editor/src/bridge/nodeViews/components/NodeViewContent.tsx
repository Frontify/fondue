/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useContext } from 'react';

import { NodeViewContentContext } from '../helpers/nodeViewContentContext';

/** The props of `NodeViewContent`. */
export type NodeViewContentProps = {
    /** The class of the content element. */
    className?: string;
};

/**
 * Holds the node's editable content inside chrome, whose own controls then set `contentEditable={false}`. Render it once
 * per node view; `className` styles the content element.
 */
export const NodeViewContent = ({ className }: NodeViewContentProps) => {
    const place = useContext(NodeViewContentContext);
    const ref = useCallback((element: HTMLDivElement | null) => place?.(element), [place]);

    return <div ref={ref} className={className} data-rte-content="" />;
};

NodeViewContent.displayName = 'NodeViewContent';
