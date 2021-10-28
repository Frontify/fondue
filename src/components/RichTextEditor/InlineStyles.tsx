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
    const classes = [];
    if (text.bold) {
        classes.push(classMap[Styles.Bold]);
    }
    if (text.italic) {
        classes.push(classMap[Styles.Italic]);
    }
    if (text.strikethrough) {
        classes.push(classMap[Styles.Strikethrough]);
    }
    return classes;
};

export const InlineStyles: FC<RenderLeafProps> = (props) => {
    return (
        <span {...props.attributes} className={`${getClasses(props.leaf).join(" ")}`}>
            {props.children}
        </span>
    );
};
