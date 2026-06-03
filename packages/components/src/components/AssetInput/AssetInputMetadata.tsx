/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, type ReactNode } from 'react';

import styles from './styles/asset-input.module.scss';

export type AssetInputMetadataProps = {
    children: ReactNode;
};

export const AssetInputMetadata = ({ children }: AssetInputMetadataProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={styles.metadata}>
            {children}
        </div>
    );
};
AssetInputMetadata.displayName = 'AssetInput.Metadata';
