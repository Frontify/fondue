/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { createContext, useContext } from 'react';
import { DesignTokens } from '../types';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';
import { Position, getEditorWrapperClassNames } from '../EditorPositioningWrapper';
import { EditorResizeContextProvider } from './EditorResizeContext';

export type RichTextEditorContextProps = {
    designTokens: DesignTokens;
    position: Position;
    wrapperClassNames: string;
};

export const RichTextEditorContext = createContext<RichTextEditorContextProps>({
    designTokens: defaultDesignTokens,
    position: Position.FLOATING,
    wrapperClassNames: '',
});
export const useRichTextEditorContext = () => useContext(RichTextEditorContext);

type RichTextEditorProviderProps = {
    children: React.ReactNode;
    value: {
        designTokens: DesignTokens;
        position: Position;
        border: boolean;
        editorWidth?: number;
    };
};

export const RichTextEditorProvider = ({ children, value }: RichTextEditorProviderProps) => {
    const { designTokens, position, border, editorWidth } = value;

    const state = {
        designTokens: designTokens ?? defaultDesignTokens,
        position,
        wrapperClassNames: getEditorWrapperClassNames(position, border),
    };

    return (
        <RichTextEditorContext.Provider value={state}>
            <EditorResizeContextProvider width={editorWidth}>{children}</EditorResizeContextProvider>
        </RichTextEditorContext.Provider>
    );
};
