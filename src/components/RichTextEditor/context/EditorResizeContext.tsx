/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode, createContext, useContext } from 'react';
import { useEditorResize } from '../hooks';
import { PlateWrapper } from '../EditorPositioningWrapper/PlateWrapper';

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
    children: ReactNode;
};

export const EditorResizeContextProvider = ({ children }: EditorResizeContextProviderProps) => {
    const { editorWidth, editorRef } = useEditorResize();

    return (
        <EditorResizeContext.Provider value={{ editorWidth, editorRef }}>
            <PlateWrapper ref={editorRef}>{children}</PlateWrapper>
        </EditorResizeContext.Provider>
    );
};
