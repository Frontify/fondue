/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, type ReactNode } from 'react';

import styles from './styles/asset-input.module.scss';

export type AssetInputPreviewIconProps = {
    children: ReactNode;
};

export const AssetInputPreviewIcon = ({ children }: AssetInputPreviewIconProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={styles.previewIcon} data-test-id="fondue-asset-input-preview-slot">
            {children}
        </div>
    );
};
AssetInputPreviewIcon.displayName = 'AssetInput.PreviewIcon';
