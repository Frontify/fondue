/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross, IconPlus } from '@frontify/fondue-icons';
import { Children, isValidElement, useState, type MouseEvent, type ReactNode } from 'react';

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
     * Click handler on dismiss - providing this will show the dismiss button
     */
    onDismiss?: (event?: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Click handler on add click - providing this will show the add button
     */
    onAddClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    'aria-label'?: string;
    'data-test-id'?: string;
    children: ReactNode;
};

export type TagHoverContentProps = {
    children: ReactNode;
};

export type TagSecondaryContentProps = {
    children: ReactNode;
};

const TagRoot = ({
    'aria-label': ariaLabel,
    'data-test-id': dataTestId = 'tag',
    children,
    disabled = false,
    emphasis = 'strong',
    onAddClick,
    onClick,
    onDismiss,
    size = 'default',
    title,
    variant,
}: TagProps) => {
    const [isHover, setIsHover] = useState(false);

    // Extract hover content from slots
    let extractedHoverContent: ReactNode = null;
    const processedChildren = Children.map(children, (child) => {
        if (isValidElement(child) && child.type === TagHoverContent) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            extractedHoverContent = child.props.children;
            return null;
        }
        return child;
    });

    const commonProps = {
        'aria-label': ariaLabel || title,
        'data-addable': !!onAddClick,
        'data-component': 'tag',
        'data-disabled': disabled,
        'data-dismissable': !!onDismiss,
        'data-emphasis': emphasis,
        'data-size': size,
        'data-test-id': dataTestId,
        'data-variant': variant,
        className: styles.root,
        title,
    };

    const contentProps = {
        'aria-label': ariaLabel || title,
        disabled,
        hoverContent: extractedHoverContent,
        isHover,
        onAddClick,
        onDismiss,
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
                <TagContent {...contentProps}>{processedChildren}</TagContent>
            </button>
        );
    }

    return (
        <div {...commonProps}>
            <TagContent {...contentProps}>{processedChildren}</TagContent>
        </div>
    );
};
TagRoot.displayName = 'Tag';

const TagContent = ({
    'aria-label': ariaLabel,
    children,
    disabled = false,
    hoverContent,
    isHover = false,
    onAddClick,
    onDismiss,
}: TagProps & { hoverContent?: ReactNode; isHover?: boolean }) => {
    // Process children to handle secondary content slots in their natural position
    let secondaryIndex = 0;
    const processedChildren = Children.map(children, (child) => {
        if (isValidElement(child) && child.type === TagSecondaryContent) {
            const currentIndex = secondaryIndex++;
            return (
                <div className={styles.secondaryContent} key={`secondary-${currentIndex}`}>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                    {child.props.children}
                </div>
            );
        }
        return child;
    });

    return (
        <>
            {hoverContent ? (
                <div data-hover={isHover}>
                    <div>{hoverContent}</div>
                    <div>{processedChildren}</div>
                </div>
            ) : (
                processedChildren
            )}
            <TagActionButtons
                aria-label={ariaLabel}
                disabled={disabled}
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
     * Click handler on dismiss
     */
    onDismiss?: (event?: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Click handler on add click
     */
    onAddClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    'aria-label'?: string;
};

const TagActionButtons = ({ 'aria-label': ariaLabel, disabled, onAddClick, onDismiss }: TagActionButtonsProps) => {
    return (
        <>
            {onAddClick && (
                <button
                    type="button"
                    aria-label={`Add ${ariaLabel}`}
                    className={styles.dismiss}
                    disabled={disabled}
                    onClick={onAddClick}
                >
                    <IconPlus size="12" />
                </button>
            )}
            {onDismiss && (
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

export const TagHoverContent = ({ children }: TagHoverContentProps) => {
    return <>{children}</>;
};
TagHoverContent.displayName = 'Tag.HoverContent';

export const TagSecondaryContent = ({ children }: TagSecondaryContentProps) => {
    return <>{children}</>;
};
TagSecondaryContent.displayName = 'Tag.SecondaryContent';

export const Tag = TagRoot as typeof TagRoot & {
    HoverContent: typeof TagHoverContent;
    SecondaryContent: typeof TagSecondaryContent;
    displayName?: string;
};
Tag.HoverContent = TagHoverContent;
Tag.SecondaryContent = TagSecondaryContent;
