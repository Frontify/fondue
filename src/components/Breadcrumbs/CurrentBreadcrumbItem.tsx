/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Badge, BadgeProps } from '@components/Badge';
import { useBreadcrumbItem } from '@react-aria/breadcrumbs';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { FOCUS_STYLE } from '@utilities/focus';
import { merge } from '@utilities/merge';
import React, { FC, RefObject, useRef } from 'react';
import { Breadcrumb } from './Breadcrumbs';
import { getItemElementType } from '@utilities/elements';

const ItemWithBadges: FC<{ badges?: BadgeProps[] }> = ({ badges, children }) => (
    <span className="tw-inline-flex tw-gap-x-2 tw-items-center">
        {children}

        {badges?.map(({ children: badge, ...props }, index) => (
            <Badge {...props} key={`breadcrumb-badge-${index}`}>
                {badge}
            </Badge>
        ))}
    </span>
);

type CurrentBreadcrumbItemProps = Breadcrumb;

export const CurrentBreadcrumbItem: FC<CurrentBreadcrumbItemProps> = ({
    label,
    badges,
    bold,
    decorator,
    link,
    onClick,
}) => {
    const ref = useRef<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement | null>(null);
    const contentElementType = getItemElementType(link, onClick);
    const { itemProps } = useBreadcrumbItem(
        {
            isCurrent: true,
            children: label,
            elementType: contentElementType,
        },
        ref,
    );

    const classNames = merge([decorator && 'tw-flex tw-gap-x-1 tw-items-start tw-py-1', bold && 'tw-font-bold']);
    const { isFocusVisible, focusProps } = useFocusRing();
    const props = mergeProps(itemProps, focusProps);

    return (
        <li
            className="tw-w-full tw-inline-flex tw-align-middle tw-mt-1 tw-gap-x-1 tw-text-m tw-text-black dark:tw-text-white"
            data-test-id="breadcrumb-item"
        >
            {contentElementType === 'a' && (
                <ItemWithBadges badges={badges}>
                    <a
                        ref={ref as RefObject<HTMLAnchorElement>}
                        {...props}
                        href={link}
                        className={merge([classNames, isFocusVisible ? FOCUS_STYLE : ''])}
                    >
                        {decorator}
                        <span className={merge(['tw-leading-4', bold ? 'tw-font-bold' : ''])}>{label}</span>
                    </a>
                </ItemWithBadges>
            )}
            {contentElementType === 'button' && (
                <ItemWithBadges badges={badges}>
                    <button
                        ref={ref as RefObject<HTMLButtonElement>}
                        {...props}
                        type="button"
                        onClick={onClick}
                        className={merge(['tw-leading-4', classNames, isFocusVisible ? FOCUS_STYLE : ''])}
                    >
                        {decorator}
                        {label}
                    </button>
                </ItemWithBadges>
            )}
            {contentElementType === 'span' && (
                <>
                    {decorator}
                    <ItemWithBadges badges={badges}>
                        <span
                            ref={ref as RefObject<HTMLSpanElement>}
                            {...props}
                            className={merge([
                                'tw-leading-4 tw-py-1 ',
                                bold && 'tw-font-bold',
                                isFocusVisible && FOCUS_STYLE,
                            ])}
                        >
                            {label}
                        </span>
                    </ItemWithBadges>
                </>
            )}
        </li>
    );
};
CurrentBreadcrumbItem.displayName = 'FondueCurrentBreadcrumbItem';
