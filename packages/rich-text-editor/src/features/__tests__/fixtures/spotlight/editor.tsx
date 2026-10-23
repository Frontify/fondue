/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout, Tooltip } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { useState } from 'react';

import {
    defineEditorPlugin,
    type OverlayProps,
    type ToolbarControlProps,
    useEditorOverlay,
    useEditorValue,
    useOverlayContainer,
} from '#/index';

import { spotlight } from './feature';

/** The plugin's own toolbar control: a toggle that reads its state through the API, with its shortcut in its tooltip. */
const SpotlightButton = ({
    label,
    disabled,
    outOfTabOrder,
    controlRef,
    run,
    shortcut,
    keyshortcuts,
}: ToolbarControlProps) => {
    const container = useOverlayContainer();
    const active = useEditorValue((current) => current?.marks.active('fixture_spotlight') ?? false);
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <RadixToolbar.Button
                    ref={controlRef}
                    type="button"
                    aria-label={label}
                    aria-pressed={active}
                    aria-keyshortcuts={keyshortcuts}
                    disabled={disabled}
                    {...(outOfTabOrder ? { tabIndex: -1 } : {})}
                    data-test-id="fixture-spotlight-control"
                    onClick={() => run()}
                >
                    {label}
                </RadixToolbar.Button>
            </Tooltip.Trigger>
            <Tooltip.Content padding="compact" container={container}>
                {label}
                {shortcut !== undefined && <kbd>{shortcut}</kbd>}
            </Tooltip.Content>
        </Tooltip.Root>
    );
};

/** The plugin's own control of a command that opens an overlay. */
const NoteButton = ({ label, disabled, outOfTabOrder, controlRef, run }: ToolbarControlProps) => (
    <RadixToolbar.Button
        ref={controlRef}
        type="button"
        disabled={disabled}
        {...(outOfTabOrder ? { tabIndex: -1 } : {})}
        data-test-id="fixture-spotlight-note-control"
        onClick={() => run()}
    >
        {label}
    </RadixToolbar.Button>
);

/** The plugin's own overlay, which returns focus to the control that opened it when it is dismissed. */
const SpotlightNote = ({ close, anchor }: OverlayProps) => {
    const [open, setOpen] = useState(true);
    const overlay = useEditorOverlay(open, (next) => {
        if (!next) {
            setOpen(false);
            close();
        }
    });
    return (
        <Flyout.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={anchor}>
            <Flyout.Content ref={overlay.contentRef} aria-label="Spotlight note" container={overlay.container}>
                <Flyout.Body>
                    <button type="button">Noted</button>
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>
    );
};

/**
 * The editor part of `spotlight`, written only against the public API: a toggle command and its own toolbar control,
 * and a command that opens an overlay from its own control.
 */
export const spotlightEditor = defineEditorPlugin(spotlight, {
    commands: {
        'fixture.spotlight.toggle': {
            run: (api) => api.marks.toggle('fixture_spotlight'),
            active: (api) => api.marks.active('fixture_spotlight'),
        },
        'fixture.spotlight.note': {
            run: (api) => {
                api.overlays.open(SpotlightNote, {});
                return true;
            },
        },
    },
    keys: { 'Mod-Shift-l': 'fixture.spotlight.toggle' },
    toolbar: [
        {
            id: 'toggle',
            kind: 'toggle',
            command: 'fixture.spotlight.toggle',
            label: { 'en-US': 'Spotlight', 'de-DE': 'Hervorheben' },
            icon: 'IconTextFormatBold',
            bubble: true,
            control: SpotlightButton,
        },
        {
            id: 'note',
            kind: 'button',
            command: 'fixture.spotlight.note',
            label: { 'en-US': 'Spotlight note', 'de-DE': 'Hervorhebungsnotiz' },
            icon: 'IconTextFormatBold',
            opensOverlay: true,
            control: NoteButton,
        },
    ],
});
