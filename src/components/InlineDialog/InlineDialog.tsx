/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, ReactNode, cloneElement } from 'react';
import { Popover } from '@components/Popover';

export type InlineDialogProps = {
    children?: ReactNode;
    triggerElement: ReactElement;
    open: boolean;
};

export const InlineDialog = ({ children, triggerElement, open = false }: InlineDialogProps): ReactElement => {
    return (
        <div data-test-id="fondue-inlineDialog">
            <Popover open={open}>
                <Popover.Trigger>{triggerElement && cloneElement(triggerElement)}</Popover.Trigger>
                <Popover.Content>
                    <div className="tw-min-w-0 tw-max-w-[400px]">{children}</div>
                </Popover.Content>
            </Popover>
        </div>
    );
};
