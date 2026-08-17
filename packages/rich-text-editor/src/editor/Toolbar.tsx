/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type MouseEvent, type ReactNode } from 'react';

import { type EditorControlApi, type RtePlugin } from '#/core';

import styles from './richTextEditor.module.scss';

/**
 * Where the plugins' toolbar is drawn. A presentation choice the host makes for
 * the whole editor, so it is a prop rather than part of the plugin contract: a
 * plugin contributes controls and never learns where they end up.
 *
 * - `'floating'` — a detached bar hovering above the editor, overlaying whatever is
 *   up there rather than taking a row of the page for itself.
 * - `'top'` — a strip inside the editor's frame, above the text.
 */
export type ToolbarPlacement = 'floating' | 'top';

/**
 * A click landing on the toolbar but missing a control would still move focus,
 * and with it the selection every control is about to act on. The controls keep
 * their own clicks.
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
            // Reachable only in code, never by tabbing: a keyboard moves
            // between the controls inside, not to the strip holding them.
            tabIndex={-1}
            onMouseDown={keepSelection}
            className={styles.toolbar}
            // Where the bar ended up, for the stylesheet to read.
            data-placement={placement}
        >
            {plugins.map((plugin) =>
                plugin.toolbar ? <Fragment key={plugin.id}>{plugin.toolbar(api)}</Fragment> : null,
            )}
        </div>
    );
};
