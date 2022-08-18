import { createContext, useContext } from 'react';
import { DesignTokens, Position } from '../types';
import { defaultDesignTokens } from '../utils/defaultDesignTokens';
import { ToolbarPositioningComponent } from '../Abstract';

type RichTextEditorContextProps = {
    designTokens: DesignTokens;
    ToolbarPositioning: typeof ToolbarPositioningComponent[Position.FLOATING];
};

export const RichTextEditorContext = createContext<RichTextEditorContextProps>({
    designTokens: defaultDesignTokens,
    ToolbarPositioning: ToolbarPositioningComponent[Position.FLOATING],
});

export const useRichTextEditorContext = () => {
    const context = useContext(RichTextEditorContext);
    if (!context) {
        throw new Error('useRichTextEditorContext must be used within a RichTextEditorContext');
    }
    return context;
};
