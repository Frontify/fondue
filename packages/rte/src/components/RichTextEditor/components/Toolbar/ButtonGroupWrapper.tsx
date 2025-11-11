/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ButtonGroupProps } from './types';

export const ButtonGroupWrapper = ({ index, children }: ButtonGroupProps) => (
    <div data-test-id={`toolbar-group-${index}`} className="tw-flex tw-items-center tw-h-9 tw-p-2">
        {children}
    </div>
);
