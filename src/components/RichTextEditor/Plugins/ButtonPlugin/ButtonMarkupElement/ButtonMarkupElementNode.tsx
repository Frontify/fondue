/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';
import { ButtonRootProps } from '../components/Button';

export const ButtonMarkupElementNode = (props: ButtonRootProps) => {
    const { designTokens } = useRichTextEditorContext();
    const { attributes, children, href, target } = props;

    return (
        <a {...attributes} href={href} target={target} style={designTokens.button_primary}>
            {children}
        </a>
    );
};
