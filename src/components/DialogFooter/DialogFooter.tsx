/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { Button, ButtonEmphasis, ButtonSize } from '@components/Button';
import { Box } from '@components/Box';
import { DialogFooterProps, dialogPaddingMap } from '../../types';
import IconArrowLeft from '@foundation/Icon/Generated/IconArrowLeft';
import { merge } from '@utilities/merge';
import { Flex } from '@components/Flex';
import useMobileDetection from '@hooks/useMobileDetection';

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
