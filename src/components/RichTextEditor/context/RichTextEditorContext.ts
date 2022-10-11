import { createContext, useContext } from 'react';
import { DesignTokens } from '../types';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';
import { Position } from '../EditorPositioningWrapper';

type RichTextEditorContextProps = {
    designTokens: DesignTokens;
    position: Position;
};

export const RichTextEditorContext = createContext<RichTextEditorContextProps>({
    designTokens: defaultDesignTokens,
    position: Position.FLOATING,
});

export const useRichTextEditorContext = () => useContext(RichTextEditorContext);
