// /* (c) Copyright Frontify Ltd., all rights reserved. */

// import { PlateRenderLeafProps } from "@udecode/plate";
// import React from "react";

// export const classMap: Record<StyleMarks, string> = {
//     [StyleMarks.Bold]: "tw-font-bold",
//     [StyleMarks.Italic]: "tw-italic",
//     [StyleMarks.Strikethrough]: "tw-line-through",
//     [StyleMarks.Underline]: "tw-underline",
//     [StyleMarks.Code]: "tw-table-cell tw-rounded tw-text-xs tw-bg-black-5 tw-text-violet-90 tw-m-0 tw-px-2 tw-py-0.5",
// };

// const getClasses = (text: FormattedText) =>
//     Object.entries(classMap).reduce<string[]>((classes, [style, className]) => {
//         if (text[style as StyleMarks]) {
//             classes.push(className);
//         }
//         return classes;
//     }, []);

// export const renderInlineStyles = (props: PlateRenderLeafProps) => {
//     console.log({ props });
//     return (
//         <span {...props.attributes} className={`${getClasses(props.leaf).join(" ")}`}>
//         <span {...props.attributes}>{props.children}</span>
//     );
// };
