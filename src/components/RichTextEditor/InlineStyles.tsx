import React, { FC } from "react";
import { RenderLeafProps } from "slate-react";
import { FormattedText } from "./RichTextEditor";

export enum Styles {
    Bold = "bold",
    Italic = "italic",
    Strikethrough = "strikethrough",
}

const classMap = {
    [Styles.Bold]: "tw-font-bold",
    [Styles.Italic]: "tw-italic",
    [Styles.Strikethrough]: "tw-line-through",
};

const getClasses = (text: FormattedText) => {
    let classes = "";
    if (text.bold) {
        classes += classMap[Styles.Bold];
    }
    if (text.italic) {
        classes += classMap[Styles.Italic];
    }
    if (text.strikethrough) {
        classes += classMap[Styles.Strikethrough];
    }
    return classes;
};

export const InlineStyles: FC<RenderLeafProps> = (props) => {
    return (
        <span {...props.attributes} className={`${getClasses(props.leaf)}`}>
            {props.children}
        </span>
    );
};
