/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBreadcrumbItem } from '@react-aria/breadcrumbs';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { getItemElementType } from '@utilities/elements';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, { ReactElement, RefObject, useRef } from 'react';
import { Breadcrumb } from './Breadcrumbs';

const Separator = () => (
    <svg
        aria-hidden="true"
        width="13"
        height="17"
        viewBox="0 0 13 17"
        fill="none"
        className="tw-stroke-current tw-text-black-20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line x1="3.52447" y1="16.0623" x2="8.46874" y2="0.845385" />
    </svg>
);

type BreadcrumbItemProps = Pick<Breadcrumb, 'label' | 'link' | 'onClick'> & {
    showSeparator: boolean;
};

export const BreadcrumbItem = ({ label, link, onClick, showSeparator }: BreadcrumbItemProps): ReactElement => {
    const ref = useRef<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement | null>(null);

    const contentElementType = getItemElementType(link, onClick);

    const { itemProps } = useBreadcrumbItem(
        {
            isCurrent: false,
            children: label,
            elementType: contentElementType,
        },
        ref,
    );
    const { isFocusVisible, focusProps } = useFocusRing();
    const props = mergeProps(itemProps, focusProps);

    return (
        <li
            className="tw-flex tw-items-center tw-text-black-80 hover:tw-text-black-100 tw-text-xs dark:tw-text-black-10 dark:hover:tw-text-black-30 tw-transition-colors"
            data-test-id="breadcrumb-item"
        >
            {contentElementType === 'a' && (
                <a
                    ref={ref as RefObject<HTMLAnchorElement>}
                    {...props}
                    href={link}
                    className={merge(['tw-outline-none', isFocusVisible && FOCUS_STYLE])}
                >
                    {label}
                </a>
            )}
            {contentElementType === 'button' && (
                <button
                    ref={ref as RefObject<HTMLButtonElement>}
                    type="button"
                    {...props}
                    onClick={onClick}
                    className={merge(['tw-outline-none', isFocusVisible && FOCUS_STYLE])}
                >
                    {label}
                </button>
            )}
            {contentElementType === 'span' && (
                <span
                    ref={ref as RefObject<HTMLSpanElement>}
                    {...props}
                    className={merge(['tw-outline-none', isFocusVisible && FOCUS_STYLE])}
                >
                    {label}
                </span>
            )}
            {showSeparator && <Separator />}
        </li>
    );
};
BreadcrumbItem.displayName = 'FondueBreadcrumbItem';
