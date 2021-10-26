/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconUnderline from "src/foundation/Icon/Generated/IconUnderline";
import { IconSize } from "src/foundation/Icon/IconSize";
import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";

export const UnderlineButton: FC = () => (
    <InlineStyleButton style="UNDERLINE">
        <IconUnderline size={IconSize.Size12} />
    </InlineStyleButton>
);
