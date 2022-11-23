/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { HTMLAttributes, PropsWithChildren, ReactElement, ReactNode, cloneElement } from 'react';
import { IconSize } from '@foundation/Icon/IconSize';
import { merge } from '@utilities/merge';
import { MenuItemContentSize } from './types';

export type MenuItemContentProps = {
    title?: ReactNode;
    decorator?: ReactElement;
    switchComponent?: ReactElement;
    subtitle?: string;
    size?: MenuItemContentSize;
    ariaProps?: HTMLAttributes<HTMLElement>;
};

/**
 * This is a temporary workaround because for some yet unknown reasons `tailwindcss` in clarify purges the `tw-pr-1.5` class.
 */
const paddingRight: Record<MenuItemContentSize, string> = {
    [MenuItemContentSize.XSmall]: 'tw-pr-1.5',
    [MenuItemContentSize.Small]: 'tw-pr-1.5',
    [MenuItemContentSize.Large]: 'tw-pr-2',
};

export const MenuItemContent = ({
    title,
    decorator,
    switchComponent,
    subtitle,
    ariaProps,
    size = MenuItemContentSize.Small,
    children,
}: PropsWithChildren<MenuItemContentProps>) => (
    <div
        {...ariaProps}
        data-test-id="menu-item-content"
        className="tw-flex tw-box-border tw-items-center tw-font-sans tw-text-s tw-flex-auto tw-min-w-0"
    >
        {decorator && (
            <span className={merge(['tw-shrink-0', paddingRight[size]])} data-test-id="menu-item-decorator">
                {cloneElement(decorator, {
                    size: size === MenuItemContentSize.Large ? IconSize.Size24 : IconSize.Size16,
                })}
            </span>
        )}
        <div className="tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap">
            <div
                data-test-id="menu-item-title"
                className="tw-select-none tw-text-ellipsis tw-overflow-hidden"
                title={typeof title === 'string' ? title : ''}
            >
                {children || title}
            </div>
            {subtitle && size === MenuItemContentSize.Large && (
                <div data-test-id="menu-item-subtitle" className="tw-select-none tw-text-xxs" title={subtitle}>
                    {subtitle}
                </div>
            )}
        </div>
        {switchComponent && (
            <span className={merge(['tw-shrink-0', paddingRight[size]])} data-test-id="menu-item-decorator">
                {switchComponent}
            </span>
        )}
    </div>
);
