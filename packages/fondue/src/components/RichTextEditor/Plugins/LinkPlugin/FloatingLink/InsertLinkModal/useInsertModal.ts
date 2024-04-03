/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getPluginOptions, useEditorRef, useHotkeys } from '@udecode/plate-core';
import {
    ELEMENT_LINK,
    type LinkPlugin,
    floatingLinkActions,
    floatingLinkSelectors,
    submitFloatingLink,
} from '@udecode/plate-link';
import { type Dispatch, type MouseEvent, type Reducer, useEffect, useReducer } from 'react';

import { CheckboxState } from '@components/Checkbox';

import { getLegacyUrl, getUrl } from '../../utils';

import { type InsertModalDispatchType, type InsertModalStateProps } from './types';

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
        const isNewTab = floatingLinkSelectors.newTab();
        dispatch({
            type: 'INIT',
            payload: {
                text: floatingLinkSelectors.text(),
                newTab: isNewTab ? CheckboxState.Checked : CheckboxState.Unchecked,
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
        floatingLinkActions.reset();
    };

    const onSave = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | KeyboardEvent | undefined) => {
        if (!isValidUrlOrEmpty() || !hasValues) {
            return;
        }

        floatingLinkActions.text(state.text);
        floatingLinkActions.url(state.url);
        floatingLinkActions.newTab(state.newTab === CheckboxState.Checked);

        if (submitFloatingLink(editor)) {
            event?.preventDefault();
        }
    };

    const hasValues = state.url !== '' && state.text !== '';

    const isValidUrlOrEmpty = () => {
        const { isUrl } = getPluginOptions<LinkPlugin>(editor, ELEMENT_LINK);
        return !state.url || (isUrl && isUrl(state.url));
    };

    useHotkeys(
        'enter',
        onSave,
        {
            enableOnFormTags: ['INPUT'],
        },
        [],
    );

    return { state, onTextChange, onUrlChange, onToggleTab, onCancel, onSave, hasValues, isValidUrlOrEmpty };
};
