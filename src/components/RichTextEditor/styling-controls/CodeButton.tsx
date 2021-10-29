/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconSnippet from "@foundation/Icon/Generated/IconSnippet";
import { IconSize } from "@foundation/Icon/IconSize";
import React, { FC } from "react";
import { BlockStyleButton } from "../BlockStyleButton";
import { BlockStyleTypes } from "../BlockStyles";

export const CodeButton: FC = () => (
    <BlockStyleButton blockType={BlockStyleTypes.Code}>
        <IconSnippet size={IconSize.Size16} />
    </BlockStyleButton>
);
