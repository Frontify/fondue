/* (c) Copyright Frontify Ltd., all rights reserved. */

import RejectIcon from '@foundation/Icon/Generated/IconCross';
import { IconSize } from '@foundation/Icon/IconSize';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, { FC, ReactNode, cloneElement } from 'react';
import { BadgeStatusIcon } from './BadgeStatusIcon';
import { getCircularSizeClasses, getSizeClasses, getStyleClasses } from './helpers';
import { BadgeEmphasis, BadgeProps, BadgeStyle } from './types';

export const Badge: FC<BadgeProps> = ({
    children,
    status,
    icon,
    style = BadgeStyle.Primary,
    size = 'medium',
    emphasis = BadgeEmphasis.None,
    disabled = false,
    onClick,
    onDismiss,
}) => {
    if (!children && !icon && !status) {
        return null;
    }

    const Container = onClick ? 'button' : 'span';

    const getNodeText = (node: ReactNode): string => {
        if (['string', 'number'].includes(typeof node)) {
            return node as string;
        }
        if (node instanceof Array) {
            return node.map(getNodeText).join('');
        }
        if (node && typeof node === 'object' && 'props' in node) {
            return getNodeText(node.props.children);
        }
        return '';
    };

    const badgeTitle = getNodeText(children);
    const isCircular = !children && !onDismiss && Boolean(status || icon);

    return (
        <div
            className={merge([
                'tw-relative tw-rounded-full tw-inline-flex tw-items-center tw-align-top tw-min-w-0 tw-flex-initial tw-transition-color',
                disabled
                    ? 'tw-bg-box-disabled tw-text-box-disabled-inverse'
                    : getStyleClasses(style, !!onClick, emphasis === BadgeEmphasis.Strong),
            ])}
            data-test-id="badge"
        >
            <Container
                onClick={() => onClick && onClick()}
                className={merge([
                    'tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-select-none tw-flex-initial tw-min-w-0',
                    onClick && !disabled ? 'hover:tw-cursor-pointer' : 'tw-cursor-default',
                    isCircular
                        ? getCircularSizeClasses(size)
                        : getSizeClasses(children, status, icon, size, !!onDismiss),
                    FOCUS_VISIBLE_STYLE,
                ])}
                data-test-id="badge-button"
                title={badgeTitle}
            >
                {status && <BadgeStatusIcon status={status} disabled={disabled} />}
                {icon && (
                    <span
                        data-test-id="badge-icon"
                        className={merge([disabled && 'tw-opacity-30', 'tw-flex-none tw-leading-none', 'tw-pr-1'])}
                    >
                        {cloneElement(icon, { size: IconSize.Size16 })}
                    </span>
                )}
                {children && (
                    <span className="tw-text-center tw-text-xxs tw-font-sans tw-font-normal tw-truncate tw-px-0.5">
                        {children}
                    </span>
                )}
            </Container>
            {onDismiss && (
                <button
                    type="button"
                    data-test-id="badge-dismiss"
                    className={merge([
                        'tw-absolute tw-rounded tw-leading-4',
                        FOCUS_VISIBLE_STYLE,
                        size === 'medium' ? 'tw-right-1.5' : 'tw-right-1',
                    ])}
                    onClick={() => onDismiss()}
                    aria-label={`Dismiss ${badgeTitle}`}
                >
                    <RejectIcon size={IconSize.Size16} />
                </button>
            )}
        </div>
    );
};
Badge.displayName = 'FondueBadge';
