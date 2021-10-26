/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconItalic from "src/foundation/Icon/Generated/IconItalic";
import { IconSize } from "src/foundation/Icon/IconSize";
import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";

export const ItalicButton: FC = () => (
    <InlineStyleButton style="ITALIC">
        <IconItalic size={IconSize.Size16} />
    </InlineStyleButton>
);
