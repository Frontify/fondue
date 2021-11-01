/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { RenderLeafProps } from "slate-react";
import { FormattedText } from "../RichTextEditor";

export enum Styles {
    Bold = "bold",
    Italic = "italic",
    Strikethrough = "strikethrough",
    Underline = "underline",
}

const classMap = {
    [Styles.Bold]: "tw-font-bold",
    [Styles.Italic]: "tw-italic",
    [Styles.Strikethrough]: "tw-line-through",
    [Styles.Underline]: "tw-underline",
};

const getClasses = (text: FormattedText) =>
    Object.entries(classMap).reduce<string[]>((classes, [style, className]) => {
        if (text[style as Styles]) {
            classes.push(className);
        }
        return classes;
    }, []);

export const renderInlineStyles = (props: RenderLeafProps): JSX.Element => {
    return (
        <span {...props.attributes} className={`${getClasses(props.leaf).join(" ")}`}>
            {props.children}
        </span>
    );
};
