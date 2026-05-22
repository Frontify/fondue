/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, type ForwardedRef, type ReactElement } from 'react';

import { type AssetInputPreviewIconProps } from './AssetInputPreviewIcon';
import { type AssetInputPreviewImageProps } from './AssetInputPreviewImage';
import { type AssetInputPreviewLoadingProps } from './AssetInputPreviewLoading';
import styles from './styles/asset-input.module.scss';

const MAX_PREVIEW_PARTS = 4;

type AssetInputPreviewPart = ReactElement<
    AssetInputPreviewImageProps | AssetInputPreviewIconProps | AssetInputPreviewLoadingProps
>;

export type AssetInputPreviewProps = {
    children: AssetInputPreviewPart | AssetInputPreviewPart[];
};

export const AssetInputPreview = ({ children }: AssetInputPreviewProps, ref: ForwardedRef<HTMLDivElement>) => {
    const parts = Children.toArray(children).slice(0, MAX_PREVIEW_PARTS);
    const emptySlotCount = parts.length > 1 ? MAX_PREVIEW_PARTS - parts.length : 0;

    return (
        <div ref={ref} className={styles.preview}>
            {parts}
            {Array.from({ length: emptySlotCount }, (_, index) => (
                <div className={styles.previewSlot} key={`empty-${index}`} />
            ))}
        </div>
    );
};
AssetInputPreview.displayName = 'AssetInput.Preview';
