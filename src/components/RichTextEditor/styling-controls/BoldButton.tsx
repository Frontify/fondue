import React, { FC } from "react";
import IconBold from "@elements/Icon/Generated/IconBold";
import { IconSize } from "@elements/Icon/IconSize";
import { InlineStyleButton } from "../InlineStyleButton";

export const BoldButton: FC = () => (
    <InlineStyleButton style="BOLD">
        <IconBold size={IconSize.Size16} />
    </InlineStyleButton>
);
