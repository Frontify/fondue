/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_PARAGRAPH, MARK_BOLD } from "@udecode/plate";
import React from "react";
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from "./RichTextEditor";

type CreateElementProps = {
    text: string;
    element?: string;
    mark?: string;
};

type LeafType = {
    [key: string]: any;
};

const createElement = ({ text, element = ELEMENT_PARAGRAPH, mark }: CreateElementProps) => {
    const leaf: LeafType = { text };
    if (mark) {
        leaf[mark] = true;
    }
    return {
        type: element,
        children: [leaf],
    };
};

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Rich Text Editor",
    component: RichTextEditorComponent,
    args: {
        placeholder: "Some placeholder",
        readonly: false,
        clear: false,
    },
    argTypes: {
        onTextChange: { action: "onTextChange" },
        onBlur: { action: "onBlur" },
    },
} as Meta;

const value = [
    createElement({ text: "🧱 Elements", element: ELEMENT_H1 }),
    createElement({
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    }),
    createElement({ text: "🔥 Basic Elements", element: ELEMENT_H2 }),
    createElement({ text: "These are the most common elements, known as blocks:" }),
    createElement({ text: "Heading 1", element: ELEMENT_H1 }),
    createElement({ text: "This text is bold.", mark: MARK_BOLD }),
    // createElement("Heading 2", { type: ELEMENT_H2 }),
    // createElement("Heading 3", { type: ELEMENT_H3 }),
    // createElement("Heading 4", { type: ELEMENT_H4 }),
    // createElement("Heading 5", { type: ELEMENT_H5 }),
    // createElement("Heading 6", { type: ELEMENT_H6 }),
    // createElement("Blockquote", { type: ELEMENT_BLOCKQUOTE }),
    // {
    //     type: ELEMENT_CODE_BLOCK,
    //     children: [
    //         {
    //             type: ELEMENT_CODE_LINE,
    //             children: [
    //                 {
    //                     text: "const a = 'Hello';",
    //                 },
    //             ],
    //         },
    //         {
    //             type: ELEMENT_CODE_LINE,
    //             children: [
    //                 {
    //                     text: "const b = 'World';",
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // createElement("💅 Marks", { type: ELEMENT_H1 }),
    // createElement("💧 Basic Marks", { type: ELEMENT_H2 }),
    // createElement(
    //     "The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code.",
    // ),
    // createElement("You can customize the type, the component and the hotkey for each of these."),
    // createElement("This text is bold.", { mark: MARK_BOLD }),
    // createElement("This text is italic.", { mark: MARK_ITALIC }),
    // createElement("This text is underlined.", {
    //     mark: MARK_UNDERLINE,
    // }),
    // {
    //     type: ELEMENT_PARAGRAPH,
    //     children: [
    //         {
    //             text: "This text is bold, italic and underlined.",
    //             [MARK_BOLD]: true,
    //             [MARK_ITALIC]: true,
    //             [MARK_UNDERLINE]: true,
    //         },
    //     ],
    // },
    // createElement("This is a strikethrough text.", {
    //     mark: MARK_STRIKETHROUGH,
    // }),
    // createElement("This is an inline code.", { mark: MARK_CODE }),
];

export const RichTextEditor: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent {...args} />
);
RichTextEditor.args = { value: value };

// export const WithReadonlyState: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
//     <RichTextEditorComponent {...args} />
// );
// WithReadonlyState.args = {
//     readonly: true,
//     value: JSON.stringify([
//         ...value,
//         {
//             type: ELEMENT_PARAGRAPH,
//             children: [createLinkNode("https://git-scm.com/downloads", "Link")],
//         },
//     ]),
// };
// WithReadonlyState.argTypes = { value: { type: "string" } };

// export const RichTextWithHTML: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
//     <RichTextEditorComponent {...args} />
// );
// RichTextWithHTML.args = {
//     value: `
//         <p><strong>bold</strong></p>
//         <p><i>italic</i></p>
//         <p><u>underline</u></p>
//         <p><s>strikethrough</s></p>
//         <p><code>code</code></p>
//         <ul>
//             <li>red</li>
//             <li>blue</li>
//             <li>yellow</li>
//         </ul>
//         <ol>
//             <li>Mix flour, baking powder, sugar, and salt.</li>
//             <li>In another bowl, mix eggs, milk, and oil.</li>
//             <li>Stir both mixtures together.</li>
//             <li>Fill muffin tray 3/4 full.</li>
//             <li>Bake for 20 minutes.</li>
//         </ol>
//     `,
// };
// RichTextWithHTML.argTypes = { value: { type: "string" } };

export const RichTextEditorFlex: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <div className="tw-flex">
        <RichTextEditorComponent {...args} />
    </div>
);
RichTextEditorFlex.argTypes = { value: { type: "string" } };
