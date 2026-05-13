/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LoadingCircle, type LoadingCircleProps } from '../LoadingCircle/LoadingCircle';

import styles from './styles/asset-input.module.scss';

type AssetInputPreviewLoadingProps = {
    size?: LoadingCircleProps['size'];
};

export const AssetInputPreviewLoading = ({ size = 'small' }: AssetInputPreviewLoadingProps) => {
    return (
        <div className={styles.previewSlot}>
            <LoadingCircle size={size} />
        </div>
    );
};
