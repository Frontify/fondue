import { EditorState, Entity } from "draft-js";

export const getSelectionEntity = (editorState: EditorState, entityName: string): Entity | null => {
    const currentContent = editorState.getCurrentContent();
    const selectionBlockStartKey = editorState.getSelection().getStartKey();
    const selectionBlock = currentContent.getBlockForKey(selectionBlockStartKey);

    const selectionBlockStartOffset = editorState.getSelection().getStartOffset();
    const selectionBlockEndOffset = editorState.getSelection().getEndOffset();

    let entity = null;

    selectionBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return entityKey !== null && currentContent.getEntity(entityKey).getType() === entityName;
        },
        (start: number, end: number) => {
            if (start <= selectionBlockStartOffset && selectionBlockEndOffset <= end) {
                const entityKey = selectionBlock.getEntityAt(start);
                entity = currentContent.getEntity(entityKey);
            }
        },
    );

    return entity;
};
