/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';
import { type RenderPlaceholderProps } from 'slate-react';

import { type PlaceholderOpacity } from '@components/RichTextEditor/types';

const PLACEHOLDER_STYLES: CSSProperties = {
    position: 'relative',
    height: '0',
};

export const RenderPlaceholder = ({
    children,
    attributes,
    opacity,
}: RenderPlaceholderProps & { opacity: PlaceholderOpacity }) => {
    const mergedAttributes = {
        ...attributes,
        style: {
            ...attributes.style,
            ...PLACEHOLDER_STYLES,
            opacity: opacity === 'low' ? 0.333 : 0.7,
        },
    };
    return <span {...mergedAttributes}>{children}</span>;
};
