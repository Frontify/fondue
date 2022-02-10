// /* (c) Copyright Frontify Ltd., all rights reserved. */

// import { PlateRenderElementProps } from "@udecode/plate";
// import React from "react";

// export enum TextAlignTypes {
//     None = "align-none",
//     AlignJustify = "align-justify",
//     AlignLeft = "align-left",
//     AlignCenter = "align-center",
//     AlignRight = "align-right",
// }

// export const textAlignClassMap: Record<TextAlignTypes, string> = {
//     [TextAlignTypes.None]: "",
//     [TextAlignTypes.AlignJustify]: "tw-text-justify",
//     [TextAlignTypes.AlignLeft]: "tw-text-left",
//     [TextAlignTypes.AlignCenter]: "tw-text-center",
//     [TextAlignTypes.AlignRight]: "tw-text-right",
// };

// export const renderBlockStyles = (props: PlateRenderElementProps) => {
//     console.log({ props });

//     switch (props.element.type) {
//         case StyleElements.Paragraph:
//             return <p {...props.attributes}>PARAGRAPH {props.children}</p>;
//         case StyleElements.OrderedList:
//             return (
//                 <ol {...props.attributes} className="tw-list-decimal tw-list-inside">
//                     {props.children}
//                 </ol>
//             );
//         case StyleElements.UnorderedList:
//             return (
//                 <ul {...props.attributes} className="tw-list-disc tw-list-inside">
//                     {props.children}
//                 </ul>
//             );
//         case StyleElements.ListItem:
//             return <li {...props.attributes}>{props.children}</li>;
//         case StyleElements.Link:
//             return (
//                 <a href={props.element.url} rel="noreferrer" target="_blank" {...props.attributes}>
//                     {props.children}
//                 </a>
//             );
//         default:
//             return undefined;
//     }
// };
