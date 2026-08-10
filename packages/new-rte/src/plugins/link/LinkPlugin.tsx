/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FondueRtePlugin } from '#/RichTextEditor';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    link?: { href: string };
};

export const LinkPlugin: FondueRtePlugin = {
    id: 'link',
    schema: {
        marks: [
            {
                key: 'link',
                attributes: { href: { parseFromDomAttribute: true } },
                render: ({ value, children }) => <a href={value.href as string}>{children}</a>,
            },
        ],
    },
    toolbar: (api) => {
        const active = api.isMarkActive('link');
        const disabled = !active && api.isSelectionCollapsed();
        return (
            <button
                type="button"
                aria-pressed={active}
                disabled={disabled}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                    if (active) {
                        api.toggleMark('link');
                        return;
                    }
                    // Spike-level UX; a real implementation renders a popover.
                    const href = window.prompt('Link URL');
                    if (href) {
                        api.toggleMark('link', { href });
                    }
                }}
                style={{
                    fontSize: 13,
                    lineHeight: 1,
                    padding: '3px 8px',
                    border: '1px solid #d1d5db',
                    background: active ? '#e5e7eb' : 'transparent',
                    cursor: disabled ? 'default' : 'pointer',
                    opacity: disabled ? 0.4 : 1,
                    borderRadius: 4,
                    color: '#374151',
                    fontFamily: 'inherit',
                    textDecoration: 'underline',
                }}
            >
                Link
            </button>
        );
    },
};
