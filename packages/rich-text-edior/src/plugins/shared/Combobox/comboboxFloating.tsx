/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorControlApi, type FloatingSpec } from '#/RichTextEditor';

import { Combobox, type ComboboxItem } from './Combobox';

/** How many choices are offered at once. */
const DEFAULT_LIMIT = 8;

/**
 * A trigger-anchored picker, ready to drop into a plugin's `floating`:
 *
 * ```tsx
 * floating: [comboboxFloating({ trigger: '@', label: 'Mentions', items, onSelect })]
 * ```
 *
 * The editor anchors it and routes the keys; this fills in the half that every
 * picker shares — filtering down to a list, and showing nothing when the query
 * matches nothing.
 */
export const comboboxFloating = ({
    trigger,
    label,
    items,
    onSelect,
    limit = DEFAULT_LIMIT,
}: {
    /** The character that opens it, e.g. `@`. */
    trigger: string;
    /** What the list is called, for screen readers. */
    label: string;
    /** Choices for what has been typed after the trigger. Called on every keystroke. */
    items: (query: string) => readonly ComboboxItem[];
    /** Insert the choice. The trigger and its query are already gone from the document. */
    onSelect: (item: ComboboxItem, api: EditorControlApi) => void;
    limit?: number;
}): FloatingSpec => ({
    anchor: { trigger },
    render: (context) => {
        const found = items(context.query).slice(0, limit);
        return found.length === 0 ? null : (
            <Combobox context={context} items={found} label={label} onSelect={onSelect} />
        );
    },
});

export { type ComboboxItem } from './Combobox';
