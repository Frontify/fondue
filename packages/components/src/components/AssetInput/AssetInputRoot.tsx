/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue-icons';
import { type ForwardedRef, type ReactNode } from 'react';

import styles from './styles/asset-input.module.scss';

export type AssetInputOrientation = 'horizontal' | 'vertical';

export type AssetInputRootProps = {
    'data-test-id'?: string;
    children: ReactNode;
    orientation?: AssetInputOrientation;
    isOpen?: boolean;
    onPress?: () => void;
};

export const AssetInputRoot = (
    {
        'data-test-id': dataTestId = 'fondue-asset-input-root',
        children,
        orientation = 'horizontal',
        isOpen = false,
        onPress,
        ...props
    }: AssetInputRootProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    return (
        <button
            ref={ref}
            type="button"
            data-open={isOpen}
            data-orientation={orientation}
            data-test-id={dataTestId}
            className={styles.root}
            onClick={onPress}
            {...props}
        >
            {children}
            <div className={styles.caret}>
                <IconCaretDown />
            </div>
        </button>
    );
};
AssetInputRoot.displayName = 'AssetInput.Root';
