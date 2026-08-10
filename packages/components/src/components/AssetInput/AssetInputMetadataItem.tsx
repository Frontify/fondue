/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, type ReactNode } from 'react';

import styles from './styles/asset-input.module.scss';

export type AssetInputMetadataItemProps = {
    children: ReactNode;
};

export const AssetInputMetadataItem = (
    { children }: AssetInputMetadataItemProps,
    ref: ForwardedRef<HTMLSpanElement>,
) => {
    return (
        <span ref={ref} className={styles.metadataItem}>
            {children}
        </span>
    );
};
AssetInputMetadataItem.displayName = 'AssetInput.MetadataItem';
