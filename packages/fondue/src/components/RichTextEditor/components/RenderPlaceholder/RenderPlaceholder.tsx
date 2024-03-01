/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';
import { type RenderPlaceholderProps } from 'slate-react';

const PLACEHOLDER_STYLES: CSSProperties = {
    position: 'relative',
    height: '0',
};

export const RenderPlaceholder = ({ children, attributes }: RenderPlaceholderProps) => {
    const mergedAttributes = {
        ...attributes,
        style: {
            ...attributes.style,
            ...PLACEHOLDER_STYLES,
        },
    };
    return <span {...mergedAttributes}>{children}</span>;
};
