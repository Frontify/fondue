/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { Box } from '@components/Box/Box';
import { Button } from '@components/Button/Button';
import { ButtonEmphasis, ButtonSize } from '@components/Button/ButtonTypes';
import { Flex } from '@components/Flex';
import IconArrowLeft from '@foundation/Icon/Generated/IconArrowLeft';
import { useMobileDetection } from '@hooks/useMobileDetection';
import { merge } from '@utilities/merge';

import { type DialogFooterProps, dialogPaddingMap } from '../../types/dialog';

/**
 * @deprecated Use `Dialog` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.
 */
export const DialogFooter = ({
    actionButtons,
    children,
    backButton,
    padding = 'comfortable',
    separator = true,
    'data-test-id': dataTestId = 'fondue-dialog-footer',
}: DialogFooterProps): ReactElement => {
    const isMobile = useMobileDetection();

    return (
        <Box
            data-test-id={dataTestId}
            className={merge([
                'tw-border-t tw-border-t-line',
                dialogPaddingMap[padding],
                !separator && 'tw-pt-0 tw-border-none',
            ])}
        >
            {isMobile && (
                <Box
                    className={merge(['tw-w-full', backButton || actionButtons.length > 0 ? 'tw-pb-2' : ''])}
                    data-test-id={`${dataTestId}-content`}
                >
                    {children}
                </Box>
            )}
            <Flex justify="between" alignItems="center" spacingX={12}>
                {backButton && (
                    <Button
                        data-test-id={`${dataTestId}-back-button`}
                        {...backButton}
                        emphasis={ButtonEmphasis.Default}
                        icon={<IconArrowLeft />}
                    />
                )}
                {!isMobile && (
                    <Box className="tw-grow" data-test-id={`${dataTestId}-content`}>
                        {children}
                    </Box>
                )}

                {actionButtons.length > 0 ? (
                    <Box className="tw-flex tw-gap-x-3" data-test-id={`${dataTestId}-action-buttons`}>
                        {actionButtons.map((button) => (
                            <Button
                                key={`${dataTestId}-button-${button.children}`}
                                {...button}
                                size={ButtonSize.Medium}
                            />
                        ))}
                    </Box>
                ) : null}
            </Flex>
        </Box>
    );
};

DialogFooter.displayName = 'FondueDialogFooter';
