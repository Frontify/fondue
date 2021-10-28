/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconUnderline from "@foundation/Icon/Generated/IconUnderline";
import { IconSize } from "@foundation/Icon/IconSize";
import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";
import { Styles } from "../InlineStyles";

export const UnderlineButton: FC = () => (
    <InlineStyleButton style={Styles.Underline}>
        <IconUnderline size={IconSize.Size12} />
    </InlineStyleButton>
);
