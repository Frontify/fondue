/* (c) Copyright Frontify Ltd., all rights reserved. */

import styles from './styles/asset-input.module.scss';

export type AssetInputPreviewImageProps = {
    src: string;
    alt?: string;
};

export const AssetInputPreviewImage = ({ src, alt = '' }: AssetInputPreviewImageProps) => {
    return <img src={src} alt={alt} className={styles.previewImage} />;
};
