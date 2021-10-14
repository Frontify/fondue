import React from "react";
import IconQuote from "@elements/Icon/Generated/IconQuote";
import { IconSize } from "@elements/Icon/IconSize";
import createBlockStyleButton from "../utilities/createBlockStyleButton";

//TODO: Styling not working: https://app.clickup.com/t/1mjnru0
export const BlockquoteButton = createBlockStyleButton({
    blockType: "blockquote",
    children: <IconQuote size={IconSize.Size12} />,
});
