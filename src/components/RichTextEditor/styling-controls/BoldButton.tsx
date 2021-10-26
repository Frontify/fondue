/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import IconBold from "@foundation/Icon/Generated/IconBold";
import { IconSize } from "@foundation/Icon/IconSize";
import { InlineStyleButton } from "../InlineStyleButton";

export const BoldButton: FC = () => (
    <InlineStyleButton style="BOLD">
        <IconBold size={IconSize.Size16} />
    </InlineStyleButton>
);
