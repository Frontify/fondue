import IconListBullets from "@elements/Icon/Generated/IconListBullets";
import { IconSize } from "@elements/Icon/IconSize";
import React, { FC } from "react";
import { BlockStyleButton } from "../BlockStyleButton";

export const UnorderedListButton: FC = () => (
    <BlockStyleButton blockType="unordered-list-item">
        <IconListBullets size={IconSize.Size16} />
    </BlockStyleButton>
);
