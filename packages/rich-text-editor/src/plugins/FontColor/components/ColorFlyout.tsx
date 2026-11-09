/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ColorPicker, Flyout } from '@frontify/fondue-components';
import { IconDroplet } from '@frontify/fondue-icons';
import { type ReactNode, useId, useRef, useState } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot } from '#/core';

import { useFocusAfterClose } from '../../shared/hooks/useFocusAfterClose';
import { ToolbarButton } from '../../shared/ToolbarButton/ToolbarButton';
import {
    decodeStoredColor,
    type FontColorValue,
    parseCssColor,
    readStoredColor,
    type RgbaColor,
    toCssColor,
} from '../helpers/colors';

import styles from './colorFlyout.module.scss';

/** One-click colours. Fondue has no text palette, so these are our own, each at least 4.5:1 on white. */
const PRESETS: readonly { name: string; color: string }[] = [
    { name: 'Grey', color: '#5f6368' },
    { name: 'Red', color: '#c5221f' },
    { name: 'Orange', color: '#b45309' },
    { name: 'Green', color: '#188038' },
    { name: 'Blue', color: '#1a73e8' },
    { name: 'Purple', color: '#8430ce' },
];

/** The colour typed in the picker's hex field. The field reports only on blur, so Enter and Save read it directly. */
const typedHex = (container: HTMLElement | null, alpha: number | undefined): RgbaColor | undefined => {
    const typed = container?.querySelector<HTMLInputElement>('input[type="text"]')?.value.replace(/^#/, '');
    // The field takes three or six digits; anything else is its error state, not a colour.
    if (typed === undefined || !/^([\dA-Fa-f]{3}){1,2}$/.test(typed)) {
        return undefined;
    }
    const parsed = parseCssColor(`#${typed}`);
    return parsed === undefined ? undefined : { ...parsed, alpha: alpha ?? 1 };
};

/**
 * The colour control: a toolbar button showing the selection's colour, with the
 * picker in a flyout. The colour reaches the document on save, not while
 * dragging, so the undo history gets one step per choice.
 */
export const ColorFlyout = ({
    selection,
    api,
}: {
    selection: RteSelectionSnapshot;
    api: EditorControlApi;
}): ReactNode => {
    const value = selection.marks.fontColor as Partial<FontColorValue> | undefined;
    // A stored value that is no colour shows none, and is still removable.
    const hasColor = 'fontColor' in selection.marks;
    const currentCss = readStoredColor(value?.color);
    let current: RgbaColor | undefined;
    if (currentCss !== undefined) {
        current = decodeStoredColor(currentCss);
    }
    // Named as hex, then the opacity while translucent, as the picker's fields read.
    let colorName: string | undefined;
    if (current !== undefined) {
        colorName = toCssColor({ ...current, alpha: 1 }).toUpperCase();
        if (current.alpha !== undefined && current.alpha < 1) {
            colorName += ` ${Math.round(current.alpha * 100)}%`;
        }
    }
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<RgbaColor | undefined>(undefined);
    const titleId = useId();
    const pickerRef = useRef<HTMLDivElement | null>(null);
    // What the picker showed when it opened, so Save without a choice changes nothing.
    const openedWithRef = useRef<string | undefined>(undefined);

    const { returnToText, contentProps } = useFocusAfterClose(api);
    // Closing from inside the flyout returns focus to the text.
    const close = (): void => {
        returnToText();
        setOpen(false);
    };

    const apply = (color: RgbaColor | undefined): void => {
        if (color === undefined) {
            api.marks.toggle('fontColor');
        } else {
            api.marks.set('fontColor', { color: toCssColor(color) });
        }
        close();
    };

    const save = (): void => {
        const picked = typedHex(pickerRef.current, draft?.alpha) ?? draft;
        // Nothing picked or typed: an unreadable colour would otherwise be
        // overwritten with whatever the picker fell back to showing.
        if (picked === undefined || toCssColor(picked) === openedWithRef.current) {
            close();
            return;
        }
        apply(picked);
    };

    return (
        <Flyout.Root
            open={open}
            // The draft starts at the text's colour, so cancelling changes nothing.
            onOpenChange={(next) => {
                if (next) {
                    setDraft(current);
                    setOpen(true);
                } else {
                    setOpen(false);
                }
            }}
        >
            <Flyout.Trigger>
                <ToolbarButton
                    active={hasColor}
                    // The swatch is visual only, so the colour goes in the name.
                    title={colorName === undefined ? 'Text colour' : `Text colour: ${colorName}`}
                >
                    <span className={styles.trigger}>
                        <IconDroplet size={16} />
                        <span
                            aria-hidden
                            className={styles.swatch}
                            style={{ background: currentCss ?? 'transparent' }}
                        />
                    </span>
                </ToolbarButton>
            </Flyout.Trigger>
            <Flyout.Content
                {...contentProps}
                width="300px"
                onEscapeKeyDown={returnToText}
                aria-labelledby={titleId}
                // The hex field is the one input a keyboard can pick a colour with.
                onOpenAutoFocus={(event) => {
                    event.preventDefault();
                    const shown = typedHex(pickerRef.current, current?.alpha);
                    openedWithRef.current = shown === undefined ? undefined : toCssColor(shown);
                    pickerRef.current?.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
                }}
            >
                <Flyout.Header>
                    <span id={titleId}>Text colour</span>
                </Flyout.Header>
                <Flyout.Body>
                    <div className={styles.presets} role="group" aria-label="Suggested colours">
                        {PRESETS.map(({ name, color }) => (
                            <button
                                key={color}
                                type="button"
                                aria-label={name}
                                title={name}
                                className={styles.preset}
                                style={{ background: color }}
                                onClick={() => apply(parseCssColor(color))}
                            />
                        ))}
                    </div>
                    {/* Listens for Enter and typing in the hex field, which reports only on blur. */}
                    {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <div
                        ref={pickerRef}
                        className={styles.picker}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && (event.target as HTMLElement).matches('input[type="text"]')) {
                                event.preventDefault();
                                save();
                            }
                        }}
                        onInput={(event) => {
                            // A complete hex value updates the picker at once; a partial one waits.
                            const target = event.target as HTMLInputElement;
                            if (target.matches('input[type="text"]') && /^#?[\dA-Fa-f]{6}$/.test(target.value)) {
                                setDraft(typedHex(pickerRef.current, draft?.alpha));
                            }
                        }}
                    >
                        <ColorPicker.Root defaultFormat="HEX" currentColor={draft} onColorChange={setDraft}>
                            <ColorPicker.Values />
                            <ColorPicker.Gradient />
                        </ColorPicker.Root>
                    </div>
                </Flyout.Body>
                <Flyout.Footer>
                    {hasColor ? (
                        <Button emphasis="weak" onPress={() => apply(undefined)}>
                            Remove
                        </Button>
                    ) : null}
                    <Button emphasis="default" onPress={close}>
                        Cancel
                    </Button>
                    <Button onPress={save}>Save</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>
    );
};
