// /* (c) Copyright Frontify Ltd., all rights reserved. */

// import { CSSProperties } from "react";
// import { BaseEditor } from "slate";
// import { ReactEditor } from "slate-react";

// import { isEditorEmpty } from "@components/RichTextEditor/utils/editor/isEmpty";
// import { getCanvasFontSize, getTextWidth } from "@components/RichTextEditor/utils/getTextWidth";

// export const getMinWidthIfEmpty = (
//     editor: BaseEditor & ReactEditor,
//     placeholder: string,
//     wrapperEl: HTMLDivElement | null,
// ): CSSProperties | undefined => {
//     if (wrapperEl && isEditorEmpty(editor) && placeholder) {
//         return { minWidth: `${getTextWidth(placeholder, getCanvasFontSize(wrapperEl))}px` };
//     }
//     return undefined;
// };
