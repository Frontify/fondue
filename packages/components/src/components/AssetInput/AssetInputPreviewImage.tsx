/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef } from 'react';

import styles from './styles/asset-input.module.scss';

export type AssetInputPreviewImageProps = {
    src: string;
    alt?: string;
};

export const AssetInputPreviewImage = (
    { src, alt = '' }: AssetInputPreviewImageProps,
    ref: ForwardedRef<HTMLImageElement>,
) => {
    return <img ref={ref} src={src} alt={alt} className={styles.previewImage} />;
};
AssetInputPreviewImage.displayName = 'AssetInput.PreviewImage';
