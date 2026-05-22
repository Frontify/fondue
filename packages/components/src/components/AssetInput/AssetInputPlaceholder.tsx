/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, type ReactElement } from 'react';

import { Flex } from '../Flex/Flex';

import { type AssetInputBrowseInputProps } from './AssetInputBrowseInput';
import { type AssetInputUploadInputProps } from './AssetInputUploadInput';
import styles from './styles/asset-input.module.scss';

type AssetInputAction = ReactElement<AssetInputUploadInputProps | AssetInputBrowseInputProps>;

export type AssetInputPlaceholderProps = {
    children: AssetInputAction | [AssetInputAction, AssetInputAction];
};

export const AssetInputPlaceholder = (
    { children }: AssetInputPlaceholderProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.placeholder}>
            <Flex gap={2} height="100%" p={3}>
                {children}
            </Flex>
        </div>
    );
};
AssetInputPlaceholder.displayName = 'AssetInput.Placeholder';
