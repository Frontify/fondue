import React, {useState} from "react";
import {Flyout} from "@components/Flyout";
import {Button, ButtonSize, ButtonStyle} from "@components/Button";
import {IconActions, IconSize} from "@foundation/Icon";
import {ActionMenu} from "@components/ActionMenu/ActionMenu";
import {ACTION_MENU_BLOCKS} from "@components/Tree/utils/DUMMY_DATA";

export const ActionsFlyoutComponent = () => {
    const [open, setOpen] = useState(false);
    const onClick = () => {
        setOpen(true);
    };

    return (
        <Flyout
            isOpen={open}
            onOpenChange={(isOpen) => setOpen(isOpen)}
            legacyFooter={false}
            hug={false}
            trigger={
                <Button
                    onClick={onClick}
                    style={ButtonStyle.Secondary}
                    icon={<IconActions size={IconSize.Size12} />}
                    size={ButtonSize.Small}
                />
            }
        >
            <ActionMenu
                menuBlocks={ACTION_MENU_BLOCKS}
            />
        </Flyout>
    );
};
