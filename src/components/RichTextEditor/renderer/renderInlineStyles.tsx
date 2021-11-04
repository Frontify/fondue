/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { RenderLeafProps } from "slate-react";
import { FormattedText } from "../RichTextEditor";

export enum InlineStyles {
    Bold = "bold",
    Italic = "italic",
    Strikethrough = "strikethrough",
    Underline = "underline",
}

const classMap = {
    [InlineStyles.Bold]: "tw-font-bold",
    [InlineStyles.Italic]: "tw-italic",
    [InlineStyles.Strikethrough]: "tw-line-through",
    [InlineStyles.Underline]: "tw-underline",
};

const getClasses = (text: FormattedText) =>
    Object.entries(classMap).reduce<string[]>((classes, [style, className]) => {
        if (text[style as InlineStyles]) {
            classes.push(className);
        }
        return classes;
    }, []);

export const renderInlineStyles = (props: RenderLeafProps): JSX.Element => (
    <span {...props.attributes} className={`${getClasses(props.leaf).join(" ")}`}>
        {props.children}
    </span>
);
