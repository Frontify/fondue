/* (c) Copyright Frontify Ltd., all rights reserved. */

import RejectIcon from '@foundation/Icon/Generated/IconCross';
import { IconSize } from '@foundation/Icon/IconSize';
import { getColorDisplayValue } from '@utilities/colors';
import { merge } from '@utilities/merge';
import React, { FC, ReactNode, cloneElement } from 'react';
import { ColorFormat } from '../../types';
import { badgeStatusClasses, getSizeClasses, getStyleClasses, isBadgeStatus } from './helpers';
import { BadgeEmphasis, BadgeProps, BadgeStyle } from './types';

export const Badge: FC<BadgeProps> = ({
    children,
    status,
    icon,
    style = BadgeStyle.Primary,
    size = 'm',
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

    return (
        <Container
            onClick={() => onClick && onClick()}
            className={merge([
                'tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-transition-color tw-select-none tw-flex-initial tw-min-w-0 tw-align-top',
                disabled
                    ? 'tw-bg-box-disabled tw-text-box-disabled-inverse'
                    : getStyleClasses(style, !!onClick, emphasis === BadgeEmphasis.Strong),
                onClick && !disabled ? 'hover:tw-cursor-pointer' : 'tw-cursor-default',
                getSizeClasses(children, Boolean(status || icon), size === 's'),
            ])}
            data-test-id="badge"
            title={badgeTitle}
        >
            {status && (
                <span
                    data-test-id="badge-status"
                    className={merge([
                        'tw-w-2 tw-h-2 tw-rounded-full tw-flex-none',
                        disabled && 'tw-opacity-30',
                        isBadgeStatus(status) && badgeStatusClasses[status],
                    ])}
                    style={
                        isBadgeStatus(status)
                            ? {}
                            : {
                                  backgroundColor:
                                      typeof status === 'string'
                                          ? status
                                          : getColorDisplayValue(status, ColorFormat.Rgba, true),
                              }
                    }
                />
            )}
            {icon && (
                <span
                    data-test-id="badge-icon"
                    className={merge([disabled && 'tw-opacity-30', 'tw-flex-none tw-leading-none'])}
                >
                    {cloneElement(icon, { size: IconSize.Size16 })}
                </span>
            )}
            <span className="tw-text-center tw-text-xxs tw-font-sans tw-font-normal tw-truncate">{children}</span>
            {onDismiss && (
                <button
                    type="button"
                    data-test-id="badge-dismiss"
                    className="tw--mr-0.5"
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
