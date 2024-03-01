/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, ReactNode, createContext, useContext, useMemo } from 'react';
import { Position, getEditorWrapperClassNames } from '../components/EditorPositioningWrapper';
import { EditorResizeContextProvider } from './EditorResizeContext';
import { defaultStyles } from '../utils';

export type RichTextEditorContextProps = {
    styles: Record<string, CSSProperties>;
    position: Position;
    wrapperClassNames: string;
    editorId: string;
};

export const RichTextEditorContext = createContext<RichTextEditorContextProps>({
    styles: defaultStyles,
    position: Position.FLOATING,
    wrapperClassNames: '',
    editorId: '',
});
export const useRichTextEditorContext = () => useContext(RichTextEditorContext);

type RichTextEditorProviderProps = {
    children: ReactNode;
    styles: Record<string, CSSProperties>;
    position: Position;
    border: boolean;
    editorId: string;
};

export const RichTextEditorProvider = ({
    children,
    styles,
    position,
    border,
    editorId,
}: RichTextEditorProviderProps) => {
    const state = useMemo(
        () => ({
            styles,
            editorId,
            position,
            wrapperClassNames: getEditorWrapperClassNames(position, border),
        }),
        [styles, editorId, position, border],
    );

    return (
        <RichTextEditorContext.Provider value={state}>
            <EditorResizeContextProvider>{children}</EditorResizeContextProvider>
        </RichTextEditorContext.Provider>
    );
};
