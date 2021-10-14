import React from "react";
import IconItalic from "@elements/Icon/Generated/IconItalic";
import { IconSize } from "@elements/Icon/IconSize";
import createInlineStyleButton from "../utilities/createInlineStyleButton";

export const ItalicButton = createInlineStyleButton({
    style: "ITALIC",
    children: <IconItalic size={IconSize.Size16} />,
});
