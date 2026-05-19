/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconImageStack } from '@frontify/fondue-icons';

import { useTranslation } from '#/hooks/useTranslation';

import { Button } from '../Button/Button';

export type AssetInputBrowseInputProps = {
    onBrowse: () => void;
};

export const AssetInputBrowseInput = ({ onBrowse }: AssetInputBrowseInputProps) => {
    const { t } = useTranslation();

    return (
        <Button onPress={onBrowse} emphasis="weak" hugWidth={false} data-asset-input-action="browse">
            <IconImageStack size={20} />
            {t('AssetInput_browse')}
        </Button>
    );
};
