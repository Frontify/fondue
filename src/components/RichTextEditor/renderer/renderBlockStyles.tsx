/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { DefaultElement, RenderElementProps } from "slate-react";

export enum BlockStyleTypes {
    Paragraph = "paragraph",
    UnorderedList = "unordered-list",
    OrderedList = "ordered-list",
    ListItem = "list-item",
    Link = "link",
}

export enum TextAlignTypes {
    None = "align-none",
    AlignJustify = "align-justify",
    AlignLeft = "align-left",
    AlignCenter = "align-center",
    AlignRight = "align-right",
}

export const textAlignClassMap: Record<TextAlignTypes, string> = {
    [TextAlignTypes.None]: "",
    [TextAlignTypes.AlignJustify]: "tw-text-justify",
    [TextAlignTypes.AlignLeft]: "tw-text-left",
    [TextAlignTypes.AlignCenter]: "tw-text-center",
    [TextAlignTypes.AlignRight]: "tw-text-right",
};

export const renderBlockStyles = (props: RenderElementProps): JSX.Element => {
    switch (props.element.type) {
        case BlockStyleTypes.Paragraph:
            const textAlign = props.element.properties?.textAlign;
            return (
                <p {...props.attributes} className={textAlign ? textAlignClassMap[textAlign] : ""}>
                    {props.children}
                </p>
            );
        case BlockStyleTypes.OrderedList:
            return (
                <ol {...props.attributes} className="tw-list-decimal tw-list-inside">
                    {props.children}
                </ol>
            );
        case BlockStyleTypes.UnorderedList:
            return (
                <ul {...props.attributes} className="tw-list-disc tw-list-inside">
                    {props.children}
                </ul>
            );
        case BlockStyleTypes.ListItem:
            return <li {...props.attributes}>{props.children}</li>;
        case BlockStyleTypes.Link:
            return (
                <a href={props.element.url} rel="noreferrer" target="_blank" {...props.attributes}>
                    {props.children}
                </a>
            );
        default:
            return <DefaultElement {...props} />;
    }
};
