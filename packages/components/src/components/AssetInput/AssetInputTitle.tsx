/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, type ReactNode } from 'react';

import styles from './styles/asset-input.module.scss';

export type AssetInputTitleProps = {
    children: ReactNode;
};

export const AssetInputTitle = ({ children }: AssetInputTitleProps, ref: ForwardedRef<HTMLSpanElement>) => {
    return (
        <span ref={ref} className={styles.title}>
            {children}
        </span>
    );
};
AssetInputTitle.displayName = 'AssetInput.Title';
