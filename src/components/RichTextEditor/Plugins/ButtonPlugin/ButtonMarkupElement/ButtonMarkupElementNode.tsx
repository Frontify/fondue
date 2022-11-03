/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { LinkRootProps } from '@udecode/plate';
import { useRichTextEditorContext } from '@components/RichTextEditor/context/RichTextEditorContext';

export const ButtonMarkupElementNode = (props: LinkRootProps) => {
    const { designTokens } = useRichTextEditorContext();
    const { attributes, children, href, target } = props;

    return (
        //TODO: remove classname
        <a className="my-super-button" {...attributes} href={href} target={target} style={designTokens.link}>
            {children}
        </a>
    );
};
