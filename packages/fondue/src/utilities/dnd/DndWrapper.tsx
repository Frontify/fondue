/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode, memo, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface DndWrapperProps {
    id: string;
    children: ReactNode;
}

/**
 * Necessary when multiple DndProvider components are present on a single page. Limits the scope of HTML5Backend
 * to the rootElement, thus preventing the `Cannot have two HTML5 backends at the same time` error.
 */
export const DndWrapper = memo(({ id, children }: DndWrapperProps) => {
    const [context, setContext] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setContext(document.getElementById(id));
    }, [id]);

    return context ? (
        <DndProvider backend={HTML5Backend} options={{ rootElement: context }}>
            {children}
        </DndProvider>
    ) : null;
});
DndWrapper.displayName = 'FondueDndWrapper';
