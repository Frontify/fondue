/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { createContext, useContext } from 'react';
import { DesignTokens } from '../types';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';
import { EditorPositioningWrapper, Position } from '../EditorPositioningWrapper';
import { useEditorResize } from '../hooks';

type RichTextEditorContextProps = {
    designTokens: DesignTokens;
    PositioningWrapper: typeof EditorPositioningWrapper[Position.FLOATING];
    editorWidth: number | undefined;
};

const RichTextEditorContext = createContext<RichTextEditorContextProps>({
    designTokens: defaultDesignTokens,
    PositioningWrapper: EditorPositioningWrapper[Position.FLOATING],
    editorWidth: 0,
});
export const useRichTextEditorContext = () => useContext(RichTextEditorContext);

type RichTextEditorProviderProps = {
    children: React.ReactNode;
    value: {
        designTokens: DesignTokens;
        position: Position;
    };
};

export const RichTextEditorProvider = ({ children, value }: RichTextEditorProviderProps) => {
    const { designTokens, position } = value;
    const PositioningWrapper = EditorPositioningWrapper[position ?? Position.FLOATING];
    const { editorRef, editorWidth } = useEditorResize();

    const state = {
        designTokens: designTokens ?? defaultDesignTokens,
        PositioningWrapper,
        editorWidth,
    };

    return (
        <RichTextEditorContext.Provider value={state}>
            <PositioningWrapper.PlateWrapper ref={editorRef}>{children}</PositioningWrapper.PlateWrapper>
        </RichTextEditorContext.Provider>
    );
};
