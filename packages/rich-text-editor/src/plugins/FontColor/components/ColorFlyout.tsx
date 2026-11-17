/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ColorPicker, Flyout } from '@frontify/fondue-components';
import { IconDroplet } from '@frontify/fondue-icons';
import { type ComponentProps, type ReactNode, useId, useRef, useState } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot, type ToolbarItemProps } from '#/core';
import { type RichTextStringKey } from '#/locales/types';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';
import { useTranslate } from '#/ui/translation';

import { useFocusAfterClose } from '../../shared/hooks/useFocusAfterClose';
import {
    decodeStoredColor,
    encodeStoredColor,
    type FontColorValue,
    OPAQUE_ALPHA,
    parseTypedHex,
    type Rgba,
    toColorName,
    toStoredColor,
} from '../helpers/colors';

import styles from './colorFlyout.module.scss';

/** The picker's colour type, derived from the component because Fondue does not export it. */
type PickerColor = NonNullable<ComponentProps<typeof ColorPicker.Root>['currentColor']>;

/** The picker's colour as the document stores it; alpha is filled in, since the picker leaves it out when opaque. */
const encodePickerColor = (color: PickerColor): string =>
    encodeStoredColor({ ...color, alpha: color.alpha ?? OPAQUE_ALPHA });

/** The hex field inside the picker. */
const HEX_FIELD_SELECTOR = 'input[type="text"]';

/** One-click colours. Fondue has no text palette, so these are our own, each at least 4.5:1 on white. */
type ColorPreset = { name: RichTextStringKey; color: string };

const PRESETS: readonly ColorPreset[] = [
    { name: 'RichTextEditor_colorGray', color: '#5f6368' },
    { name: 'RichTextEditor_colorRed', color: '#c5221f' },
    { name: 'RichTextEditor_colorOrange', color: '#b45309' },
    { name: 'RichTextEditor_colorGreen', color: '#188038' },
    { name: 'RichTextEditor_colorBlue', color: '#1a73e8' },
    { name: 'RichTextEditor_colorPurple', color: '#8430ce' },
];

/** What the picker starts at on text with no one colour: white, as Fondue's picker does without one. */
const NO_COLOR_DRAFT: PickerColor = { red: 255, green: 255, blue: 255, alpha: 1 };

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
    const translate = useTranslate();
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
    const storedColor = toStoredColor(value?.color);
    let currentColor: Rgba | undefined;
    let title = label;
    if (storedColor !== undefined) {
        currentColor = decodeStoredColor(storedColor);
        title = translate('RichTextEditor_controlValue', { label, value: toColorName(currentColor) });
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
        // Unchosen, the draft can be the picker's white start, which must not overwrite an unreadable stored colour.
        if (!choseRef.current || encodePickerColor(draft) === storedColor) {
            close();
            return;
        }
        apply(draft);
    };

    // The picker also reports the colour it shows on a format switch: not a choice.
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
                    <fieldset className={styles.presets} aria-label={translate('RichTextEditor_suggestedColors')}>
                        {PRESETS.map(({ name, color }) => (
                            <button
                                key={color}
                                type="button"
                                aria-label={translate(name)}
                                title={translate(name)}
                                className={styles.preset}
                                style={{ background: color }}
                                onClick={() => apply(decodeStoredColor(color))}
                            />
                        ))}
                    </fieldset>
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
                            const target = event.target;
                            if (!(target instanceof HTMLInputElement) || !target.matches(HEX_FIELD_SELECTOR)) {
                                return;
                            }
                            // A valid hex is a choice even when it equals the draft, which `choose` ignores.
                            if (readHexField(pickerRef.current, draft.alpha) !== undefined) {
                                choseRef.current = true;
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
                            {translate('RichTextEditor_remove')}
                        </Button>
                    ) : null}
                    <Button emphasis="default" onPress={close}>
                        {translate('RichTextEditor_cancel')}
                    </Button>
                    <Button onPress={save}>{translate('RichTextEditor_save')}</Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>
    );
};
