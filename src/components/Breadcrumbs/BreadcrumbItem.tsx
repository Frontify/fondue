import { useBreadcrumbItem } from '@react-aria/breadcrumbs';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import React, { FC, RefObject, useRef } from 'react';
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

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({ label, link, onClick, showSeparator }) => {
    const ref = useRef<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement | null>(null);
    const { itemProps } = useBreadcrumbItem(
        {
            isCurrent: false,
            children: label,
            elementType: link ? 'a' : onClick ? 'button' : 'span',
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
            {link ? (
                <a
                    ref={ref as RefObject<HTMLAnchorElement>}
                    {...props}
                    href={link}
                    className={isFocusVisible ? FOCUS_STYLE : ''}
                >
                    {label}
                </a>
            ) : onClick ? (
                <button
                    ref={ref as RefObject<HTMLButtonElement>}
                    type="button"
                    {...props}
                    onClick={onClick}
                    className={isFocusVisible ? FOCUS_STYLE : ''}
                >
                    {label}
                </button>
            ) : (
                <span ref={ref as RefObject<HTMLSpanElement>} {...props} className={isFocusVisible ? FOCUS_STYLE : ''}>
                    {label}
                </span>
            )}
            {showSeparator && <Separator />}
        </li>
    );
};
