import React from "react";
import IconUnorderedList from "@elements/Icon/Generated/IconUnorderedList";
import { IconSize } from "@elements/Icon/IconSize";
import createBlockStyleButton from "../utilities/createBlockStyleButton";

export const UnorderedListButton = createBlockStyleButton({
    blockType: "unordered-list-item",
    children: <IconUnorderedList size={IconSize.Size16} />,
});
