/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef } from 'react';

import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { suggestionOptionId } from '#/runtime/suggestions/plugin';
import { keepFocus } from '#/ui/toolbar/item';

import styles from './styles/suggestions.module.scss';

/** What one option shows: its glyph, such as the emoji itself, then its label. */
export interface ListboxOption {
    readonly key: string;
    readonly label: string;
    readonly glyph: string | null;
}

/**
 * A listbox whose active option the element that keeps focus names with `aria-activedescendant`, as the WAI-ARIA
 * combobox pattern has it. The options take no focus; a press keeps focus where it is, a click picks the option, and a
 * pointer move over one makes it active. The active option scrolls into the list's own scrolling box.
 */
export const Listbox = ({
    id,
    label,
    options,
    index,
    onPick,
    onActivate,
    testId,
}: {
    readonly id: string;
    readonly label: string;
    readonly options: readonly ListboxOption[];
    /** The active option. */
    readonly index: number;
    readonly onPick: (index: number) => void;
    readonly onActivate: (index: number) => void;
    readonly testId: string;
}) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    useClientLayoutEffect(() => {
        const option = listRef.current?.children[index];
        if (option !== undefined) {
            option.scrollIntoView({ block: 'nearest' });
        }
    }, [index, options]);
    return (
        <div ref={listRef} id={id} role="listbox" aria-label={label} className={styles.listbox} data-test-id={testId}>
            {options.map((option, position) => (
                // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- the element that keeps focus owns the keys and names the active option.
                <div
                    key={option.key}
                    id={suggestionOptionId(id, option.key)}
                    role="option"
                    aria-selected={position === index}
                    className={styles.option}
                    onMouseDown={keepFocus}
                    onClick={() => onPick(position)}
                    onPointerMove={() => {
                        if (position !== index) {
                            onActivate(position);
                        }
                    }}
                >
                    {option.glyph !== null && (
                        <span className={styles.glyph} aria-hidden>
                            {option.glyph}
                        </span>
                    )}
                    <span className={styles.label}>{option.label}</span>
                </div>
            ))}
        </div>
    );
};
