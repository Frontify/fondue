import React from "react";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

import { isEditorEmpty } from "@components/RichTextEditor/utils/isEditorEmpty";
import { getCanvasFontSize, getTextWidth } from "@components/RichTextEditor/utils/getTextWidth";

export const setMinWidthIfEmpty = (
    editor: BaseEditor & ReactEditor,
    placeholder: string,
    setWrapperStyle: React.Dispatch<React.SetStateAction<React.CSSProperties | undefined>>,
    wrapperEl: HTMLDivElement | null,
): void => {
    if (isEditorEmpty(editor) && wrapperEl) {
        setWrapperStyle({ minWidth: `${getTextWidth(placeholder, getCanvasFontSize(wrapperEl))}px` });
    } else {
        setWrapperStyle(undefined);
    }
};
