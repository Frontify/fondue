/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconItalic from "@foundation/Icon/Generated/IconItalic";
import { IconSize } from "@foundation/Icon/IconSize";
import React, { FC } from "react";
import { InlineStyleButton } from "../InlineStyleButton";

export const ItalicButton: FC = () => (
    <InlineStyleButton style="italic">
        <IconItalic size={IconSize.Size16} />
    </InlineStyleButton>
);
