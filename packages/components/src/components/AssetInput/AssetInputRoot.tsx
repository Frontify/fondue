/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue-icons';
import { Children, isValidElement, useMemo, type ForwardedRef, type ReactNode } from 'react';

import { AssetInputMetadata } from './AssetInputMetadata';
import { AssetInputPreview } from './AssetInputPreview';
import { AssetInputTitle } from './AssetInputTitle';
import styles from './styles/asset-input.module.scss';

export type AssetInputOrientation = 'horizontal' | 'vertical';

export type AssetInputRootProps = {
    children: ReactNode;
    orientation: AssetInputOrientation;
    isOpen: boolean;
    onPress?: () => void;
};

export const AssetInputRoot = (
    { children, orientation = 'horizontal', isOpen = false, onPress, ...props }: AssetInputRootProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const { parts, metadata } = useMemo(() => {
        const parts: Record<'preview' | 'title', ReactNode> = {
            preview: null,
            title: null,
        };
        const metadataItems: { key: number; child: ReactNode }[] = [];
        Children.forEach(children, (child, index) => {
            if (!isValidElement(child)) {
                return;
            }
            if (child.type === AssetInputPreview) {
                parts.preview = child;
            }
            if (child.type === AssetInputTitle) {
                parts.title = child;
            }
            if (child.type === AssetInputMetadata) {
                metadataItems.push({ key: index, child });
            }
        });
        const metadata = metadataItems.flatMap((meta, index) =>
            index === 0
                ? [meta.child]
                : [<div key={`separator-${meta.key}`} className={styles.metaSeparator} />, meta.child],
        );
        return { parts, metadata };
    }, [children]);

    const { title, preview } = parts;
    const hasMetadata = metadata.length > 0;

    return (
        <button
            ref={ref}
            type="button"
            data-open={isOpen}
            data-orientation={orientation}
            className={styles.root}
            onClick={onPress}
            {...props}
        >
            {preview}
            <div className={styles.mainContainer}>
                {title || hasMetadata ? (
                    <div className={styles.contentContainer}>
                        {title}
                        {hasMetadata && <div className={styles.metadataContainer}>{metadata}</div>}
                    </div>
                ) : null}
                <div className={styles.caretContainer}>
                    <div className={styles.caret}>
                        <IconCaretDown />
                    </div>
                </div>
            </div>
        </button>
    );
};
AssetInputRoot.displayName = 'AssetInput.Root';
