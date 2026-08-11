/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type ReactNode } from 'react';

import styles from '../richTextEditor.module.scss';
import { type EditorControlApi, type RtePlugin } from '../types';

/** The plugins' toolbar UI, in mount order. Nothing at all when no plugin has any. */
export const Toolbar = ({ plugins, api }: { plugins: RtePlugin[]; api: EditorControlApi }): ReactNode => {
    if (!plugins.some((plugin) => plugin.toolbar)) {
        return null;
    }

    return (
        <div role="toolbar" className={styles.toolbar}>
            {plugins.map((plugin) =>
                plugin.toolbar ? <Fragment key={plugin.id}>{plugin.toolbar(api)}</Fragment> : null,
            )}
        </div>
    );
};
