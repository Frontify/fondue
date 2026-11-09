/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The words the editor's own UI says, visibly or to assistive technology. A
 * host passes the ones it translates (`labels` on the editor); the rest stay
 * English. Plugins name their own controls through their options.
 */
export type RichTextEditorLabels = {
    /** The editor's accessible name when the host gives none (`aria-label`, `aria-labelledby`). */
    editor: string;
    /** The formatting toolbar's accessible name. */
    toolbar: string;
    /** The built-in command turning a block back into plain text. */
    text: string;
    /** The "Turn into" button's tooltip, and the `/` menu's heading over the same commands. */
    turnInto: string;
    /** The "Turn into" button's accessible name, naming what the block is now. */
    turnIntoCurrent: (blockLabel: string) => string;
    /** A "Turn into" entry for what the block already is. */
    currentCommand: (commandLabel: string) => string;
    /** The `/` menu's heading over commands that insert something. */
    insert: string;
    /** The `/` menu's list, for assistive technology. */
    commands: string;
    /** Shown and announced when nothing matches what was typed after the `/`. */
    noResults: string;
    /** Announced as the `/` menu narrows, when something matches. */
    commandCount: (count: number) => string;
    /**
     * Shown in place of the editor when it crashed, below its read-only content when that can be shown.
     * It names the `retry` button, so translate the two together.
     */
    editorFailed: string;
    /** The button that mounts the editor again after it crashed. */
    retry: string;
    /** Shown above a document a newer version of the editor saved, which is shown read-only; left out when the host sets `readonly`. */
    newerVersion: string;
};

export const DEFAULT_LABELS: RichTextEditorLabels = {
    editor: 'Rich text editor',
    toolbar: 'Formatting',
    text: 'Text',
    turnInto: 'Turn into',
    turnIntoCurrent: (blockLabel) => `Turn into: ${blockLabel}`,
    currentCommand: (commandLabel) => `${commandLabel}, current`,
    insert: 'Insert',
    commands: 'Commands',
    noResults: 'No results',
    commandCount: (count) => `${count} ${count === 1 ? 'command' : 'commands'}`,
    editorFailed: 'The editor stopped working. Try again to load it.',
    retry: 'Try again',
    newerVersion: 'This content was saved with a newer version of the editor. Try reloading the page to edit it.',
};
