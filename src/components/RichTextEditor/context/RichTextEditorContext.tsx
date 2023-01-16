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
    style: React.CSSProperties;
};

export const RichTextEditorContext = createContext<RichTextEditorContextProps>({
    designTokens: defaultDesignTokens,
    position: Position.FLOATING,
    style: {},
});
export const useRichTextEditorContext = () => useContext(RichTextEditorContext);

type RichTextEditorProviderProps = {
    children: React.ReactNode;
    value: {
        designTokens: DesignTokens;
        position: Position;
        style: React.CSSProperties;
    };
};

export const RichTextEditorProvider = ({ children, value }: RichTextEditorProviderProps) => {
    const { designTokens, position, style } = value;

    const state = {
        designTokens: designTokens ?? defaultDesignTokens,
        position: position ?? Position.FLOATING,
        style: style ?? {},
    };

    return (
        <RichTextEditorContext.Provider value={state}>
            <EditorResizeContextProvider>{children}</EditorResizeContextProvider>
        </RichTextEditorContext.Provider>
    );
};
