/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconListNumbers from "@foundation/Icon/Generated/IconListNumbers";
import { IconSize } from "@foundation/Icon/IconSize";
import React, { FC } from "react";
import { BlockStyleButton } from "../BlockStyleButton";
import { BlockStyleTypes } from "../renderer/renderBlockStyles";

export const OrderedListButton: FC = () => (
    <BlockStyleButton blockType={BlockStyleTypes.OrderedList}>
        <IconListNumbers size={IconSize.Size12} />
    </BlockStyleButton>
);
