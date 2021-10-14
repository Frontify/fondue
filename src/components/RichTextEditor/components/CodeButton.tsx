import React from "react";
import IconSnippet from "@elements/Icon/Generated/IconSnippet";
import { IconSize } from "@elements/Icon/IconSize";
import createInlineStyleButton from "../utilities/createInlineStyleButton";

export const CodeButton = createInlineStyleButton({
    style: "CODE",
    children: <IconSnippet size={IconSize.Size16} />,
});
