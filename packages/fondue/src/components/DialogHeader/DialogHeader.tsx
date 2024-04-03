/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Box } from '@components/Box';
import { Flex } from '@components/Flex';
import IconCross from '@foundation/Icon/Generated/IconCross';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

import { type DialogHeaderProps, dialogHeadingMap, dialogPaddingMap } from '../../types';

export const DialogHeader = ({
    title,
    separator = true,
    padding = 'comfortable',
    onClose,
    icon,
    badge,
    children,
    'data-test-id': dataTestId = 'fondue-dialog-header',
}: DialogHeaderProps) => {
    return (
        <Box
            data-test-id={dataTestId}
            className={merge([
                'tw-w-full tw-flex tw-items-center tw-border-b tw-border-b-line',
                dialogPaddingMap[padding],
                !separator && 'tw-pb-0 tw-border-none',
            ])}
        >
            <Flex alignItems="center" data-test-id={`${dataTestId}-title`}>
                <Box className="tw-flex tw-items-center tw-text-box-neutral-mighty">
                    {icon && (
                        <span data-test-id={`${dataTestId}-icon`} className="tw-mr-1.5">
                            {icon}
                        </span>
                    )}
                    <p className={merge([dialogHeadingMap[padding], 'tw-font-medium tw-whitespace-nowrap'])}>{title}</p>
                    {badge && (
                        <div data-test-id={`${dataTestId}-badge`} className="tw-ml-1.5">
                            {badge}
                        </div>
                    )}
                </Box>
                <Box className="tw-flex-shrink tw-ml-1">{children}</Box>
            </Flex>
            {onClose && (
                <button
                    data-test-id={`${dataTestId}-close`}
                    aria-label={`${dataTestId}-close`}
                    onClick={onClose}
                    className={merge([FOCUS_VISIBLE_STYLE, 'tw-rounded tw-absolute tw-right-5 tw-text-text'])}
                >
                    <IconCross />
                </button>
            )}
        </Box>
    );
};

DialogHeader.displayName = 'FondueDialogHeader';
