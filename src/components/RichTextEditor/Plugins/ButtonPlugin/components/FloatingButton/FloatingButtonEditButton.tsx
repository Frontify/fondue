/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback } from 'react';
import { AsProps, HTMLPropsAs, createComponentAs, createElementAs, useEditorRef } from '@udecode/plate-core';
import { triggerFloatingButtonEdit } from '../../utils/triggerFloatingButtonEdit';

export const useFloatingButtonEditButton = (props: HTMLPropsAs<'button'>): HTMLPropsAs<'button'> => {
    const editor = useEditorRef();

    return {
        onClick: useCallback(() => {
            triggerFloatingButtonEdit(editor);
        }, [editor]),
        ...props,
    };
};

export const FloatingButtonEditButton = createComponentAs<AsProps<'button'>>((props) => {
    const htmlProps = useFloatingButtonEditButton(props);

    return createElementAs('button', htmlProps);
});
