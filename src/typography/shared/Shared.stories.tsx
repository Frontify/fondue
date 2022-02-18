/* (c) Copyright Frontify Ltd., all rights reserved. */

export const SharedTypographyArgTypes = {
    overflow: {
        options: ["ellipsis", "clip", "visible", "truncate"],
        control: { type: "select" },
    },
    whitespace: {
        options: ["nowrap", "pre-wrap", "pre", "pre-line", "normal"],
        control: { type: "select" },
    },
    display: {
        options: ["block", "inline-block", "none", "inline"],
        control: { type: "select" },
    },
    wordBreak: {
        options: ["break-all", "break-words", "normal"],
        control: { type: "select" },
    },
    decoration: {
        options: ["underline", "line-through", "none"],
        control: { type: "select" },
    },
};
