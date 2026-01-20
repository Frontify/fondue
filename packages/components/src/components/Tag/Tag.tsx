/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross, IconPlus } from '@frontify/fondue-icons';
import { Children, forwardRef, isValidElement, useState, type MouseEvent, type ReactNode } from 'react';

import styles from './styles/tag.module.scss';

type TagStyle = 'default' | 'highlight';

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
     * Click handler - when provided, the Tag renders as a button element
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

export type TagPropsWithClick = Omit<TagProps, 'onClick'> & {
    onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
};

export type TagPropsWithoutClick = Omit<TagProps, 'onClick'> & {
    onClick?: undefined;
};

export type TagHoverContentProps = {
    children: ReactNode;
};

export type TagSecondaryContentProps = {
    children: ReactNode;
};

const TagRoot = forwardRef<HTMLButtonElement | HTMLDivElement, TagProps>(
    (
        {
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
            variant = 'default',
        },
        ref,
    ) => {
        const [isHover, setIsHover] = useState(false);

        // Extract hover content from slots
        let extractedHoverContent: ReactNode = null;
        const processedChildren = Children.map(children, (child) => {
            if (isValidElement(child) && child.type === TagHoverContent) {
                // eslint-disable-next-line react-hooks/immutability
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
                    ref={ref}
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
    },
);
TagRoot.displayName = 'Tag';

type TagMainContentProps = {
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
};

const TagMainContent = forwardRef<HTMLButtonElement | HTMLDivElement, TagMainContentProps>(
    (
        {
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
        },
        ref,
    ) => {
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
                    ref={ref as React.Ref<HTMLButtonElement>}
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
                ref={ref as React.Ref<HTMLDivElement>}
                className={styles.mainContent}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                data-test-id={dataTestId}
            >
                {content}
            </div>
        );
    },
);
TagMainContent.displayName = 'TagMainContent';

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

/**
 * TagComponent interface with function overloads for conditional ref typing.
 *
 * The overload order matters for TypeScript's type inference:
 * - TypeScript uses the FIRST matching overload when inferring types in generic contexts
 *   (e.g., Storybook's StoryObj<typeof Tag>)
 * - By placing TagPropsWithoutClick first, generic inference defaults to HTMLDivElement
 * - When onClick is explicitly provided, TypeScript matches the second overload,
 *   correctly inferring HTMLButtonElement for the ref
 */
type TagComponent = {
    (props: TagPropsWithoutClick & React.RefAttributes<HTMLDivElement>): React.ReactNode;
    (props: TagPropsWithClick & React.RefAttributes<HTMLButtonElement>): React.ReactNode;
    displayName?: string;
    HoverContent: typeof TagHoverContent;
    SecondaryContent: typeof TagSecondaryContent;
};

export const Tag: TagComponent = TagRoot as unknown as TagComponent;
Tag.HoverContent = TagHoverContent;
Tag.SecondaryContent = TagSecondaryContent;
