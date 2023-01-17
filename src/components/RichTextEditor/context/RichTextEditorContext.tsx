/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { createContext, useContext } from 'react';
import { DesignTokens } from '../types';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';
import { Position, getEditorWrapperClassNames } from '../EditorPositioningWrapper';
import { EditorResizeContextProvider } from './EditorResizeContext';

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

    const state = {
        designTokens: designTokens ?? defaultDesignTokens,
        wrapperClassNames: getEditorWrapperClassNames(position, border),
    };

    return (
        <RichTextEditorContext.Provider value={state}>
            <EditorResizeContextProvider>{children}</EditorResizeContextProvider>
        </RichTextEditorContext.Provider>
    );
};
