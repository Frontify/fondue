/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconUnderline from "@elements/Icon/Generated/IconUnderline";
import { IconSize } from "@elements/Icon/IconSize";
import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";

export const UnderlineButton: FC = () => (
    <InlineStyleButton style="UNDERLINE">
        <IconUnderline size={IconSize.Size12} />
    </InlineStyleButton>
);
