/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross, IconPlus } from '@frontify/fondue-icons';
import { type MouseEvent, type ReactNode } from 'react';

import styles from './styles/tag.module.scss';

type TagStyle = 'default' | 'positive' | 'highlight' | 'warning' | 'negative';

type TagEmphasis = 'strong' | 'weak';

type TagSize = 'default' | 'small';

type TagProps = {
    /**
     * @default 'strong'
     */
    emphasis?: TagEmphasis;
    /**
     * @default 'default'
     */
    variant?: TagStyle;
    /**
     * @default 'default'
     */
    size?: TagSize;
    /**
     * @default false
     */
    disabled?: boolean;
    /**
     * Click handler
     */
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    /**
     * @default false
     */
    dismissable?: boolean;
    /**
     * Click handler on dismiss
     */
    onDismiss?: (event?: MouseEvent<HTMLButtonElement>) => void;
    /**
     * @default false
     */
    addable?: boolean;
    /**
     * Click handler on dismiss
     */
    onAddClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    'aria-label'?: string;
    'data-test-id'?: string;
    children: ReactNode;
};

export const Tag = ({
    'aria-label': ariaLabel,
    'data-test-id': dataTestId = 'tag',
    addable = false,
    children,
    disabled = false,
    dismissable = false,
    emphasis = 'strong',
    onAddClick,
    onClick,
    onDismiss,
    size = 'default',
    title,
    variant,
}: TagProps) => {
    const commonProps = {
        'aria-label': ariaLabel || title,
        'data-addable': addable,
        'data-component': 'tag',
        'data-disabled': disabled,
        'data-dismissable': dismissable,
        'data-emphasis': emphasis,
        'data-size': size,
        'data-test-id': dataTestId,
        'data-variant': variant,
        className: styles.root,
        title,
    };

    const contentProps = {
        'aria-label': ariaLabel || title,
        addable,
        disabled,
        dismissable,
        onAddClick,
        onDismiss,
    };

    if (onClick) {
        return (
            <button type="button" disabled={disabled} {...commonProps} onClick={onClick}>
                <TagContent {...contentProps}>{children}</TagContent>
            </button>
        );
    }

    return (
        <div {...commonProps}>
            <TagContent {...contentProps}>{children}</TagContent>
        </div>
    );
};

const TagContent = ({
    'aria-label': ariaLabel,
    addable = false,
    children,
    disabled = false,
    dismissable = false,
    onAddClick,
    onDismiss,
}: TagProps) => {
    return (
        <>
            {children}
            {addable && (
                <button
                    type="button"
                    aria-label={`Dismiss ${ariaLabel}`}
                    className={styles.dismiss}
                    disabled={disabled}
                    onClick={onAddClick}
                >
                    <IconPlus size="12" />
                </button>
            )}
            {dismissable && (
                <button
                    type="button"
                    aria-label={`Dismiss ${ariaLabel}`}
                    className={styles.dismiss}
                    disabled={disabled}
                    onClick={onDismiss}
                >
                    <IconCross size="12" />
                </button>
            )}
        </>
    );
};
