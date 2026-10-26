/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useContext } from 'react';

import { NodeViewContentContext } from '../helpers/nodeViewContentContext';

/** Holds the node's editable content inside chrome, whose own controls then set `contentEditable={false}`. */
export const NodeViewContent = ({ className }: { className?: string }) => {
    const place = useContext(NodeViewContentContext);
    const ref = useCallback((element: HTMLDivElement | null) => place?.(element), [place]);

    return <div ref={ref} className={className} data-rte-content="" />;
};
