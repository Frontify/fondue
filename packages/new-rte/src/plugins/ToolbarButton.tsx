/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type ReactNode } from 'react';

/**
 * Shared chrome for the built-in toolbar buttons. Not part of the editor's
 * API: a plugin's toolbar is plain React, so this is simply a local component
 * the shipped plugins happen to share.
 */
export const ToolbarButton = ({
    children,
    active,
    disabled,
    onClick,
    style,
    title,
}: {
    children: ReactNode;
    /** Omit for buttons that are actions rather than toggles — it drives `aria-pressed`. */
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
    style?: CSSProperties;
    /** Names a button whose label is only a symbol; also its tooltip. */
    title?: string;
}): ReactNode => (
    <button
        type="button"
        aria-pressed={active}
        aria-label={title}
        title={title}
        disabled={disabled}
        // Never take the selection away from the editor.
        onMouseDown={(event) => event.preventDefault()}
        onClick={onClick}
        style={{
            fontSize: 13,
            lineHeight: 1,
            padding: '3px 8px',
            border: '1px solid #d1d5db',
            borderRadius: 4,
            color: '#374151',
            fontFamily: 'inherit',
            background: active ? '#e5e7eb' : 'transparent',
            cursor: disabled ? 'default' : 'pointer',
            opacity: disabled ? 0.4 : 1,
            ...style,
        }}
    >
        {children}
    </button>
);
