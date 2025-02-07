/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { cn } from '#/utilities/styleUtilities';

import styles from './styles/text.module.scss';

export type TextProps = { children?: ReactNode };

export const Text = ({ children }: TextProps) => {
    return (
        <div className={cn([styles.root])} data-test-id="fondue-text">
            {children}
        </div>
    );
};
Text.displayName = 'Text';
