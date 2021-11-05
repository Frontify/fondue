/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useActor } from "@xstate/react";
import React, { FC, useContext } from "react";
import { DropdownContext } from "../context/dropdownContext";
import { sections } from "../sections";
import { ActionMenu, ActionMenuBlock } from "@components/Menu/ActionMenu/ActionMenu";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { State } from "../state/dropdown/machine";

export const SectionActionMenu: FC = () => {
    const { dropdownMachineRef } = useContext(DropdownContext);

    if (!dropdownMachineRef) return null;

    const [{ matches }, send] = useActor(dropdownMachineRef);

    const sectionMenuBlocks: ActionMenuBlock[] = [
        {
            id: "Actions",
            menuItems: sections.map((section) => ({
                ...section,
                size: MenuItemContentSize.Small,
                selectionIndicator: SelectionIndicatorIcon.CaretRight,
                onClick: () => send(`GO_TO_${section.sectionId}`),
            })),
        },
    ];

    return <>{matches(State.Default) && <ActionMenu menuBlocks={sectionMenuBlocks} noBorder={true} />}</>;
};
