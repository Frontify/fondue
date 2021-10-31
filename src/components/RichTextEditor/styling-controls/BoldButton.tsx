/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconBold from "@foundation/Icon/Generated/IconBold";
import { IconSize } from "@foundation/Icon/IconSize";
import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";
import { Styles } from "../renderer/renderInlineStyles";

export const BoldButton: FC = () => (
    <InlineStyleButton style={Styles.Bold}>
        <IconBold size={IconSize.Size16} />
    </InlineStyleButton>
);
