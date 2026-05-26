/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconImageStack } from '@frontify/fondue-icons';
import { type ForwardedRef } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { Button } from '../Button/Button';

export type AssetInputBrowseInputProps = {
    'data-test-id'?: string;
    onBrowse: () => void;
};

export const AssetInputBrowseInput = (
    { 'data-test-id': dataTestId = 'fondue-asset-input-browse', onBrowse }: AssetInputBrowseInputProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const { t } = useTranslation();

    return (
        <Button
            ref={ref}
            onPress={onBrowse}
            emphasis="weak"
            hugWidth={false}
            data-asset-input-action="browse"
            data-test-id={dataTestId}
        >
            <IconImageStack size={20} />
            {t('AssetInput_browse')}
        </Button>
    );
};
AssetInputBrowseInput.displayName = 'AssetInput.BrowseInput';
