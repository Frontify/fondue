/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useRef } from 'react';
import { useBreadcrumbItem } from '@react-aria/breadcrumbs';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import { getItemElementType } from '@utilities/elements';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

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
    'data-test-id'?: string;
};

export const BreadcrumbItem = ({
    label,
    link,
    onClick,
    showSeparator,
    'data-test-id': dataTestId = 'breadcrumb',
}: BreadcrumbItemProps): ReactElement => {
    const ref = useRef(null);

    const Element = getItemElementType(link, onClick);

    const { itemProps } = useBreadcrumbItem(
        {
            isCurrent: false,
            children: label,
            elementType: Element,
        },
        ref,
    );

    const { isFocusVisible, focusProps } = useFocusRing();

    const elementTypeProps = { a: { href: link }, button: { onClick, type: 'button' as const }, span: {} };
    const props = mergeProps(itemProps, focusProps, elementTypeProps[Element]);

    return (
        <li
            className="tw-flex tw-items-center tw-text-text-weak hover:tw-text-text tw-text-xs tw-transition-colors"
            data-test-id={`${dataTestId}-item`}
        >
            <Element ref={ref} {...props} className={merge(['tw-outline-none', isFocusVisible && FOCUS_STYLE])}>
                {label}
            </Element>
            {showSeparator && <Separator />}
        </li>
    );
};
BreadcrumbItem.displayName = 'FondueBreadcrumbItem';
