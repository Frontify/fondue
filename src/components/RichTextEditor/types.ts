import { ReactElement } from "react";
import { EditorActions } from "./utils/actions";
import { TextStyleType } from "./utils/getTextStyles";

export type ToolbarProps = {
    editorId?: string;
    textStyles?: TextStyleType[];
    actions?: EditorActions[][];
};

export type IconStylingWrapperProps = {
    icon: ReactElement;
};

export type ButtonGroupProps = {
    index: number;
    editorId?: string;
    actions: EditorActions[];
    textStyles?: TextStyleType[];
    className: string;
    onClose: () => void;
    onLoaded: (index: number, width?: number) => void;
};
