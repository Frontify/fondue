import { EditorEventDataTypes, EditorStateData } from "./machine";

export const hasEditorState = (data: EditorEventDataTypes): data is EditorStateData =>
    data && (data as EditorStateData).editorState !== undefined;
