/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type MouseEvent, type ReactNode } from 'react';

import { classNames } from '../helpers/classNames';
import styles from '../richTextEditor.module.scss';
import { type EditorControlApi, type RtePlugin, type ToolbarPlacement } from '../types';

/**
 * A click that lands on the toolbar but misses a control would still move focus,
 * and with it take away the selection every control is about to act on. The
 * controls keep their own clicks — each already decides what to do with them.
 */
const keepSelection = (event: MouseEvent<HTMLDivElement>): void => {
    if (!(event.target as HTMLElement).closest('button, input, [role="combobox"]')) {
        event.preventDefault();
    }
};

/** The plugins' toolbar UI, in mount order. Nothing at all when no plugin has any. */
export const Toolbar = ({
    plugins,
    api,
    placement,
}: {
    plugins: RtePlugin[];
    api: EditorControlApi;
    /** Only the strip inside the frame is drawn as one — a floating bar is a surface of its own. */
    placement: ToolbarPlacement;
}): ReactNode => {
    if (!plugins.some((plugin) => plugin.toolbar)) {
        return null;
    }

    return (
        <div
            role="toolbar"
            // Reachable only in code, never by tabbing: the controls inside are
            // what a keyboard moves between, and the strip holding them is not a
            // stop of its own.
            tabIndex={-1}
            onMouseDown={keepSelection}
            className={classNames(styles.toolbar, placement === 'top' && styles.toolbarTop)}
        >
            {plugins.map((plugin) =>
                plugin.toolbar ? <Fragment key={plugin.id}>{plugin.toolbar(api)}</Fragment> : null,
            )}
        </div>
    );
};
