/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateRenderElementProps } from '@udecode/plate-core';

import { type TLinkElement } from '@components/RichTextEditor/Plugins/LinkPlugin/types';
import { useRichTextEditorContext } from '@components/RichTextEditor/context';

import { LINK_PLUGIN } from '../id';

export const LinkMarkupElementNode = (props: PlateRenderElementProps & { element: TLinkElement }) => {
    const { attributes, children } = props;

    const { styles } = useRichTextEditorContext();
    const href = props.element.url || props.element.chosenLink?.searchResult?.link || '';
    const target = props.element.target || '_self';

    return (
        <a {...attributes} href={href} target={target} style={styles[LINK_PLUGIN]}>
            {children}
        </a>
    );
};
