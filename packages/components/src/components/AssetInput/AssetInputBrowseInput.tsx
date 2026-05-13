/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconImageStack } from '@frontify/fondue-icons';

import { Button } from '../Button/Button';

type AssetInputBrowseInputProps = {
    onBrowse: () => void;
};

export const AssetInputBrowseInput = ({ onBrowse }: AssetInputBrowseInputProps) => {
    return (
        <Button onPress={onBrowse} emphasis="weak" hugWidth={false}>
            <IconImageStack size={20} />
            Browse
        </Button>
    );
};
