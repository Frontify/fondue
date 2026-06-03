/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef } from 'react';

import { LoadingCircle } from '../LoadingCircle/LoadingCircle';

import styles from './styles/asset-input.module.scss';

export const AssetInputPreviewLoading = ({}, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={styles.previewSlot} data-test-id="fondue-asset-input-preview-slot">
            <LoadingCircle size="small" />
        </div>
    );
};
AssetInputPreviewLoading.displayName = 'AssetInput.PreviewLoading';
