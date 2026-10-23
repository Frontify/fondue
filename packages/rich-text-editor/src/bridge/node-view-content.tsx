/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useCallback, useContext } from 'react';

/** Where the editable content of the node view whose chrome renders goes, which the portal host provides. */
export const NodeViewContentContext = createContext<((element: HTMLElement | null) => void) | null>(null);
NodeViewContentContext.displayName = 'RichTextNodeViewContentContext';

/** Holds the node's editable content inside chrome, whose own controls then set `contentEditable={false}`. */
export const NodeViewContent = ({ className }: { readonly className?: string }) => {
    const place = useContext(NodeViewContentContext);
    const ref = useCallback((element: HTMLDivElement | null) => place?.(element), [place]);
    return <div ref={ref} className={className} data-rte-content="" />;
};
