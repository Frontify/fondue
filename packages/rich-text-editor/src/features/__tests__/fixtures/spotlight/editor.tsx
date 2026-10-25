/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout, Tooltip } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { useState } from 'react';

import {
    defineEditorPart,
    type EditorApi,
    type OverlayProps,
    type PanelComponentProps,
    type ToolbarControlProps,
    useEditorApi,
    useEditorOverlay,
    useEditorValue,
    useOverlayContainer,
} from '#/entries/authoring';
import { type ContentNodeJSON } from '#/model';

import { spotlight } from './feature';

const PANEL = 'fixture.spotlight';

const STRINGS: Readonly<
    Record<string, { readonly toggle: string; readonly panel: string; readonly count: (count: number) => string }>
> = {
    'en-US': { toggle: 'Spotlight', panel: 'Spotlit passages', count: (count) => `${count} spotlit passages` },
    'de-DE': {
        toggle: 'Hervorheben',
        panel: 'Hervorgehobene Stellen',
        count: (count) => `${count} hervorgehobene Stellen`,
    },
};

const stringsOf = (api: EditorApi | undefined) => STRINGS[api?.locale() ?? 'en-US'] ?? STRINGS['en-US'];

/** How many text runs of the stored document carry the mark. */
const spotlitIn = (node: ContentNodeJSON | undefined): number => {
    if (node === undefined) {
        return 0;
    }
    const own = node.marks?.some(({ type }) => type === 'fixture_spotlight') === true ? 1 : 0;
    return own + (node.content ?? []).reduce((sum, child) => sum + spotlitIn(child), 0);
};

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
const SpotlightNote = ({ close, anchor, opener }: OverlayProps) => {
    const [open, setOpen] = useState(true);
    const overlay = useEditorOverlay(open, (next) => {
        if (!next) {
            setOpen(false);
            close();
        }
    });
    return (
        <Flyout.Root
            open={open}
            onOpenChange={(next) => {
                if (!next) {
                    overlay.returnFocusTo(opener);
                }
                overlay.onOpenChange(next);
            }}
            virtualAnchor={anchor}
        >
            <Flyout.Content ref={overlay.contentRef} aria-label="Spotlight note" container={overlay.container}>
                <Flyout.Body>
                    <button type="button">Noted</button>
                </Flyout.Body>
            </Flyout.Content>
        </Flyout.Root>
    );
};

/** The plugin's own panel: the number of spotlit passages, read from the stored document when it opens. */
const SpotlightPanel = ({ close }: PanelComponentProps) => {
    const api = useEditorApi();
    const strings = stringsOf(api);
    const count = spotlitIn(api?.document().content);
    const panel = strings?.panel;
    const counted = strings?.count(count);
    return (
        <section aria-label={panel}>
            <p>{counted}</p>
            <button type="button" onClick={close}>
                {panel}
            </button>
        </section>
    );
};

/**
 * The editor part of `spotlight`, written only against the public API: a toggle command and its own toolbar control,
 * a command that opens an overlay from its own control, and a panel and its command.
 */
export const spotlightEditor = defineEditorPart(spotlight, {
    needs: ['marks', 'overlays', 'panels'],
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
        'fixture.spotlight.panel': {
            readOnly: true,
            run: (api) => {
                api.panels.toggle(PANEL);
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
        {
            id: 'panel',
            kind: 'toggle',
            command: 'fixture.spotlight.panel',
            label: { 'en-US': 'Spotlit passages', 'de-DE': 'Hervorgehobene Stellen' },
            icon: 'IconListIndented',
            panel: PANEL,
        },
    ],
    panels: [{ control: PANEL, component: SpotlightPanel }],
});
