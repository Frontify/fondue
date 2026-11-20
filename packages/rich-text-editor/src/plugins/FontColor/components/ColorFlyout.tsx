/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ColorPicker, Flyout } from '@frontify/fondue-components';
import { IconDroplet } from '@frontify/fondue-icons';
import { type ComponentProps, type ReactNode, useId, useRef, useState } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot, type ToolbarItemProps } from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

import { useFocusAfterClose } from '../../shared/hooks/useFocusAfterClose';
import {
    decodeStoredColor,
    encodeStoredColor,
    type FontColorValue,
    OPAQUE_ALPHA,
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
    // Whether a colour was dragged or typed since opening. The value alone cannot
    // say: white typed over uncoloured text equals the white the picker starts at.
    const choseRef = useRef(false);
    const switchingFormatRef = useRef(false);

    const { returnToText, contentProps } = useFocusAfterClose(api);

    // The colour typing would use, not the run beside the caret: at the edge between two colours they differ.
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
        // Unchosen, the draft can be the picker's white start, which must not overwrite an unreadable stored colour.
        if (!choseRef.current || encodePickerColor(draft) === storedColor) {
            close();
            return;
        }
        apply(draft);
    };

    // The picker reports the colour it already shows right after a format switch: not a choice.
    const choose = (color: PickerColor): void => {
        if (switchingFormatRef.current) {
            switchingFormatRef.current = false;
        } else {
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
            <Flyout.Content {...contentProps} width="300px" onEscapeKeyDown={returnToText} aria-labelledby={titleId}>
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
                    {/* Enter in a field saves, as in a form. The listener only catches what bubbles from the picker. */}
                    {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <div
                        className={styles.picker}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
                                event.preventDefault();
                                save();
                            }
                        }}
                    >
                        <ColorPicker.Root
                            defaultFormat="HEX"
                            currentColor={draft}
                            onColorChange={choose}
                            onFormatChange={() => {
                                switchingFormatRef.current = true;
                            }}
                        >
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
