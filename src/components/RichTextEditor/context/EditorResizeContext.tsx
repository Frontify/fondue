/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { createContext, useContext } from 'react';
import { useEditorResize } from '../hooks';
import { EditorPositioningWrapperChildProps } from '../EditorPositioningWrapper/types';

type EditorResizeContextProps = {
    editorWidth: number | undefined;
    editorRef: ((node: HTMLDivElement) => ResizeObserver | undefined) | null;
};
const EditorResizeContext = createContext<EditorResizeContextProps>({
    editorWidth: 0,
    editorRef: null,
});
export const useEditorResizeContext = () => useContext(EditorResizeContext);

type EditorResizeContextProviderProps = {
    children: React.ReactNode;
    PositioningWrapper: EditorPositioningWrapperChildProps;
};

export const EditorResizeContextProvider = ({ PositioningWrapper, children }: EditorResizeContextProviderProps) => {
    const { editorWidth, editorRef } = useEditorResize();

    return (
        <EditorResizeContext.Provider value={{ editorWidth, editorRef }}>
            <PositioningWrapper.PlateWrapper ref={editorRef}>{children}</PositioningWrapper.PlateWrapper>
        </EditorResizeContext.Provider>
    );
};
