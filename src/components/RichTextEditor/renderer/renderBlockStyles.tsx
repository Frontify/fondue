import React from "react";
import { DefaultElement, RenderElementProps } from "slate-react";

export enum BlockStyleTypes {
    Paragraph = "paragraph",
    Code = "code",
    UnorderedList = "unordered-list",
    OrderedList = "ordered-list",
    ListItem = "list-item",
}

export const renderBlockStyles = (props: RenderElementProps): JSX.Element => {
    switch (props.element.type) {
        case BlockStyleTypes.Paragraph:
            return <p {...props.attributes}>{props.children}</p>;
        case BlockStyleTypes.Code:
            return (
                <pre className="tw-border tw-rounded tw-text-sm tw-bg-black-5 tw-text-violet-90 tw-m-0 tw-px-2 tw-py-1">
                    <code {...props.attributes}>{props.children}</code>
                </pre>
            );
        case BlockStyleTypes.OrderedList:
            return <ol {...props.attributes}>{props.children}</ol>;
        case BlockStyleTypes.UnorderedList:
            return <ul {...props.attributes}>{props.children}</ul>;
        case BlockStyleTypes.ListItem:
            return <li {...props.attributes}>{props.children}</li>;
        default:
            return <DefaultElement {...props} />;
    }
};
