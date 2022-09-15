/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import {
    ELEMENT_LINK,
    LinkPlugin,
    floatingLinkActions,
    floatingLinkSelectors,
    getPluginOptions,
    submitFloatingLink,
    useEditorRef,
    useHotkeys,
} from '@udecode/plate';
import { getLegacyUrl, getUrl } from '../../utils';

export const useInsertModal = () => {
    const [, setValue] = useState<string>();

    const editor = useEditorRef();

    useEffect(() => {
        const legacyUrl = getLegacyUrl(editor);
        const url = getUrl(editor);
        if (url === '' && legacyUrl) {
            floatingLinkActions.url(legacyUrl);
            setValue(legacyUrl);
        }
    }, [editor]);

    const isValidUrlOrEmpty = () => {
        const { isUrl } = getPluginOptions<LinkPlugin>(editor, ELEMENT_LINK);
        return !floatingLinkSelectors.url() || (isUrl && isUrl(floatingLinkSelectors.url()));
    };

    const hasValues = () => floatingLinkSelectors.url() !== '' && floatingLinkSelectors.text() !== '';

    const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent | undefined) => {
        if (!isValidUrlOrEmpty() || !hasValues()) {
            return;
        }
        if (submitFloatingLink(editor)) {
            e?.preventDefault();
        }
    };

    useHotkeys(
        'enter',
        (e) => {
            submit(e);
        },
        {
            enableOnTags: ['INPUT'],
        },
        [],
    );

    return {
        isValidUrlOrEmpty,
        setValue,
        hasValues,
        submit,
    };
};
