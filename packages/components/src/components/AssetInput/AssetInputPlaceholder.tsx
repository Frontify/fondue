/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, useMemo, type ReactNode } from 'react';

import { Flex } from '../Flex/Flex';

import { AssetInputBrowseInput } from './AssetInputBrowseInput';
import { AssetInputUploadInput } from './AssetInputUploadInput';
import styles from './styles/asset-input.module.scss';

export type AssetInputPlaceholderProps = { children: ReactNode };

export const AssetInputPlaceholder = ({ children }: AssetInputPlaceholderProps) => {
    const inputs = useMemo(() => {
        const inputs: ReactNode[] = [];
        Children.forEach(children, (child) => {
            if (!isValidElement(child)) {
                return;
            }
            if (child.type === AssetInputUploadInput || child.type === AssetInputBrowseInput) {
                inputs.push(child);
            }
        });
        return inputs;
    }, [children]);

    if (inputs.length === 0) {
        return null;
    }

    const [firstInput, secondInput] = inputs;

    return (
        <div className={styles.placeholder}>
            <Flex gap={2} height="100%" p={3}>
                {firstInput}
                {secondInput ? <div className={styles.separator} /> : null}
                {secondInput}
            </Flex>
        </div>
    );
};
