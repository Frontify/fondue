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

    const Container = onClick ? 'a' : 'span';

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
        <Container
            onClick={() => onClick && onClick()}
            className={merge([
                'tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-transition-color tw-select-none tw-flex-initial tw-min-w-0 tw-align-top',
                disabled
                    ? 'tw-bg-box-disabled tw-text-box-disabled-inverse'
                    : getStyleClasses(style, !!onClick, emphasis === BadgeEmphasis.Strong),
                onClick && !disabled ? 'hover:tw-cursor-pointer' : 'tw-cursor-default',
                isCircular ? getCircularSizeClasses(size) : getSizeClasses(children, status, icon, size),
            ])}
            data-test-id="badge"
            title={badgeTitle}
        >
            {status && <BadgeStatusIcon status={status} disabled={disabled} />}
            {icon && (
                <span
                    data-test-id="badge-icon"
                    className={merge([disabled && 'tw-opacity-30', 'tw-flex-none tw-leading-none'])}
                >
                    {cloneElement(icon, { size: IconSize.Size16 })}
                </span>
            )}
            {children && (
                <span className="tw-text-center tw-text-xxs tw-font-sans tw-font-normal tw-truncate tw-px-0.5">
                    {children}
                </span>
            )}
            {onDismiss && (
                <button
                    type="button"
                    data-test-id="badge-dismiss"
                    className={merge(['tw-leading-4', 'tw--mx-0.5 tw-rounded', FOCUS_VISIBLE_STYLE])}
                    onClick={(event) => {
                        event.stopPropagation();
                        onDismiss();
                    }}
                >
                    <RejectIcon size={IconSize.Size16} />
                </button>
            )}
        </Container>
    );
};
