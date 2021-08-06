import React from "react";
import IconBold from "@elements/Icon/Generated/IconBold";
import { IconSize } from "@elements/Icon/IconSize";
import createInlineStyleButton from "../utilities/createInlineStyleButton";

export const BoldButton = createInlineStyleButton({
    style: "BOLD",
    children: <IconBold size={IconSize.Size16} />,
});
