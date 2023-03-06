/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from '@components/Checkbox';
import { InternalLinkDocumentLoader } from '@components/RichTextEditor/Plugins/types';
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
import React, { Dispatch, Reducer, useEffect, useReducer } from 'react';
import { getLegacyUrl, getUrl } from '../../utils';
import { InsertModalDispatchType, InsertModalStateProps } from './types';

const initialState: InsertModalStateProps = {
    url: '',
    text: '',
    newTab: CheckboxState.Unchecked,
};

export const InsertModalState = (): [InsertModalStateProps, Dispatch<InsertModalDispatchType>] => {
    const [state, dispatch] = useReducer<Reducer<InsertModalStateProps, InsertModalDispatchType>>((state, action) => {
        const { type, payload } = action;

        switch (type) {
            case 'NEW_TAB':
                return {
                    ...state,
                    newTab: CheckboxState.Checked,
                };
            case 'SAME_TAB':
                return {
                    ...state,
                    newTab: CheckboxState.Unchecked,
                };
            case 'URL':
            case 'TEXT':
            case 'INIT':
                return {
                    ...state,
                    ...payload,
                };
            default:
                return state;
        }
    }, initialState);

    return [state, dispatch];
};

export const useInsertModal = () => {
    const editor = useEditorRef();
    const [state, dispatch] = InsertModalState();

    useEffect(() => {
        const legacyUrl = getLegacyUrl(editor);
        const url = getUrl(editor);

        dispatch({
            type: 'INIT',
            payload: {
                text: floatingLinkSelectors.text(),
                newTab: floatingLinkSelectors.newTab() ? CheckboxState.Checked : CheckboxState.Unchecked,
                url: legacyUrl && url === '' ? legacyUrl : floatingLinkSelectors.url(),
            },
        });
    }, [dispatch, editor]);

    const onTextChange = (value: string) => {
        dispatch({
            type: 'TEXT',
            payload: { text: value },
        });
    };

    const onUrlChange = (value: string) => {
        dispatch({
            type: 'URL',
            payload: { url: value },
        });
    };

    const onToggleTab = (checked: boolean) => {
        checked ? dispatch({ type: 'NEW_TAB' }) : dispatch({ type: 'SAME_TAB' });
    };

    const onCancel = () => {
        floatingLinkActions.hide();
    };

    const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent | undefined) => {
        if (!isValidUrlOrEmpty() || !hasValues) {
            return;
        }

        floatingLinkActions.text(state.text);
        floatingLinkActions.url(state.url);
        floatingLinkActions.newTab(state.newTab === CheckboxState.Checked);

        if (submitFloatingLink(editor)) {
            e?.preventDefault();
        }
    };

    const hasValues = state.url !== '' && state.text !== '';

    const isValidUrlOrEmpty = () => {
        const { isUrl } = getPluginOptions<LinkPlugin>(editor, ELEMENT_LINK);
        return !state.url || (isUrl && isUrl(state.url));
    };

    const { loadInternalLinkDocument } = getPluginOptions<{ loadInternalLinkDocument: InternalLinkDocumentLoader }>(
        editor,
        ELEMENT_LINK,
    );

    useHotkeys(
        'enter',
        onSave,
        {
            enableOnTags: ['INPUT'],
        },
        [],
    );

    return {
        state,
        onTextChange,
        onUrlChange,
        onToggleTab,
        onCancel,
        onSave,
        hasValues,
        isValidUrlOrEmpty,
        loadInternalLinkDocument,
    };
};
