/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ColorPicker, Flyout } from '@frontify/fondue-components';
import { IconDroplet } from '@frontify/fondue-icons';
import { type ComponentProps, type ReactNode, useId, useRef, useState } from 'react';

import {
    decodeStoredColor,
    type EditorControlApi,
    encodeStoredColor,
    isStoredColor,
    OPAQUE_ALPHA,
    type Rgba,
    type RteSelectionSnapshot,
    type ToolbarItemProps,
} from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

import { useFocusAfterClose } from '../../shared/hooks/useFocusAfterClose';
import { type FontColorValue, isCompleteHex, parseTypedHex, toColorName } from '../helpers/colors';

import styles from './colorFlyout.module.scss';

/** The picker's colour type, derived from the component because Fondue does not export it. */
type PickerColor = NonNullable<ComponentProps<typeof ColorPicker.Root>['currentColor']>;

/** The picker's colour as the document stores it; alpha is filled in, since the picker leaves it out when opaque. */
const encodePickerColor = (color: PickerColor): string =>
    encodeStoredColor({ ...color, alpha: color.alpha ?? OPAQUE_ALPHA });

/** The hex field inside the picker. */
const HEX_FIELD_SELECTOR = 'input[type="text"]';

/** One-click colours. Fondue has no text palette, so these are our own, each at least 4.5:1 on white. */
const PRESETS: readonly { name: string; color: string }[] = [
    { name: 'Grey', color: '#5f6368' },
    { name: 'Red', color: '#c5221f' },
    { name: 'Orange', color: '#b45309' },
    { name: 'Green', color: '#188038' },
    { name: 'Blue', color: '#1a73e8' },
    { name: 'Purple', color: '#8430ce' },
];

/** What the picker starts at on text with no one colour: white, as Fondue's picker does without one. */
const NO_COLOR_DRAFT: PickerColor = { red: 255, green: 255, blue: 255, alpha: 1 };

/** The colour typed in the picker's hex field. The field reports only on blur, so Enter and Save read it directly. */
const readHexField = (container: HTMLElement | null, alpha: number | undefined): PickerColor | undefined => {
    const text = container?.querySelector<HTMLInputElement>(HEX_FIELD_SELECTOR)?.value;
    return parseTypedHex(text, alpha);
};

type ColorFlyoutProps = {
    selection: RteSelectionSnapshot;
    api: EditorControlApi;
    /**
     * The control's name, for its button and the flyout's header
     */
    label: string;
    /** Whether the selection carries a colour; `'mixed'` when only part of it does. */
    isActive: ToolbarItemProps['isActive'];
};

/**
 * The colour control: a toolbar button showing the selection's colour, with the
 * picker in a flyout. The colour reaches the document on save, not while
 * dragging, so the undo history gets one step per choice.
 */
export const ColorFlyout = ({ selection, api, label, isActive }: ColorFlyoutProps): ReactNode => {
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<PickerColor>(NO_COLOR_DRAFT);
    const titleId = useId();
    const pickerRef = useRef<HTMLDivElement | null>(null);
    // Whether a colour was dragged or typed since opening. The value alone cannot
    // say: white typed over uncoloured text equals the white the picker starts at.
    const choseRef = useRef(false);

    const { returnToText, contentProps } = useFocusAfterClose(api);

    const fontColor = selection.marks.fontColor;
    let value: Partial<FontColorValue> | undefined;
    // A half-coloured selection has no one colour to show.
    if (fontColor?.coverage === 'all') {
        value = fontColor.value;
    }
    // A stored value that is no colour shows none, and is still removable.
    const hasColor = isActive !== false;
    const markColor = value?.color;
    let storedColor: string | undefined;
    let currentColor: Rgba | undefined;
    let title = label;
    if (isStoredColor(markColor)) {
        storedColor = markColor;
        currentColor = decodeStoredColor(storedColor);
        title += `: ${toColorName(currentColor)}`;
    }
    // Closing from inside the flyout returns focus to the text.
    const close = (): void => {
        returnToText();
        setOpen(false);
    };

    const apply = (color: PickerColor | undefined): void => {
        if (color === undefined) {
            api.marks.remove('fontColor');
        } else {
            api.marks.set('fontColor', { color: encodePickerColor(color) });
        }
        close();
    };

    const save = (): void => {
        const picked = readHexField(pickerRef.current, draft.alpha) ?? draft;
        // Nothing picked or typed: an unreadable colour would otherwise be
        // overwritten with the white the picker starts at.
        if (!choseRef.current || encodePickerColor(picked) === storedColor) {
            close();
            return;
        }
        apply(picked);
    };

    // The picker also reports the colour it shows, on blur and on a format switch: not a choice.
    const choose = (color: PickerColor): void => {
        if (encodePickerColor(color) !== encodePickerColor(draft)) {
            choseRef.current = true;
        }
        setDraft(color);
    };

    return (
        <Flyout.Root
            open={open}
            // The draft starts at the text's colour, so cancelling changes nothing.
            onOpenChange={(next) => {
                if (next) {
                    choseRef.current = false;
                    setDraft(currentColor ?? NO_COLOR_DRAFT);
                    setOpen(true);
                } else {
                    setOpen(false);
                }
            }}
        >
            <Flyout.Trigger>
                <ToolbarButton
                    active={isActive}
                    // The swatch is visual only, so the colour goes in the name.
                    title={title}
                >
                    <span className={styles.trigger}>
                        <IconDroplet size={TOOLBAR_ICON_SIZE} />
                        <span
                            aria-hidden
                            className={styles.swatch}
                            style={{ background: storedColor ?? 'transparent' }}
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
                    pickerRef.current?.querySelector<HTMLInputElement>(HEX_FIELD_SELECTOR)?.focus();
                }}
            >
                <Flyout.Header>
                    <span id={titleId}>{label}</span>
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
                                onClick={() => apply(decodeStoredColor(color))}
                            />
                        ))}
                    </div>
                    {/* Listens for Enter and typing in the hex field, which reports only on blur. */}
                    {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <div
                        ref={pickerRef}
                        className={styles.picker}
                        onKeyDown={(event) => {
                            const target = event.target;
                            if (event.key !== 'Enter' || !(target instanceof HTMLElement)) {
                                return;
                            }
                            if (target.matches(HEX_FIELD_SELECTOR)) {
                                event.preventDefault();
                                save();
                            }
                        }}
                        onInput={(event) => {
                            // A complete hex value updates the picker at once; a partial one waits.
                            const target = event.target;
                            if (!(target instanceof HTMLInputElement) || !target.matches(HEX_FIELD_SELECTOR)) {
                                return;
                            }
                            // A readable hex is a choice; an unfinished one after it keeps that choice.
                            if (readHexField(pickerRef.current, draft.alpha) !== undefined) {
                                choseRef.current = true;
                            }
                            if (isCompleteHex(target.value)) {
                                setDraft(readHexField(pickerRef.current, draft.alpha) ?? draft);
                            }
                        }}
                    >
                        <ColorPicker.Root defaultFormat="HEX" currentColor={draft} onColorChange={choose}>
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
