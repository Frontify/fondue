/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Editor } from "slate";

export const clearEditor = (editor: Editor): void => {
    const children = [...editor.children];

    for (let i = 0; i < children.length; i++) {
        const node = children[i];
        editor.apply({ type: "remove_node", path: [0], node });
    }
};
