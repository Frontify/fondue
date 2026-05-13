/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowCircleUp } from '@frontify/fondue-icons';
import { useCallback, useId, useRef } from 'react';

import { Button } from '../Button/Button';

type AssetInputUploadInputProps = {
    acceptFileType?: string;
    allowMultiple?: boolean;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AssetInputUploadInput = ({
    acceptFileType,
    allowMultiple = false,
    onFileChange,
}: AssetInputUploadInputProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const id = useId();
    const openFileUploadDialog = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [fileInputRef]);

    return (
        <>
            <Button onPress={openFileUploadDialog} emphasis="weak" hugWidth={false}>
                <IconArrowCircleUp size={20} />
                Upload
            </Button>

            <input
                style={{ display: 'none' }}
                id={id}
                ref={fileInputRef}
                type="file"
                accept={acceptFileType}
                multiple={allowMultiple}
                onChange={onFileChange}
            />
        </>
    );
};
