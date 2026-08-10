/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Id of the synthetic root injected by `useTreeController`. `parseChildren` defaults
 * `parentId` to it — the two must agree or items won't link to the synthetic parent.
 */
export const ROOT_ID = 'root';

/** Display name of the synthetic root. Never rendered. */
export const ROOT_NAME = 'Root';

/**
 * Pixels per indent level, used by headless-tree for drag-line offsets and reparent
 * hit-testing. Must match the `1rem` step of `.indent` in `tree.module.scss`.
 */
export const INDENT_STEP_PX = 16;
