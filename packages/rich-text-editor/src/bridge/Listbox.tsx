/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconMegaphone, IconPeople, IconPerson } from '@frontify/fondue-icons';
import { useRef } from 'react';

import { suggestionOptionId } from '#/runtime/capabilities/suggestions/optionId';

import { keepFocus } from './chromeToolbar';
import { useClientLayoutEffect } from './clientLayoutEffect';
import styles from './styles/listbox.module.scss';

/** What one option shows: its glyph, such as the emoji itself, or an image or icon, then its label and detail. */
export interface ListboxOption {
    readonly key: string;
    readonly label: string;
    readonly glyph: string | null;
    /** Text after the label, such as a mention's resource type. */
    readonly detail?: string;
    /** An image that passed `checkHref`, which an option with no glyph shows. */
    readonly imageUrl?: string;
    /** The icon an option with no glyph and no image shows. */
    readonly kind?: 'user' | 'group' | 'everyone';
}

const KIND_ICONS = { user: IconPerson, group: IconPeople, everyone: IconMegaphone } as const;

const Lead = ({ option }: { readonly option: ListboxOption }) => {
    if (option.glyph !== null) {
        return (
            <span className={styles.glyph} aria-hidden>
                {option.glyph}
            </span>
        );
    }
    if (option.imageUrl !== undefined) {
        return <img className={styles.image} src={option.imageUrl} alt="" referrerPolicy="no-referrer" />;
    }
    if (option.kind !== undefined) {
        const KindIcon = KIND_ICONS[option.kind];
        return (
            <span className={styles.icon} data-kind={option.kind}>
                <KindIcon size={16} aria-hidden />
            </span>
        );
    }
    return null;
};

/**
 * A listbox whose active option the element that keeps focus names with `aria-activedescendant`, as the WAI-ARIA
 * combobox pattern has it. The options take no focus; a press keeps focus where it is, a click picks the option, and a
 * pointer move over one makes it active. The active option scrolls into the list's own scrolling box. Labels and
 * details are isolated for bidirectional text, since they come from the host or the document.
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
                    <Lead option={option} />
                    <span className={styles.label}>
                        <bdi>{option.label}</bdi>
                    </span>
                    {option.detail !== undefined && (
                        <span className={styles.detail}>
                            <bdi>{option.detail}</bdi>
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};
