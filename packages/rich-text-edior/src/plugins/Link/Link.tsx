/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/RichTextEditor';

import { LinkFlyout } from './components/LinkFlyout';
import { LinkPanel } from './components/LinkPanel';
import styles from './link.module.scss';

/**
 * The value this plugin sets on text nodes. `openInNewTab` is stored only when
 * it is on — its attribute defaults to null, which is dropped on the way into
 * the document, so an ordinary link stays `{ link: { href } }`.
 */
export type LinkMark = {
    link?: { href: string; openInNewTab?: true };
};

export const LinkPlugin = definePlugin(() => ({
    id: 'link',
    schema: {
        marks: [
            {
                key: 'link',
                attributes: {
                    href: { parseFromDomAttribute: true },
                    // No parse rule: `target` is a string in HTML and a flag
                    // here, so a pasted link keeps its href but not this.
                    openInNewTab: { default: null },
                },
                // Outside every other mark, so a link whose text is styled only
                // in part still renders as ONE anchor: an element stays open
                // across text runs only while the marks around it are the same,
                // and a colour or an emphasis inside would otherwise cut it up.
                nesting: -2,
                render: ({ value, children }) => (
                    <a
                        href={String(value.href)}
                        className={styles.link}
                        {...(value.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                        {children}
                    </a>
                ),
            },
        ],
    },
    toolbar: (api) => <LinkFlyout api={api} />,
    panel: {
        // The whole link, not the caret in it: the panel stays put while the
        // caret moves through the text it is about.
        anchorTo: { mark: 'link' },
        // Only for a caret *in* a link. A selection dragged across one means the
        // user is picking text to format, which is the toolbar's job — and it is
        // also what the toolbar's own flyout leaves behind while it is open.
        render: (api) => {
            const run = api.getMarkRun('link');
            return run && api.isSelectionCollapsed() ? <LinkPanel api={api} run={run} /> : null;
        },
    },
}));
