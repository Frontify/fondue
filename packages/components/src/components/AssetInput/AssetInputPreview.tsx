/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, type ForwardedRef, type ReactElement } from 'react';

import { type AssetInputPreviewIconProps } from './AssetInputPreviewIcon';
import { type AssetInputPreviewImageProps } from './AssetInputPreviewImage';
import styles from './styles/asset-input.module.scss';

const MAX_PREVIEW_PARTS = 4;
const PREVIEW_SLOT_IDS = ['preview-slot-0', 'preview-slot-1', 'preview-slot-2', 'preview-slot-3'] as const;

type AssetInputPreviewPart = ReactElement<AssetInputPreviewImageProps | AssetInputPreviewIconProps>;

export type AssetInputPreviewProps = {
    children: AssetInputPreviewPart | AssetInputPreviewPart[];
};

export const AssetInputPreview = ({ children }: AssetInputPreviewProps, ref: ForwardedRef<HTMLDivElement>) => {
    const parts = Children.toArray(children).slice(0, MAX_PREVIEW_PARTS);

    return (
        <div ref={ref} className={styles.preview} data-test-id="fondue-asset-input-preview">
            {parts}
            {parts.length > 1 &&
                PREVIEW_SLOT_IDS.slice(parts.length, MAX_PREVIEW_PARTS).map((slotId) => (
                    <div className={styles.previewSlot} key={slotId} data-test-id="fondue-asset-input-preview-slot" />
                ))}
        </div>
    );
};
AssetInputPreview.displayName = 'AssetInput.Preview';
