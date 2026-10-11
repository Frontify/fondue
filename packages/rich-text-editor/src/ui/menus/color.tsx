/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ColorPicker, Dropdown, Flyout } from '@frontify/fondue-components';
import { useContext, useEffect, useId, useRef, useState } from 'react';

import { SessionContext } from '#/bridge/hooks';
import { useEditorOverlay } from '#/bridge/overlays';
import { type ColorToken } from '#/model';
import { type EditorRuntime } from '#/runtime/runtime';

import styles from './styles/color.module.scss';

/** The command that sets each colour mark, and the one that removes both. */
const SET_COMMANDS = { font_color: 'mark.font-color.set', highlight: 'mark.highlight.set' } as const;
export const CLEAR_COLOR = 'mark.color.clear';
type ColorMark = keyof typeof SET_COMMANDS;

/** The colour menu's strings, in the UI locale. */
export interface ColorMenuStrings {
    readonly label: string;
    readonly textColors: string;
    readonly highlightColors: string;
    readonly clear: string;
    readonly customText: string;
    readonly customHighlight: string;
    readonly save: string;
    readonly cancel: string;
}

/** What the menu offers: the tokens for each mark, and which marks take any colour through the picker. */
export interface ColorMenuOptions {
    readonly tokens: readonly ColorToken[];
    /** `marks.highlight` is installed, so the menu offers its colours. */
    readonly highlight: boolean;
    /** The marks whose feature has `literalColors` on. */
    readonly literal: readonly ColorMark[];
}

interface Rgba {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}

const channel = (value: number) =>
    Math.min(255, Math.max(0, Math.round(value)))
        .toString(16)
        .padStart(2, '0');

/** A picked colour as the `#rrggbb`, or `#rrggbbaa` when translucent, that a `color` value stores. */
export const hexOf = ({ red, green, blue, alpha }: Rgba): string => {
    const hex = `#${channel(red)}${channel(green)}${channel(blue)}`;
    if (alpha === undefined || alpha >= 1) {
        return hex;
    }
    return `${hex}${channel(alpha * 255)}`;
};

const rgbaOf = (hex: string): Rgba => {
    const byte = (index: number) => Number.parseInt(hex.slice(index, index + 2), 16);
    const color: Rgba = { red: byte(1), green: byte(3), blue: byte(5), alpha: 1 };
    if (hex.length === 9) {
        color.alpha = Math.round((byte(7) / 255) * 100) / 100;
    }
    return color;
};

/** The literal colour of `mark` at the selection's start, which the picker's draft starts from, else black. */
const startColor = (runtime: EditorRuntime | undefined, mark: ColorMark): Rgba => {
    const view = runtime?.view;
    const black = { red: 0, green: 0, blue: 0, alpha: 1 };
    if (view === undefined) {
        return black;
    }
    const { selection, storedMarks } = view.state;
    const found = (storedMarks ?? selection.$from.marks()).find((held) => held.type.name === mark);
    if (found === undefined || typeof found.attrs.value !== 'string') {
        return black;
    }
    return rgbaOf(found.attrs.value);
};

const Swatch = ({
    token,
    mark,
    checked,
    onPick,
}: {
    readonly token: ColorToken;
    readonly mark: ColorMark;
    readonly checked: boolean;
    readonly onPick: () => void;
}) => {
    const descriptionId = useId();
    let sample: Readonly<Record<string, string>> = { color: token.value };
    if (mark === 'highlight') {
        sample = { backgroundColor: token.value };
    }
    return (
        <Dropdown.Item
            // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
            {...{
                role: 'menuitemradio',
                'aria-checked': checked,
                'aria-label': token.label,
                'aria-describedby': descriptionId,
            }}
            onSelect={onPick}
        >
            <span className={styles.swatch}>
                <span className={styles.sample} style={sample} aria-hidden>
                    A
                </span>
                <span>{token.label}</span>
                <span id={descriptionId} className={styles.description}>
                    {token.value}
                </span>
            </span>
        </Dropdown.Item>
    );
};

