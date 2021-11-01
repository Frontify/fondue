import React from "react";
import { DefaultElement, RenderElementProps } from "slate-react";

export enum BlockStyleTypes {
    Paragraph = "paragraph",
    Code = "code",
    UnorderedList = "unordered-list",
    OrderedList = "ordered-list",
    ListItem = "list-item",
    Link = "link",
}

export const renderBlockStyles = (props: RenderElementProps): JSX.Element => {
    switch (props.element.type) {
        case BlockStyleTypes.Paragraph:
            return <p {...props.attributes}>{props.children}</p>;
        case BlockStyleTypes.Code:
            return (
                <pre
                    {...props.attributes}
                    className="tw-border tw-rounded tw-text-sm tw-bg-black-5 tw-text-violet-90 tw-m-0 tw-px-2 tw-py-1"
                >
                    <code>{props.children}</code>
                </pre>
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
