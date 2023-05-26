/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { CSSProperties } from 'react';
import { createContext, useContext } from 'react';
import { Position, getEditorWrapperClassNames } from '../EditorPositioningWrapper';
import { EditorResizeContextProvider } from './EditorResizeContext';
import { defaultTheme } from '../utils';

export type RichTextEditorContextProps = {
    theme: Record<string, CSSProperties & { hover?: CSSProperties }>;
    position: Position;
    wrapperClassNames: string;
};

export const RichTextEditorContext = createContext<RichTextEditorContextProps>({
    theme: defaultTheme,
    position: Position.FLOATING,
    wrapperClassNames: '',
});
export const useRichTextEditorContext = () => useContext(RichTextEditorContext);

type RichTextEditorProviderProps = {
    children: React.ReactNode;
    value: {
        theme: Record<string, CSSProperties & { hover?: CSSProperties }>;
        position: Position;
        border: boolean;
    };
};

export const RichTextEditorProvider = ({ children, value }: RichTextEditorProviderProps) => {
    const { theme, position, border } = value;

    const state = {
        theme: theme ?? defaultTheme,
        position,
        wrapperClassNames: getEditorWrapperClassNames(position, border),
    };

    return (
        <RichTextEditorContext.Provider value={state}>
            <EditorResizeContextProvider>{children}</EditorResizeContextProvider>
        </RichTextEditorContext.Provider>
    );
};
