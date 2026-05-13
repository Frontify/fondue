/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import styles from './styles/asset-input.module.scss';

type AssetInputMetadataProps = {
    children: ReactNode;
};

export const AssetInputMetadata = ({ children }: AssetInputMetadataProps) => {
    return <span className={styles.metadata}>{children}</span>;
};
