/* (c) Copyright Frontify Ltd., all rights reserved. */

import { usePlateEditorRef } from "@udecode/plate";

export const clearEditor = () => {
    const editor = usePlateEditorRef();
    const { children, apply } = editor;
    children.forEach((node) => apply({ type: "remove_node", path: [0], node }));
};
//c
