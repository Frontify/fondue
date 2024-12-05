/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, cloneElement, isValidElement, type ReactNode, useMemo } from 'react';

const wrapFloatingText = (children: ReactNode) => {
    const content = [];
    for (const child of Children.toArray(children)) {
        if (isValidElement(child)) {
            content.push(child);
        } else {
            content.push(<span>{child}</span>);
        }
    }
    return content.length === 1 ? content[0] : content;
};

export const useProcessedChildren = (children: ReactNode) => {
    return useMemo(() => {
        const isLink =
            isValidElement<{
                children: ReactNode;
            }>(children) && children.type === 'a';

        if (isLink) {
            const element = cloneElement(children, {
                children: wrapFloatingText(children.props.children),
            });
            return { isLink, content: element };
        }

        return { isLink, content: wrapFloatingText(children) };
    }, [children]);
};
