/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor } from "@udecode/plate";

export const clearEditor = ({ children, apply }: PlateEditor) => {
    children.forEach((node) => apply({ type: "remove_node", path: [0], node }));
};
//c