/** The draft of a literal colour: the Fondue `ColorPicker`, whose Save writes the mark as one undo step. */
const ColorDraft = ({
    mark,
    strings,
    testId,
    onClose,
}: {
    readonly mark: ColorMark;
    readonly strings: ColorMenuStrings;
    readonly testId: string;
    readonly onClose: () => void;
}) => {
    const runtime = useContext(SessionContext);
    const [open, setOpen] = useState(true);
    const [draft, setDraft] = useState(() => startColor(runtime, mark));
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };
    const overlay = useEditorOverlay(open, close);
    let title = strings.customText;
    if (mark === 'highlight') {
        title = strings.customHighlight;
    }
    return (
        <Flyout.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Flyout.Content
                ref={overlay.contentRef}
                // Radix gives the content `role="dialog"`, which `Flyout` passes this name to.
                aria-label={title}
                container={overlay.container}
                side="bottom"
                align="start"
                padding="tight"
                data-test-id={`${testId}-color-picker`}
            >
                <Flyout.Body>
                    <ColorPicker.Root currentColor={draft} onColorChange={setDraft} defaultFormat="HEX">
                        <ColorPicker.Values />
                        <ColorPicker.Gradient />
                    </ColorPicker.Root>
                </Flyout.Body>
                <Flyout.Footer>
                    <Button emphasis="default" onPress={() => close(false)}>
                        {strings.cancel}
                    </Button>
                    <Button
                        emphasis="strong"
                        onPress={() => {
                            runtime?.handle.execute(SET_COMMANDS[mark], { value: hexOf(draft) }, { focus: 'editor' });
                            close(false);
                        }}
                    >
                        {strings.save}
                    </Button>
                </Flyout.Footer>
            </Flyout.Content>
        </Flyout.Root>
    );
};

/** The swatches of the colour menu, focusing the checked one on open, else the first. */
const Swatches = ({
    options,
    strings,
    testId,
    onCustom,
    onClose,
}: {
    readonly options: ColorMenuOptions;
    readonly strings: ColorMenuStrings;
    readonly testId: string;
    readonly onCustom: (mark: ColorMark) => void;
    readonly onClose: () => void;
}) => {
    const runtime = useContext(SessionContext);
    const [open, setOpen] = useState(true);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const close = (next: boolean) => {
        if (!next) {
            setOpen(false);
            onClose();
        }
    };
    const overlay = useEditorOverlay(open, close);
    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const content = contentRef.current;
            if (content === null) {
                return;
            }
            let target = content.querySelector<HTMLElement>('[role="menuitemradio"][aria-checked="true"]');
            if (target === null) {
                target = content.querySelector<HTMLElement>('[role^="menuitem"]');
            }
            target?.focus();
        });
        return () => cancelAnimationFrame(frame);
    }, []);
    const checked = (mark: ColorMark, token: ColorToken) =>
        runtime !== undefined && runtime.handle.query(SET_COMMANDS[mark], { tokenId: token.id }).active === true;
    const run = (command: string, payload?: object) => {
        runtime?.handle.execute(command, payload, { focus: 'editor' });
    };
    const groups: { readonly mark: ColorMark; readonly heading: string; readonly custom: string }[] = [
        { mark: 'font_color', heading: strings.textColors, custom: strings.customText },
    ];
    if (options.highlight) {
        groups.push({ mark: 'highlight', heading: strings.highlightColors, custom: strings.customHighlight });
    }
    return (
        <Dropdown.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Dropdown.Content
                ref={(element) => {
                    contentRef.current = element;
                    overlay.contentRef(element);
                }}
                aria-label={strings.label}
                container={overlay.container}
                data-test-id={`${testId}-color-menu`}
            >
                {groups.map(({ mark, heading, custom }) => (
                    <Dropdown.Group key={mark} heading={heading}>
                        {options.tokens
                            .filter((token) => token.usage.includes(mark))
                            .map((token) => (
                                <Swatch
                                    key={token.id}
                                    token={token}
                                    mark={mark}
                                    checked={checked(mark, token)}
                                    onPick={() => run(SET_COMMANDS[mark], { tokenId: token.id })}
                                />
                            ))}
                        {options.literal.includes(mark) && (
                            <Dropdown.Item
                                onSelect={(event) => {
                                    event.preventDefault();
                                    onCustom(mark);
                                }}
                            >
                                {custom}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Group>
                ))}
                <Dropdown.Item onSelect={() => run(CLEAR_COLOR)}>{strings.clear}</Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    );
};

/**
 * The "A" colour menu at the selection: text colours, highlight colours when `marks.highlight` is installed, and
 * Clear; with `literalColors`, a custom colour row opens the Fondue `ColorPicker` with a draft that only Save writes.
 */
export const ColorMenu = ({
    options,
    strings,
    testId,
    onClose,
}: {
    readonly options: ColorMenuOptions;
    readonly strings: ColorMenuStrings;
    readonly testId: string;
    /** Runs once the menu, or the picker it opened, closes. */
    readonly onClose: () => void;
}) => {
    const [custom, setCustom] = useState<ColorMark>();
    if (custom !== undefined) {
        return <ColorDraft mark={custom} strings={strings} testId={testId} onClose={onClose} />;
    }
    // A custom row replaces the menu with the picker.
    return <Swatches options={options} strings={strings} testId={testId} onCustom={setCustom} onClose={onClose} />;
};
