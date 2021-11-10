/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ActionMenu, ActionMenuBlock } from "@components/Menu/ActionMenu/ActionMenu";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { useActor } from "@xstate/react";
import React, { FC } from "react";
import { Interpreter, DoneInvokeEvent, Typestate } from "xstate";
import { sections } from "./sections";
import { DropdownState, LinkChooserContext, LinkChooserState } from "./state/link-chooser/machine";

interface SectionActionMenuProps {
    machineService: Interpreter<
        LinkChooserContext,
        any,
        DoneInvokeEvent<LinkChooserContext>,
        Typestate<LinkChooserContext>
    >;
}

export const SectionActionMenu: FC<SectionActionMenuProps> = (props: SectionActionMenuProps) => {
    const { machineService } = props;
    const [{ matches }, send] = useActor(machineService);

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

    return (
        <>
            {matches(`${LinkChooserState.Focused}.${DropdownState.Default}`) && (
                <ActionMenu menuBlocks={sectionMenuBlocks} noBorder={true} />
            )}
        </>
    );
};
