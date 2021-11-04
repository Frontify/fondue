/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconListBullets from "@foundation/Icon/Generated/IconListBullets";
import { IconSize } from "@foundation/Icon/IconSize";
import React, { FC } from "react";
import { BlockStyleButton } from "../BlockStyleButton";

export const UnorderedListButton: FC = () => (
    <BlockStyleButton blockType="unordered-list-item">
        <IconListBullets size={IconSize.Size16} />
    </BlockStyleButton>
);
