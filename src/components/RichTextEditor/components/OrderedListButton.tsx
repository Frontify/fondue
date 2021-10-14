import React from "react";
import IconListNumbers from "@elements/Icon/Generated/IconListNumbers";
import { IconSize } from "@elements/Icon/IconSize";
import createBlockStyleButton from "../utilities/createBlockStyleButton";

export const OrderedListButton = createBlockStyleButton({
    blockType: "ordered-list-item",
    children: <IconListNumbers size={IconSize.Size12} />,
});
