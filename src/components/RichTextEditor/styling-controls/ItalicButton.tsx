import IconItalic from "@elements/Icon/Generated/IconItalic";
import { IconSize } from "@elements/Icon/IconSize";
import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";

export const ItalicButton: FC = () => (
    <InlineStyleButton style="ITALIC">
        <IconItalic size={IconSize.Size16} />
    </InlineStyleButton>
);
