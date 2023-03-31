/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';
import { Popper } from '@components/Popper';
import { PopperPlacement, PopperProps } from '@components/Popper/types';
import { CONTAINER_CLASSES } from '@utilities/overlayStyle';

export type PopoverProps = {
    'data-test-id'?: string;
} & PopperProps;

const Trigger = ({ children }: { children: ReactElement }) => {
    return children;
};

const Content = ({ children }: { children?: ReactNode }) => {
    return <>{children}</>;
};

export const Popover = ({
    children,
    open,
    placement = PopperPlacement.BottomStart,
    offset = [0, 8],
    flip = false,
    enablePortal = false,
    'data-test-id': dataTestId = 'fondue-popover',
}: PopoverProps) => {
    return (
        <Popper open={open} placement={placement} offset={offset} flip={flip} enablePortal={enablePortal}>
            {Children.map(children, (child) => {
                if (isValidElement(child) && typeof child.type === 'function') {
                    const { name } = child.type;

                    if (name === Trigger.name) {
                        return <Popper.Reference>{cloneElement(child, { ...child.props })}</Popper.Reference>;
                    }

                    if (name === Content.name) {
                        return (
                            <Popper.Content>
                                <div data-test-id={dataTestId} className={CONTAINER_CLASSES}>
                                    {cloneElement(child, { ...child.props })}
                                </div>
                            </Popper.Content>
                        );
                    }
                }
            })}
        </Popper>
    );
};
Popover.displayName = 'FonduePopover';
Popover.Trigger = Trigger;
Popover.Content = Content;
