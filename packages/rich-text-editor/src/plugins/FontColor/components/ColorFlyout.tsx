/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ColorPicker, Flyout } from '@frontify/fondue-components';
import { IconDroplet } from '@frontify/fondue-icons';
import { type ReactNode, useState } from 'react';

import { type EditorControlApi } from '#/domain';

import { ToolbarButton } from '../../shared/ToolbarButton/ToolbarButton';
import { type FontColorValue } from '../FontColor';
import { parseCssColor, type RgbaColor, toCssColor } from '../helpers/colors';

import styles from './colorFlyout.module.scss';

/**
 * The colour control: a button carrying the selection's colour, and the picker
 * hung off it. What it shows comes from the document (the selection snapshot),
 * so the button says what the selection carries rather than what was last
 * picked in it.
 *
 * The picked colour reaches the document on save rather than while it is
 * dragged around the gradient: choosing a colour sweeps through dozens of them,
 * and none of those belong in the undo history.
 */
export const ColorFlyout = ({ api }: { api: EditorControlApi }): ReactNode => {
    // The snapshot's marks are untyped; this plugin knows what its own carries.
    const value = api.selection.get().marks.fontColor as Partial<FontColorValue> | undefined;
    const current = parseCssColor(value?.color);
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<RgbaColor | undefined>(undefined);

    // The flyout hands focus back to its own trigger as it closes, which would
    // take the caret away from the text the colour was just applied to.
    const close = (): void => {
        setOpen(false);
        requestAnimationFrame(() => api.focus());
    };

    const apply = (color: RgbaColor | undefined): void => {
        // A value-carrying mark has to be cleared before it can be re-set:
        // toggling on top of an existing colour would only remove it.
        if ('fontColor' in api.selection.get().marks) {
            api.marks.toggle('fontColor');
        }
        if (color !== undefined) {
            api.marks.toggle('fontColor', { color: toCssColor(color) });
        }
        close();
    };

    return (
        <Flyout.Root
            open={open}
            // Opening starts the draft on what the selection carries, so the
            // picker opens on the text's colour and cancelling changes nothing.
            onOpenChange={(next) => {
                if (next) {
                    setDraft(current);
                    setOpen(true);
                } else {
                    close();
                }
            }}
        >
            <Flyout.Trigger>
                <ToolbarButton active={current !== undefined} title="Text colour">
                    <span className={styles.trigger}>
                        <IconDroplet size={16} />
                        <span
                            aria-hidden
                            className={styles.swatch}
                            style={{ background: current === undefined ? 'transparent' : toCssColor(current) }}
                        />
                    </span>
                </ToolbarButton>
            </Flyout.Trigger>
            <Flyout.Content
                width="300px"
                // Focus belongs in the picker's own fields, not on the first
                // thing the flyout finds.
                onOpenAutoFocus={(event) => event.preventDefault()}
            >
                <Flyout.Header showCloseButton>Text colour</Flyout.Header>
                <Flyout.Body>
                    <div className={styles.picker}>
                        <ColorPicker.Root defaultFormat="HEX" currentColor={draft} onColorChange={setDraft}>
                            <ColorPicker.Values />
                            <ColorPicker.Gradient />
                        </ColorPicker.Root>
                    </div>
                </Flyout.Body>
                <Flyout.Footer>
                    {current !== undefined ? (
                        <Button emphasis="weak" onPress={() => apply(undefined)}>
                            Remove
                        </Button>
                    ) : null}
                    <Button emphasis="default" onPress={close}>
                        Cancel
                    </Button>
                    <Button disabled={draft === undefined} onPress={() => apply(draft)}>
                        Save
                    </Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>
    );
};
