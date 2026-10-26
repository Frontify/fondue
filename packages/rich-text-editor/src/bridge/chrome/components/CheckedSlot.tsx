/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { IconCheckMark } from '@frontify/fondue-icons';

/** The check mark of a checked menu row, so its state shows by more than colour. */
export const CheckedSlot = () => (
    <Dropdown.Slot name="right">
        <IconCheckMark size={16} aria-hidden />
    </Dropdown.Slot>
);
CheckedSlot.displayName = 'CheckedSlot';
