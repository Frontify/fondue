/* (c) Copyright Frontify Ltd., all rights reserved. */

export type SelectSlotProps = {
    children?: React.ReactNode;
    name: 'menu' | 'left' | 'right';
};

export const SelectSlot = ({ children, name }: SelectSlotProps) => {
    return <div data-slot-name={name}>{children}</div>;
};
