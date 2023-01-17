/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { createContext, useContext } from 'react';
import { DesignTokens } from '../types';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';
import { EditorPositioningWrapper, Position } from '../EditorPositioningWrapper';
import { EditorResizeContextProvider } from './EditorResizeContext';
import { merge } from '@utilities/merge';

export type RichTextEditorContextProps = {
    designTokens: DesignTokens;
    wrapperClassNames: string;
};

const RichTextEditorContext = createContext<RichTextEditorContextProps>({
    designTokens: defaultDesignTokens,
    wrapperClassNames: '',
});
export const useRichTextEditorContext = () => useContext(RichTextEditorContext);

type RichTextEditorProviderProps = {
    children: React.ReactNode;
    value: {
        designTokens: DesignTokens;
        position: Position;
        border: boolean;
    };
};

export const RichTextEditorProvider = ({ children, value }: RichTextEditorProviderProps) => {
    const { designTokens, position, border } = value;

    const toolbarPositioningClasses = EditorPositioningWrapper[position].PlateWrapperClassNames;
    const showBorder = border || position !== Position.FLOATING;

    const state = {
        designTokens: designTokens ?? defaultDesignTokens,
        wrapperClassNames: merge([toolbarPositioningClasses, showBorder && 'tw-border tw-border-line tw-rounded']),
    };

    return (
        <RichTextEditorContext.Provider value={state}>
            <EditorResizeContextProvider>{children}</EditorResizeContextProvider>
        </RichTextEditorContext.Provider>
    );
};
