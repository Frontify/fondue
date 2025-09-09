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
        'data-addable': !!onAddClick,
        'data-component': 'tag',
        'data-disabled': disabled,
        'data-dismissable': !!onDismiss,
        'data-emphasis': emphasis,
        'data-size': size,
        'data-variant': variant,
        className: styles.root,
    };

    return (
        <div {...commonProps}>
            <TagMainContent
                aria-label={ariaLabel || title}
                disabled={disabled}
                hoverContent={extractedHoverContent}
                isHover={isHover}
                onClick={onClick}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                title={title}
                data-test-id={dataTestId}
            >
                {processedChildren}
            </TagMainContent>
            <TagActionButtons
                aria-label={ariaLabel || title}
                disabled={disabled}
                onAddClick={onAddClick}
                onDismiss={onDismiss}
            />
        </div>
    );
};
TagRoot.displayName = 'Tag';

const TagMainContent = ({
    'aria-label': ariaLabel,
    'data-test-id': dataTestId,
    children,
    disabled = false,
    hoverContent,
    isHover = false,
    onClick,
    onMouseEnter,
    onMouseLeave,
    title,
}: {
    'aria-label'?: string;
    'data-test-id'?: string;
    children: ReactNode;
    disabled?: boolean;
    hoverContent?: ReactNode;
    isHover?: boolean;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    title?: string;
}) => {
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

    const content = hoverContent ? (
        <div data-hover={isHover}>
            <div>{hoverContent}</div>
            <div>{processedChildren}</div>
        </div>
    ) : (
        processedChildren
    );

    if (onClick) {
        return (
            <button
                type="button"
                aria-label={ariaLabel}
                title={title}
                className={styles.mainContent}
                onClick={disabled ? undefined : onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                disabled={disabled}
                data-test-id={dataTestId}
            >
                {content}
            </button>
        );
    }

    return (
        <div
            className={styles.mainContent}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            data-test-id={dataTestId}
        >
            {content}
        </div>
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
                    aria-label={`Add ${ariaLabel || ''}`}
                    className={styles.actionButton}
                    disabled={disabled}
                    onClick={onAddClick}
                >
                    <IconPlus size="16" />
                </button>
            )}
            {onDismiss && (
                <button
                    type="button"
                    aria-label={`Dismiss ${ariaLabel || ''}`}
                    className={styles.actionButton}
                    disabled={disabled}
                    onClick={onDismiss}
                >
                    <IconCross size="16" />
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
