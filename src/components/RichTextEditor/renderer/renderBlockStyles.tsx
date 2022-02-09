/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { DefaultElement, RenderElementProps } from "slate-react";

export enum BlockStyleTypes {
    Paragraph = "paragraph",
    UnorderedList = "unordered-list",
    OrderedList = "ordered-list",
    ListItem = "list-item",
    Link = "link",
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
    Custom01 = "custom01",
    Custom02 = "custom02",
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

export const headingTypeClassname = {
    [BlockStyleTypes.H1]: "tw-font-bold tw-text-xxxl",
    [BlockStyleTypes.H2]: "tw-font-bold tw-text-xxl",
    [BlockStyleTypes.H3]: "tw-text-xl",
    [BlockStyleTypes.H4]: "tw-text-lg",
    [BlockStyleTypes.Custom01]: "tw-text-sm",
    [BlockStyleTypes.Custom02]: "tw-text-sm tw-font-sans tw-font-semibold",
};
const getTextAlignClass = (textAlign?: TextAlignTypes) => (textAlign ? textAlignClassMap[textAlign] : "");

export const renderBlockStyles = (props: RenderElementProps): JSX.Element => {
    const textAlign = props.element.properties?.textAlign;
    switch (props.element.type) {
        case BlockStyleTypes.Paragraph:
            return (
                <p {...props.attributes} className={getTextAlignClass(textAlign)}>
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
        case BlockStyleTypes.H1:
            return (
                <h1 {...props.attributes} className={`${headingTypeClassname.h1} ${getTextAlignClass(textAlign)}`}>
                    {props.children}
                </h1>
            );

        case BlockStyleTypes.H2:
            return (
                <h2 {...props.attributes} className={`${headingTypeClassname.h2} ${getTextAlignClass(textAlign)}`}>
                    {props.children}
                </h2>
            );
        case BlockStyleTypes.H3:
            return (
                <h3 {...props.attributes} className={`${headingTypeClassname.h3} ${getTextAlignClass(textAlign)}`}>
                    {props.children}
                </h3>
            );
        case BlockStyleTypes.H4:
            return (
                <h4 {...props.attributes} className={`${headingTypeClassname.h4} ${getTextAlignClass(textAlign)}`}>
                    {props.children}
                </h4>
            );

        case BlockStyleTypes.Custom01:
            return (
                <div
                    {...props.attributes}
                    className={`${headingTypeClassname.custom01} ${getTextAlignClass(textAlign)}`}
                >
                    {props.children}
                </div>
            );
        case BlockStyleTypes.Custom02:
            return (
                <div
                    {...props.attributes}
                    className={`${headingTypeClassname.custom02} ${getTextAlignClass(textAlign)}`}
                >
                    {props.children}
                </div>
            );
        default:
            return <DefaultElement {...props} />;
    }
};
