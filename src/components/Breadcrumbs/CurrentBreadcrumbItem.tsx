/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useRef } from 'react';
import { useBreadcrumbItem } from '@react-aria/breadcrumbs';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import { Badge } from '@components/Badge';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { getItemElementType } from '@utilities/elements';

import { Breadcrumb } from './Breadcrumbs';

type CurrentBreadcrumbItemProps = Breadcrumb;

export const CurrentBreadcrumbItem = ({
    label,
    badges,
    bold,
    decorator,
    link,
    onClick,
    'data-test-id': dataTestId = 'breadcrumb',
}: CurrentBreadcrumbItemProps): ReactElement => {
    const ref = useRef(null);
    const Element = getItemElementType(link, onClick);
    const { itemProps } = useBreadcrumbItem(
        {
            isCurrent: true,
            children: label,
            elementType: Element,
        },
        ref,
    );

    const elementTypeProps = { a: { href: link }, button: { onClick, type: 'button' as const }, span: {} };

    const { isFocusVisible, focusProps } = useFocusRing();
    const props = mergeProps(itemProps, focusProps, elementTypeProps[Element]);

    const classNames = merge([
        'tw-flex tw-gap-x-1 tw-items-center tw-leading-4 tw-h-6 tw-max-w-[100px] tw-whitespace-pre-wrap',
        bold && 'tw-font-bold',
        isFocusVisible && FOCUS_STYLE,
    ]);

    return (
        <li
            className="tw-w-full tw-inline-flex tw-align-middle tw-gap-x-1 tw-text-m tw-text-text tw-items-center"
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
