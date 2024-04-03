/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, createContext, useContext, useMemo } from 'react';

import { PlateWrapper } from '../components/EditorPositioningWrapper/PlateWrapper';
import { useEditorResize } from '../hooks';

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
    const { editorRef, editorWidth } = useEditorResize();

    const value = useMemo(() => ({ editorWidth, editorRef }), [editorWidth, editorRef]);

    return (
        <EditorResizeContext.Provider value={value}>
            <PlateWrapper ref={editorRef}>{children}</PlateWrapper>
        </EditorResizeContext.Provider>
    );
};
