/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconListNumbers from "@elements/Icon/Generated/IconListNumbers";
import { IconSize } from "@elements/Icon/IconSize";
import React, { FC } from "react";
import { BlockStyleButton } from "../BlockStyleButton";

export const OrderedListButton: FC = () => (
    <BlockStyleButton blockType="ordered-list-item">
        <IconListNumbers size={IconSize.Size12} />
    </BlockStyleButton>
);
