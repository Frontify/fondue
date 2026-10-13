/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineMark, type RtePlugin } from '#/core';

import { LinkEditor } from './components/LinkEditor';
import { LinkToolbarButton } from './components/LinkToolbarButton';
import { type LinkValue } from './helpers/draft';
import styles from './link.module.scss';

/** The value this plugin sets on text nodes. */
export type LinkMark = {
    link?: LinkValue;
};

const newTabAttrs = (link: LinkValue): Record<string, string> =>
    link.openInNewTab === true ? { target: '_blank', rel: 'noopener noreferrer' } : {};

/**
 * A link is a mark: the text stays text, and the target rides along on it.
 *
 * In the editor, `editorComponent` draws the anchor around the text and the
 * flyout that hangs off it while the caret is inside — showing the target,
 * editing it, removing the link. The toolbar button (`toolbarItem`) is how a
 * link is made.
 */
export const linkPlugin = (): RtePlugin => ({
    id: 'link',
    marks: {
        link: defineMark<LinkValue>({
            // Outside every other mark, so a partly styled link still renders
            // as ONE anchor: an element stays open across text runs only while
            // the marks around it are the same, and a colour or an emphasis
            // inside would otherwise cut it up.
            nesting: -2,
            // Typing at the end of a link does not extend it.
            inclusive: false,

            /** Portable markup: what copying out of the editor puts on the clipboard. */
            toHtml: (link) => ({
                tag: 'a',
                attrs: { href: link.href, class: styles.link ?? '', ...newTabAttrs(link) },
                children: true,
            }),

            parse: [
                {
                    tag: 'a[href]',
                    value: (element) => ({
                        href: element.getAttribute('href') ?? '',
                        ...(element.getAttribute('target') === '_blank' ? { openInNewTab: true as const } : {}),
                    }),
                },
            ],

            /** Readonly display. */
            renderComponent: ({ value, children }) => (
                <a href={value.href} className={styles.link} {...newTabAttrs(value)}>
                    {children}
                </a>
            ),

            editorComponent: (props) => <LinkEditor {...props} />,
        }),
    },
    toolbarItem: ({ api, selectedNode, ...rest }) => (
        <LinkToolbarButton api={api} selectedNode={selectedNode} {...rest} />
    ),
});
