/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowCircleUp } from '@frontify/fondue-icons';
import { type ChangeEvent, type ForwardedRef, useRef } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { Button } from '../Button/Button';

export type AssetInputUploadInputProps = {
    'data-test-id'?: string;
    acceptFileType?: string;
    allowMultiple?: boolean;
    onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const AssetInputUploadInput = (
    {
        'data-test-id': dataTestId = 'fondue-asset-input-upload',
        acceptFileType,
        allowMultiple = false,
        onSelect,
    }: AssetInputUploadInputProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { t } = useTranslation();

    const openFileUploadDialog = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <Button
                ref={ref}
                onPress={openFileUploadDialog}
                emphasis="weak"
                hugWidth={false}
                data-asset-input-action="upload"
                data-test-id={dataTestId}
            >
                <IconArrowCircleUp size={20} />
                {t('AssetInput_upload')}
            </Button>

            <input
                style={{ display: 'none' }}
                ref={fileInputRef}
                type="file"
                accept={acceptFileType}
                multiple={allowMultiple}
                onChange={onSelect}
                data-test-id={`${dataTestId}-file`}
            />
        </>
    );
};
AssetInputUploadInput.displayName = 'AssetInput.UploadInput';
