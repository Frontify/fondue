/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconPen } from '@frontify/fondue-icons';
import { Slot } from '@radix-ui/react-slot';
import { type ReactNode, forwardRef, useRef, useState } from 'react';

import styles from './styles/editable-text.module.scss';

export type EditableTextProps = {
    /**
     * Callback fired with the plain text value when editing is confirmed (on blur or Enter).
     */
    onChange?: (value: string) => void;
    /**
     * When true, renders the child element instead of a default span,
     * merging all editable props onto it.
     */
    asChild?: boolean;
    /**
     * When true, the EditableText only takes the width of the content.
     * @default true
     */
    hugWidth?: boolean;
    /**
     * Accessible label for the editable text field.
     */
    'aria-label'?: string;
    children?: ReactNode;
    'data-test-id'?: string;
};

export const EditableText = forwardRef<HTMLElement, EditableTextProps>(
    (
        {
            onChange,
            asChild,
            hugWidth = true,
            'aria-label': ariaLabel,
            children,
            'data-test-id': dataTestId = 'fondue-editable-text',
        },
        forwardedRef,
    ) => {
        const TextElement = asChild ? Slot : 'span';
        const [isEditing, setIsEditing] = useState(false);
        const wasClickedRef = useRef(false);
        const rootRef = useRef<HTMLDivElement>(null);

        const handleMouseDown = () => {
            wasClickedRef.current = true;
        };

        const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
            setIsEditing(true);
            rootRef.current?.setAttribute('data-show-focus-ring', String(!wasClickedRef.current));
            const element = event.currentTarget;
            const range = document.createRange();
            range.selectNodeContents(element);
            range.collapse(false);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                event.currentTarget.blur();
            }
        };

        const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
            setIsEditing(false);
            rootRef.current?.setAttribute('data-show-focus-ring', 'false');
            wasClickedRef.current = false;
            event.currentTarget.scrollLeft = 0;
            onChange?.(event.currentTarget.textContent ?? '');
        };

        return (
            <div
                ref={rootRef}
                className={styles.root}
                data-editing={isEditing}
                data-hug-width={hugWidth}
                data-show-focus-ring="false"
                data-test-id={dataTestId}
            >
                <TextElement
                    ref={forwardedRef}
                    className={styles.text}
                    contentEditable={isEditing ? 'plaintext-only' : undefined}
                    suppressContentEditableWarning
                    tabIndex={0}
                    role={isEditing ? 'textbox' : undefined}
                    aria-label={isEditing ? ariaLabel : undefined}
                    aria-live="off"
                    onMouseDown={handleMouseDown}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                >
                    {children}
                </TextElement>
                <span className={styles.icon} aria-hidden="true">
                    <IconPen size={16} />
                </span>
            </div>
        );
    },
);

EditableText.displayName = 'EditableText';
