/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Editor } from "slate";

export const clearEditor = ({ children, apply }: Editor): void =>
    children.forEach((node) => apply({ type: "remove_node", path: [0], node }));
