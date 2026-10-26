/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconMegaphone, IconPeople, IconPerson } from '@frontify/fondue-icons';
import { type ReactNode, useRef } from 'react';

import { suggestionOptionId } from '#/runtime/capabilities/suggestions/optionId';

import { keepFocus } from './chromeToolbar';
import { useClientLayoutEffect } from './clientLayoutEffect';
import styles from './styles/listbox.module.scss';

/** What one option shows: its glyph, such as the emoji itself, or an image or icon, then its label and detail. */
export type ListboxOption = {
    readonly key: string;
    readonly label: string;
    readonly glyph: string | null;
    /** Text after the label, such as a mention's resource type. */
    readonly detail?: string;
    /** An image that passed `checkHref`, which an option with no glyph shows. */
    readonly imageUrl?: string;
    /** The icon an option with no glyph and no image shows. */
    readonly kind?: 'user' | 'group' | 'everyone';
    /** The heading of the group the option sits under; neighbours with the same one share a group, and options with none sit outside any. */
    readonly group?: string;
};

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
        // Groups wrap their options, so the options are not the list's own children.
        const option = listRef.current?.querySelectorAll('[role="option"]')[index];
        if (option !== undefined) {
            option.scrollIntoView({ block: 'nearest' });
        }
    }, [index, options]);
    const render = (option: ListboxOption, position: number) => (
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
    );
    const children: ReactNode[] = [];
    for (let position = 0; position < options.length; position += 1) {
        const option = options[position] as ListboxOption;
        const { group } = option;
        if (group === undefined) {
            children.push(render(option, position));
            continue;
        }

        // The heading is decoration: the group's own name is what a screen reader hears.
        const run: ReactNode[] = [];
        let end = position;
        while (end < options.length && options[end]?.group === group) {
            run.push(render(options[end] as ListboxOption, end));
            end += 1;
        }

        children.push(
            <div key={`group-${position}`} role="group" aria-label={group}>
                <div className={styles.heading} aria-hidden>
                    <bdi>{group}</bdi>
                </div>
                {run}
            </div>,
        );
        position = end - 1;
    }

    return (
        <div ref={listRef} id={id} role="listbox" aria-label={label} className={styles.listbox} data-test-id={testId}>
            {children}
        </div>
    );
};
