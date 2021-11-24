/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { RenderLeafProps } from "slate-react";
import { FormattedText } from "../RichTextEditor";

export enum InlineStyles {
    Bold = "bold",
    Italic = "italic",
    Strikethrough = "strikethrough",
    Underline = "underline",
    Code = "code",
}

export const classMap = {
    [InlineStyles.Bold]: "tw-font-bold",
    [InlineStyles.Italic]: "tw-italic",
    [InlineStyles.Strikethrough]: "tw-line-through",
    [InlineStyles.Underline]: "tw-underline",
    [InlineStyles.Code]: "tw-table-cell tw-rounded tw-text-xs tw-bg-black-5 tw-text-violet-90 tw-m-0 tw-px-2 tw-py-0.5",
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
