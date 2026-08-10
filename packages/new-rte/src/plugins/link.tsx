/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/RichTextEditor';

import { ToolbarButton } from './ToolbarButton';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    link?: { href: string };
};

export const LinkPlugin: RtePlugin = {
    id: 'link',
    schema: {
        marks: [
            {
                key: 'link',
                attributes: { href: { parseFromDomAttribute: true } },
                render: ({ value, children }) => <a href={String(value.href)}>{children}</a>,
            },
        ],
    },
    toolbar: (api) => {
        const active = api.isMarkActive('link');
        return (
            <ToolbarButton
                active={active}
                disabled={!active && api.isSelectionCollapsed()}
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
                style={{ textDecoration: 'underline' }}
            >
                Link
            </ToolbarButton>
        );
    },
};
