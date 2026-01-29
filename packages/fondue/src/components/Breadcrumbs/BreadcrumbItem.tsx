/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBreadcrumbItem } from '@react-aria/breadcrumbs';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { type ReactElement, useRef } from 'react';

import { getItemElementType } from '@utilities/elements';
import { FOCUS_STYLE_NO_OFFSET } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

import { type Breadcrumb } from './Breadcrumbs';

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

/*
 * @deprecated This type is deprecated and will be removed in the next major version.
 */
type BreadcrumbItemProps = Pick<Breadcrumb, 'label' | 'link' | 'onClick' | 'decorator'> & {
    showSeparator: boolean;
    children?: ReactElement;
    'data-test-id'?: string;
};

/**
 * @deprecated This component is deprecated and will be removed in the next major version.
 */
export const BreadcrumbItem = ({
    decorator,
    label,
    link,
    onClick,
    showSeparator,
    children,
    'data-test-id': dataTestId = 'breadcrumb',
}: BreadcrumbItemProps): ReactElement => {
    const ref = useRef(null);

    const Element = getItemElementType(link, onClick);
    const isInteractive = Element !== 'span';

    const { itemProps } = useBreadcrumbItem(
        {
            isCurrent: false,
            children: label,
            elementType: Element,
        },
        ref,
    );

    const { isFocusVisible, focusProps } = useFocusRing();

    const elementTypeProps = {
        a: { href: link },
        button: { onClick, type: 'button' as const },
        span: { tabIndex: -1 },
    };
    const props = isInteractive
        ? mergeProps(itemProps, focusProps, elementTypeProps[Element])
        : elementTypeProps[Element];

    const classNames = merge([
        'tw-flex tw-gap-x-1 tw-items-center tw-leading-4 tw-h-6 tw-whitespace-pre-wrap tw-rounded',
        isInteractive && isFocusVisible && FOCUS_STYLE_NO_OFFSET,
    ]);

    return (
        <li
            className={merge([
                'tw-flex tw-items-center tw-text-text-weak tw-text-xs tw-transition-colors',
                isInteractive && 'hover:tw-text-text',
            ])}
            data-test-id={`${dataTestId}-item`}
        >
            {children ?? (
                // eslint-disable-next-line react-hooks/static-components
                <Element ref={ref} {...props} className={classNames}>
                    {decorator}
                    {label}
                </Element>
            )}
            {showSeparator && <Separator />}
        </li>
    );
};
BreadcrumbItem.displayName = 'FondueBreadcrumbItem';
