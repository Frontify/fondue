/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback } from 'react';
import { Button } from '@udecode/plate-button';
import {
    AsProps,
    HTMLPropsAs,
    createComponentAs,
    createElementAs,
    focusEditor,
    useEditorRef,
} from '@udecode/plate-core';
import { unwrapButton } from '../../transforms/index';

export const useUnlinkButton = (props: HTMLPropsAs<'button'>): HTMLPropsAs<'button'> => {
    const editor = useEditorRef();

    return {
        onClick: useCallback(() => {
            unwrapButton(editor);
            focusEditor(editor, editor.selection ?? undefined);
        }, [editor]),
        ...props,
    };
};

export const UnlinkButton = createComponentAs<AsProps<'button'>>((props) => {
    const htmlProps = useUnlinkButton(props);

    return createElementAs(Button, htmlProps);
});
