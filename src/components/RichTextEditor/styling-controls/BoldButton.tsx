/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconBold from "@foundation/Icon/Generated/IconBold";
import { IconSize } from "@foundation/Icon/IconSize";
import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";
import { InlineStyles } from "../renderer/renderInlineStyles";

export const BoldButton: FC = () => (
    <InlineStyleButton style={InlineStyles.Bold}>
        <IconBold size={IconSize.Size16} />
    </InlineStyleButton>
);
