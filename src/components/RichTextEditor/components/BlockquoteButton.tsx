import React from "react";
import IconQuote from "@elements/Icon/Generated/IconQuote";
import { IconSize } from "@elements/Icon/IconSize";
import createBlockStyleButton from "../utilities/createBlockStyleButton";

export const BlockquoteButton = createBlockStyleButton({
    blockType: "blockquote",
    children: <IconQuote size={IconSize.Size12} />,
});
