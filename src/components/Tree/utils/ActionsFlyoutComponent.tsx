import React, { useState } from 'react';
import { Flyout } from '@components/Flyout';
import { Button, ButtonSize, ButtonStyle } from '@components/Button';
import { IconActions, IconSize } from '@foundation/Icon';
import { ActionMenu } from '@components/ActionMenu/ActionMenu';
import { mockActionMenuBlocks } from './mocks';

export const ActionsFlyoutComponent = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
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
                    onClick={handleClick}
                    style={ButtonStyle.Secondary}
                    icon={<IconActions size={IconSize.Size12} />}
                    size={ButtonSize.Small}
                />
            }
        >
            <ActionMenu menuBlocks={mockActionMenuBlocks} />
        </Flyout>
    );
};
