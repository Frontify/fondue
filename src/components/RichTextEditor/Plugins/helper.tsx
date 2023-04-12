/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';
import { ButtonGroupWrapperProps, IconStylingWrapperProps } from './types';

export const IconStylingWrapper = ({ icon }: IconStylingWrapperProps) => (
    <span className="tw-p-2 tw-h-8 tw-justify-center tw-items-center tw-flex">{icon}</span>
);

const buttonRootClassNames =
    'tw-ml-0.5 !tw-text-text-weak hover:!tw-bg-box-selected hover:!tw-text-box-selected-inverse hover:tw-rounded';

export const getButtonClassNames = (isEnabled = true) => ({
    root: isEnabled ? buttonRootClassNames : '!tw-text-text-weak !tw-cursor-not-allowed !tw-opacity-50',
    active: '!tw-bg-box-selected tw-rounded !tw-text-box-selected-inverse',
});
export const buttonStyles = { root: { width: '24px', height: '24px' } };

export const ButtonGroupWrapper = ({ index, children }: ButtonGroupWrapperProps) => (
    <div data-test-id={`toolbar-group-${index}`} className="tw-flex tw-items-center tw-h-9 tw-p-2">
        {children}
    </div>
);

export const ButtonWrapper = ({ children, id }: { children: ReactNode; id: string }) => (
    <div data-plugin-id={id}>{children}</div>
);
