/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckboxState } from '@components/Checkbox';
import { isUrl } from '@components/RichTextEditor/utils/isUrl';
import { useEditorRef, useHotkeys } from '@udecode/plate';
import React, { Dispatch, Reducer, useEffect, useReducer } from 'react';
import { submitFloatingButton } from '../../../transforms/submitFloatingButton';
import { RichTextButtonStyle } from '../../../types';
import { getButtonStyle } from '../../../utils/getButtonStyle';
import { floatingButtonActions, floatingButtonSelectors } from '../floatingButtonStore';
import { InsertModalDispatchType, InsertModalStateProps } from './types';

const initialState: InsertModalStateProps = {
    url: '',
    text: '',
    buttonStyle: 'primary',
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
            case 'BUTTON_STYLE':
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
        const buttonStyle = getButtonStyle(editor);

        dispatch({
            type: 'INIT',
            payload: {
                text: floatingButtonSelectors.text(),
                buttonStyle,
                newTab: floatingButtonSelectors.newTab() ? CheckboxState.Checked : CheckboxState.Unchecked,
                url: floatingButtonSelectors.url(),
            },
        });
    }, [dispatch, editor]);

    const onTextChange = (value: string) => {
        dispatch({
            type: 'TEXT',
            payload: { text: value },
        });
    };

    const onButtonStyleChange = (value: RichTextButtonStyle) => {
        dispatch({
            type: 'BUTTON_STYLE',
            payload: { buttonStyle: value },
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
        floatingButtonActions.hide();
    };

    const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent | undefined) => {
        if (!isValidUrlOrEmpty() || !hasValues) {
            return;
        }

        floatingButtonActions.text(state.text);
        floatingButtonActions.url(state.url);
        floatingButtonActions.buttonStyle(state.buttonStyle);
        floatingButtonActions.newTab(state.newTab === CheckboxState.Checked);

        if (submitFloatingButton(editor)) {
            e?.preventDefault();
        }
    };

    const hasValues = state.url !== '' && state.text !== '';

    const isValidUrlOrEmpty = () => {
        return !state.url || isUrl(state.url);
    };

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
        onButtonStyleChange,
        onUrlChange,
        onToggleTab,
        onCancel,
        onSave,
        hasValues,
        isValidUrlOrEmpty,
    };
};
