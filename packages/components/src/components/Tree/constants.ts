/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Shared constants for the Tree component. These belong here (not inline) because
 * they cross module boundaries: `parseChildren` defaults a node's `parentId` to
 * `ROOT_ID`, while `useTreeController` injects a synthetic root with the same id —
 * the two must agree or items won't be linked to the synthetic parent.
 */

/** Id of the synthetic root item injected by `useTreeController`. */
export const ROOT_ID = 'root';

/** Display name of the synthetic root. Internal — never rendered. */
export const ROOT_NAME = 'Root';

/**
 * Pixels per indent level. Used by headless-tree for `getDragLineData`'s leftOffset
 * and for hit-testing reparent gestures. Must match the `1rem` step applied by
 * `.indent` in `tree.module.scss`.
 */
export const INDENT_STEP_PX = 16;
