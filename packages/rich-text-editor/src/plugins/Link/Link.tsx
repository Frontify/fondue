/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RtePlugin } from '#/domain';

import { LinkFlyout } from './components/LinkFlyout';
import { LinkPanel } from './components/LinkPanel';
import { type LinkRun, type LinkValue } from './helpers/draft';
import styles from './link.module.scss';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    link?: LinkValue;
};

export const linkPlugin = (): RtePlugin => ({
    id: 'link',
    schema: {
        marks: [
            {
                key: 'link',
                attributes: {
                    href: { parseFromDomAttribute: 'href' },
                    // No parse rule: `target` is a string in HTML and a flag
                    // here, so a pasted link keeps its href but not this.
                    openInNewTab: { default: null },
                },
                // Outside every other mark, so a link whose text is styled only
                // in part still renders as ONE anchor: an element stays open
                // across text runs only while the marks around it are the same,
                // and a colour or an emphasis inside would otherwise cut it up.
                nesting: -2,
                render: ({ value, children }) => {
                    // A render function knows what it declared, so it reads its own
                    // value. Partial: a pasted `<a>` without an href leaves it unset.
                    const link = value as Partial<LinkValue>;
                    return (
                        <a
                            href={link.href}
                            className={styles.link}
                            {...(link.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                            {children}
                        </a>
                    );
                },
            },
        ],
    },
    toolbar: (api) => <LinkFlyout api={api} />,
    floating: {
        // The whole link, not the caret in it: the panel stays put while the
        // caret moves through the text it is about.
        anchor: { mark: 'link' },
        // Only for a caret *in* a link. A selection dragged across one means
        // the user is picking text to format, which is the toolbar's job —
        // and it is also what the toolbar's own flyout leaves behind while
        // it is open.
        render: ({ api }) => {
            // The one place the run's untyped value becomes this plugin's own.
            const run = api.marks.getRun('link') as LinkRun | null;
            return run && api.selection.get().isCollapsed ? <LinkPanel api={api} run={run} /> : null;
        },
    },
});
