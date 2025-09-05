/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross, IconPlus } from '@frontify/fondue-icons';
import { useState, type MouseEvent, type ReactNode } from 'react';

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
     * Click handler on add click
     */
    onAddClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    /**
     * The content show on hover
     * @default undefined
     */
    hoverContent?: ReactNode;
    /**
     * Secondary string (or React content)
     */
    secondaryContent?: ReactNode;
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
    hoverContent,
    onAddClick,
    onClick,
    onDismiss,
    secondaryContent,
    size = 'default',
    title,
    variant,
}: TagProps) => {
    const [isHover, setIsHover] = useState(false);

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
        hoverContent,
        isHover,
        onAddClick,
        onDismiss,
        secondaryContent,
    };

    if (onClick) {
        return (
            <button
                type="button"
                disabled={disabled}
                {...commonProps}
                onClick={onClick}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
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
    hoverContent,
    isHover = false,
    onAddClick,
    onDismiss,
    secondaryContent,
}: TagProps & { isHover?: boolean }) => {
    return (
        <>
            {hoverContent ? (
                <div data-hover={isHover}>
                    <div>{hoverContent}</div>
                    <div>{children}</div>
                </div>
            ) : (
                children
            )}
            {secondaryContent ? <div className={styles.secondaryContent}>{secondaryContent}</div> : null}
            <TagActionButtons
                addable={addable}
                aria-label={ariaLabel}
                disabled={disabled}
                dismissable={dismissable}
                onAddClick={onAddClick}
                onDismiss={onDismiss}
            />
        </>
    );
};

type TagActionButtonsProps = {
    /**
     * @default false
     */
    disabled?: boolean;
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
     * Click handler on add click
     */
    onAddClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    'aria-label'?: string;
};

const TagActionButtons = ({
    'aria-label': ariaLabel,
    addable,
    disabled,
    dismissable,
    onAddClick,
    onDismiss,
}: TagActionButtonsProps) => {
    return (
        <>
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
