/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ColorPicker, Flyout } from '@frontify/fondue-components';
import { IconDroplet } from '@frontify/fondue-icons';
import { type ReactNode, useId, useRef, useState } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot } from '#/core';

import { useFocusAfterClose } from '../../shared/hooks/useFocusAfterClose';
import { ToolbarButton } from '../../shared/ToolbarButton/ToolbarButton';
import { type FontColorValue, isCssColor, parseCssColor, type RgbaColor, toCssColor } from '../helpers/colors';

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

/** What the picker shows when it is given no colour. */
const PICKER_DEFAULT: RgbaColor = { red: 255, green: 255, blue: 255, alpha: 1 };

/** The colour typed in the picker's hex field. The field reports only on blur, so Enter and Save read it directly. */
const typedHex = (container: HTMLElement | null, alpha: number | undefined): RgbaColor | undefined => {
    const field = container?.querySelector<HTMLInputElement>('input[type="text"]');
    const parsed = parseCssColor(field ? `#${field.value.replace(/^#/, '')}` : undefined);
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
    // Coloured text may carry a colour the picker cannot read (`red`, `hsl()`
    // pasted in): it is still coloured, and still removable.
    const hasColor = 'fontColor' in selection.marks;
    const current = parseCssColor(value?.color);
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<RgbaColor | undefined>(undefined);
    const titleId = useId();
    const pickerRef = useRef<HTMLDivElement | null>(null);
    // Whether a colour was picked or typed since opening: the picker shows white for uncoloured text, which is no choice.
    const choseRef = useRef(false);

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
        if (!choseRef.current || picked === undefined) {
            close();
            return;
        }
        // The text's own colour chosen again changes nothing.
        if (current !== undefined && toCssColor(picked) === toCssColor(current)) {
            close();
            return;
        }
        apply(picked);
    };

    // One the picker cannot read still shows as written, when it is a colour at all.
    const currentCss =
        current === undefined ? (isCssColor(value?.color) ? value.color : undefined) : toCssColor(current);

    return (
        <Flyout.Root
            open={open}
            // The draft starts at the text's colour, so cancelling changes nothing.
            onOpenChange={(next) => {
                if (next) {
                    choseRef.current = false;
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
                    title={currentCss === undefined ? 'Text colour' : `Text colour: ${currentCss.toUpperCase()}`}
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
                            choseRef.current = true;
                            if (target.matches('input[type="text"]') && /^#?[\dA-Fa-f]{6}$/.test(target.value)) {
                                setDraft(typedHex(pickerRef.current, draft?.alpha));
                            }
                        }}
                    >
                        <ColorPicker.Root
                            defaultFormat="HEX"
                            currentColor={draft}
                            onColorChange={(color) => {
                                // A format switch or the hex field's blur re-reports the shown colour, which is no choice.
                                if (toCssColor(color) !== toCssColor(draft ?? PICKER_DEFAULT)) {
                                    choseRef.current = true;
                                }
                                setDraft(color);
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
