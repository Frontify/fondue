/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItem } from "@components/MenuItem";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { useActor } from "@xstate/react";
import React, { FC, KeyboardEvent } from "react";
import { sections } from "./sections";
import { DropdownState, LinkChooserState } from "./state/machine";
import { SectionActionMenuItemProps, SectionActionMenuProps } from "./types";

export const SectionActionMenu: FC<SectionActionMenuProps> = (props: SectionActionMenuProps) => {
    const { machineService } = props;
    const [{ matches }, send] = useActor(machineService);

    return matches(`${LinkChooserState.Focused}.${DropdownState.Default}`) ? (
        <ul className="tw-py-2">
            {sections.map((section) => (
                <SectionActionMenuItem
                    key={section.id}
                    section={section}
                    onPress={() => {
                        send(`GO_TO_${section.sectionId}`);
                    }}
                />
            ))}
        </ul>
    ) : null;
};

const SectionActionMenuItem: FC<SectionActionMenuItemProps> = ({ section, onPress }) => {
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Space" || event.key === "Enter") {
            onPress(event);
        }
    };

    return (
        <div
            onMouseDown={onPress}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="menuitem"
            key={section.id}
            data-test-id="menu-item"
            className="hover:tw-bg-black-0"
        >
            <MenuItem
                title={section.title}
                selectionIndicator={SelectionIndicatorIcon.CaretRight}
                size={MenuItemContentSize.XSmall}
            />
        </div>
    );
};
