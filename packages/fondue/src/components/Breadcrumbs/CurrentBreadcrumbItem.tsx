/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBreadcrumbItem } from '@react-aria/breadcrumbs';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { type ReactElement, useRef } from 'react';

import { Badge } from '@components/Badge';
import { getItemElementType } from '@utilities/elements';
import { FOCUS_STYLE_NO_OFFSET } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

import { type Breadcrumb } from './Breadcrumbs';

type CurrentBreadcrumbItemProps = Breadcrumb;

export const CurrentBreadcrumbItem = ({
    label,
    badges,
    bold,
    decorator,
    link,
    onClick,
    activeInline,
    'data-test-id': dataTestId = 'breadcrumb',
}: CurrentBreadcrumbItemProps): ReactElement => {
    const ref = useRef(null);
    const Element = getItemElementType(link, onClick);
    const isInteractive = Element !== 'span';
    const { itemProps } = useBreadcrumbItem(
        {
            isCurrent: true,
            children: label,
            elementType: Element,
        },
        ref,
    );

    const elementTypeProps = {
        a: { href: link },
        button: { onClick, type: 'button' as const },
        span: { tabIndex: -1 },
    };

    const { isFocusVisible, focusProps } = useFocusRing();
    const props = isInteractive
        ? mergeProps(itemProps, focusProps, elementTypeProps[Element])
        : elementTypeProps[Element];

    const classNames = merge([
        'tw-flex tw-gap-x-1 tw-items-center tw-leading-4 tw-h-6 tw-whitespace-pre-wrap tw-font-medium tw-rounded',
        bold && 'tw-font-bold',
        activeInline && 'tw-text-xs',
        isInteractive && isFocusVisible && FOCUS_STYLE_NO_OFFSET,
    ]);

    return (
        <li
            className={merge([
                'tw-align-middle tw-gap-x-1 tw-text-m tw-text-text tw-items-center',
                activeInline ? 'tw-flex tw-items-center' : 'tw-w-full tw-inline-flex',
            ])}
            data-test-id={`${dataTestId}-item`}
        >
            <Element ref={ref} {...props} className={classNames}>
                {decorator}
                {label}
            </Element>
            {badges?.map(({ children: badge, ...props }, index) => (
                <Badge {...props} key={`breadcrumb-badge-${index}`}>
                    {badge}
                </Badge>
            ))}
        </li>
    );
};
CurrentBreadcrumbItem.displayName = 'FondueCurrentBreadcrumbItem';
