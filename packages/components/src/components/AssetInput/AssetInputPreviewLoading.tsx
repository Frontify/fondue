/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef } from 'react';

import { LoadingCircle, type LoadingCircleProps } from '../LoadingCircle/LoadingCircle';

import styles from './styles/asset-input.module.scss';

export type AssetInputPreviewLoadingProps = {
    size?: LoadingCircleProps['size'];
};

export const AssetInputPreviewLoading = (
    { size = 'small' }: AssetInputPreviewLoadingProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <div ref={ref} className={styles.previewSlot}>
            <LoadingCircle size={size} />
        </div>
    );
};
AssetInputPreviewLoading.displayName = 'AssetInput.PreviewLoading';
