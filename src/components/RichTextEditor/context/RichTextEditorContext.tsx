/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, ReactNode, createContext, useContext } from 'react';
import { Position, getEditorWrapperClassNames } from '../EditorPositioningWrapper';
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
    value: {
        styles: Record<string, CSSProperties>;
        position: Position;
        border: boolean;
        editorId: string;
    };
};

export const RichTextEditorProvider = ({ children, value }: RichTextEditorProviderProps) => {
    const { styles, position, border, editorId } = value;

    const state = {
        styles,
        editorId,
        position,
        wrapperClassNames: getEditorWrapperClassNames(position, border),
    };

    return (
        <RichTextEditorContext.Provider value={state}>
            <EditorResizeContextProvider>{children}</EditorResizeContextProvider>
        </RichTextEditorContext.Provider>
    );
};
