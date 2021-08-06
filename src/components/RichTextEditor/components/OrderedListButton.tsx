import React from "react";
import IconOrderedList from "@elements/Icon/Generated/IconOrderedList";
import { IconSize } from "@elements/Icon/IconSize";
import createBlockStyleButton from "../utilities/createBlockStyleButton";

export const OrderedListButton = createBlockStyleButton({
    blockType: "ordered-list-item",
    children: <IconOrderedList size={IconSize.Size12} />,
});
