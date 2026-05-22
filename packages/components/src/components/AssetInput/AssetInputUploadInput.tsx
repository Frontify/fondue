/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowCircleUp } from '@frontify/fondue-icons';
import { type ChangeEvent, type ForwardedRef, useRef } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { Button } from '../Button/Button';

export type AssetInputUploadInputProps = {
    acceptFileType?: string;
    allowMultiple?: boolean;
    onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const AssetInputUploadInput = (
    { acceptFileType, allowMultiple = false, onSelect }: AssetInputUploadInputProps,
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
            />
        </>
    );
};
AssetInputUploadInput.displayName = 'AssetInput.UploadInput';
