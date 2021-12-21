/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ActionMenu } from "@components/Menu/ActionMenu/ActionMenu";
import { ActionMenuBlock, MenuStyle } from "@components/Menu/types";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { useActor } from "@xstate/react";
import React, { FC } from "react";
import { SECTIONS } from "./sections";
import { DropdownState, LinkChooserState } from "./state/machine";
import { SectionActionMenuProps } from "./types";

export const SectionActionMenu: FC<SectionActionMenuProps> = ({ machineService }) => {
    const [{ matches }, send] = useActor(machineService);

    const sectionMenuBlocks: ActionMenuBlock[] = [
        {
            id: "Actions",
            menuItems: SECTIONS.map((section) => ({
                ...section,
                size: MenuItemContentSize.Small,
                selectionIndicator: SelectionIndicatorIcon.CaretRight,
                onClick: () => send(`GO_TO_${section.sectionId}`),
            })),
        },
    ];

    return (
        <>
            {matches(`${LinkChooserState.Focused}.${DropdownState.Default}`) && (
                // TODO fix focus issues with ActionMenu (blurs SearchInput on hover)
                <ActionMenu menuBlocks={sectionMenuBlocks} style={MenuStyle.WithoutBorder} />
            )}
        </>
    );
};
