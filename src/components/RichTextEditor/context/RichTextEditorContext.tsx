/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { createContext, useContext } from 'react';
import { DesignTokens } from '../types';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';
import { Position } from '../EditorPositioningWrapper';
import { EditorResizeContextProvider } from './EditorResizeContext';

export type RichTextEditorContextProps = {
    designTokens: DesignTokens;
    position: Position;
};

const RichTextEditorContext = createContext<RichTextEditorContextProps | null>(null);
export const useRichTextEditorContext = () => {
    if (!RichTextEditorContext) {
        throw new Error('useRichTextEditorContext must be used within a RichTextEditorProvider');
    }
    return useContext(RichTextEditorContext);
};

type RichTextEditorProviderProps = {
    children: React.ReactNode;
    value: {
        designTokens: DesignTokens;
        position: Position;
    };
};

export const RichTextEditorProvider = ({ children, value }: RichTextEditorProviderProps) => {
    const { designTokens, position } = value;

    const state = {
        designTokens: designTokens ?? defaultDesignTokens,
        position: position ?? Position.FLOATING,
    };

    return (
        <RichTextEditorContext.Provider value={state}>
            <EditorResizeContextProvider>{children}</EditorResizeContextProvider>
        </RichTextEditorContext.Provider>
    );
};
