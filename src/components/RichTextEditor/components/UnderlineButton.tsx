import React from "react";
import IconUnderline from "@elements/Icon/Generated/IconUnderline";
import { IconSize } from "@elements/Icon/IconSize";
import createInlineStyleButton from "../utilities/createInlineStyleButton";

export const UnderlineButton = createInlineStyleButton({
    style: "UNDERLINE",
    children: <IconUnderline size={IconSize.Size12} />,
});
