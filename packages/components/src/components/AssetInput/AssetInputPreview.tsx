/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, useMemo, type ReactNode } from 'react';

import { AssetInputPreviewIcon } from './AssetInputPreviewIcon';
import { AssetInputPreviewImage } from './AssetInputPreviewImage';
import { AssetInputPreviewLoading } from './AssetInputPreviewLoading';
import styles from './styles/asset-input.module.scss';

type AssetInputPreviewProps = {
    children: ReactNode;
};

export const AssetInputPreview = ({ children }: AssetInputPreviewProps) => {
    const previewParts = useMemo(() => {
        const previewParts: ReactNode[] = [];
        Children.forEach(children, (child) => {
            if (!isValidElement(child)) {
                return;
            }
            if (
                child.type === AssetInputPreviewImage ||
                child.type === AssetInputPreviewIcon ||
                child.type === AssetInputPreviewLoading
            ) {
                previewParts.push(child);
            }
        });
        if (previewParts.length > 1 && previewParts.length < 4) {
            const emptyParts = Array.from({ length: 4 - previewParts.length }, (_, i) => (
                <div className={styles.previewSlot} key={`empty-part-${i}`} />
            ));
            previewParts.push(...emptyParts);
        }
        return previewParts.slice(0, 4);
    }, [children]);

    return (
        <div data-multiple-parts={previewParts.length > 1} className={styles.preview}>
            {previewParts}
        </div>
    );
};
