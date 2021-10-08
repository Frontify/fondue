import React from "react";
import IconListBullets from "@elements/Icon/Generated/IconListBullets";
import { IconSize } from "@elements/Icon/IconSize";
import createBlockStyleButton from "../utilities/createBlockStyleButton";

export const UnorderedListButton = createBlockStyleButton({
    blockType: "unordered-list-item",
    children: <IconListBullets size={IconSize.Size16} />,
});
