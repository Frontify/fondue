/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFocusRing } from '@react-aria/focus';
import { type MouseEvent, type ReactElement, cloneElement } from 'react';

import { IconSize } from '@foundation/Icon/IconSize';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

export type RadioPillProps = {
    label: string;
    active: boolean;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    icon?: ReactElement;
    'data-test-id'?: string;
};

export const RadioPill = ({
    label,
    active,
    icon,
    onClick,
    'data-test-id': dataTestId = 'radio-pill',
}: RadioPillProps): ReactElement => {
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <button
            data-test-id={dataTestId}
            type="button"
            className={merge([
                'tw-inline-flex tw-items-center tw-rounded-full tw-text-xs tw-px-2 tw-py-1',
                active
                    ? 'dark:tw-bg-black-5 dark:tw-text-black-100 tw-bg-black-100 tw-text-white'
                    : 'tw-text-black-80 dark:tw-text-black-40',
                isFocusVisible && FOCUS_STYLE,
                onClick ? 'tw-cursor-pointer' : 'tw-cursor-auto',
            ])}
            onClick={onClick}
            {...focusProps}
        >
            {icon && <span className="tw-mr-1">{cloneElement(icon, { size: IconSize.Size16 })}</span>}
            <span>{label}</span>
        </button>
    );
};
RadioPill.displayName = 'FondueRadioPill';
