/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted through `pluginsWithLooks`: a block drawn by its own component in the readonly view, whose class writes
// its margins, so the document must leave them alone in every output.

import {
    type BlockComponentProps,
    defineBlock,
    defineContent,
    definePlugin,
    type RtePlugin,
    styleOfClass,
} from '../../core';

import { BOXED_MARGIN, BOXED_TYPE } from './documentSpacingValues';
import styles from './ownMarginsPlugin.module.scss';

/** The attribute the block's markup is read back by. */
const BOXED_ATTRIBUTE = 'data-boxed';
const BOXED_MARKER = { [BOXED_ATTRIBUTE]: '' };

type BoxedProps = BlockComponentProps<Record<string, never>>;

const Boxed = ({ children, style, rootAttributes }: BoxedProps) => (
    <div {...rootAttributes} {...BOXED_MARKER} className={styles.boxed} style={style}>
        {children}
    </div>
);

export const ownMarginsPlugin: RtePlugin = definePlugin({
    id: BOXED_TYPE,
    content: defineContent({
        blocks: {
            [BOXED_TYPE]: defineBlock({
                content: 'text',
                ownsMargins: true,
                toHtml: () => ({ tag: 'div', attrs: { ...BOXED_MARKER, class: styles.boxed }, children: true }),
                parse: [{ tag: `div[${BOXED_ATTRIBUTE}]` }],
                render: { component: Boxed },
            }),
        },
        contentStyles: () => ({
            classes: styleOfClass(styles.boxed, { 'margin-top': BOXED_MARGIN, 'margin-bottom': BOXED_MARGIN }),
        }),
    }),
});
