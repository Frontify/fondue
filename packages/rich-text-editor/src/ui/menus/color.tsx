/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ColorPicker, Dropdown, Flyout } from '@frontify/fondue-components';
import { type CSSProperties, useContext, useEffect, useId, useRef, useState } from 'react';

import { SessionContext } from '#/bridge/hooks';
import { useEditorOverlay } from '#/bridge/overlays';
import { hexColor } from '#/clipboard/import/colors';
import { type ColorToken } from '#/model';
import { type EditorRuntime } from '#/runtime/runtime';
import { CheckedSlot } from '#/ui/toolbar/item';

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

/** The attributes of `mark` at the selection's start, in the stored marks at a caret. */
const heldAttrs = (
    runtime: EditorRuntime | undefined,
    mark: ColorMark,
): Readonly<Record<string, unknown>> | undefined => {
    const view = runtime?.view;
    if (view === undefined) {
        return undefined;
    }
    const { selection, storedMarks } = view.state;
    return (storedMarks ?? selection.$from.marks()).find((held) => held.type.name === mark)?.attrs;
};

/** The literal colour of `mark` at the selection's start, if it holds one. */
const literalAt = (runtime: EditorRuntime | undefined, mark: ColorMark): string | undefined => {
    const value = heldAttrs(runtime, mark)?.value;
    if (typeof value !== 'string') {
        return undefined;
    }
    return value;
};

/** The colour of `mark` at the selection's start, its literal or its token's, which the picker's draft starts from, else black. */
const startColor = (runtime: EditorRuntime | undefined, mark: ColorMark, tokens: readonly ColorToken[]): Rgba => {
    const black = { red: 0, green: 0, blue: 0, alpha: 1 };
    const attrs = heldAttrs(runtime, mark);
    let hex: string | undefined;
    if (typeof attrs?.value === 'string') {
        hex = attrs.value;
    } else if (typeof attrs?.tokenId === 'string') {
        const token = tokens.find(({ id }) => id === attrs.tokenId);
        // A token value may be any CSS colour, which the picker takes only as hex.
        hex = token === undefined ? undefined : hexColor(token.value);
    }
    if (hex === undefined) {
        return black;
    }
    return rgbaOf(hex);
};

/** A colour as a filled chip with a border, over a checkerboard that shows its translucency. */
const Chip = ({ color }: { readonly color: string }) => (
    <span
        className={styles.chip}
        style={{ '--rte-chip-color': color } as CSSProperties}
        data-rte-swatch=""
        aria-hidden
    />
);

/** A row of the colour menu, a `menuitemradio` named `label` and described by `description`, with a check mark when checked. */
const ColorRow = ({
    label,
    description,
    color,
    checked,
    onSelect,
}: {
    readonly label: string;
    readonly description: string | undefined;
    readonly color: string | undefined;
    readonly checked: boolean;
    readonly onSelect: (event: Event) => void;
}) => {
    const descriptionId = useId();
    let describedBy: string | undefined;
    if (description !== undefined) {
        describedBy = descriptionId;
    }
    return (
        <Dropdown.Item
            // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
            {...{
                role: 'menuitemradio',
                'aria-checked': checked,
                'aria-label': label,
                'aria-describedby': describedBy,
            }}
            onSelect={onSelect}
        >
            <span className={styles.swatch}>
                {color !== undefined && <Chip color={color} />}
                <span>{label}</span>
                {description !== undefined && (
                    <span id={descriptionId} className={styles.description}>
                        {description}
                    </span>
                )}
            </span>
            {checked && <CheckedSlot />}
        </Dropdown.Item>
    );
};

/** The draft of a literal colour: the Fondue `ColorPicker`, whose Save writes the mark as one undo step. */
const ColorDraft = ({
    mark,
    tokens,
    strings,
    testId,
    onClose,
}: {
    readonly mark: ColorMark;
    readonly tokens: readonly ColorToken[];
    readonly strings: ColorMenuStrings;
    readonly testId: string;
    readonly onClose: () => void;
}) => {
    const runtime = useContext(SessionContext);
    const [open, setOpen] = useState(true);
    const [draft, setDraft] = useState(() => startColor(runtime, mark, tokens));
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
                    <div className={styles.draft}>
                        <ColorPicker.Root currentColor={draft} onColorChange={setDraft} defaultFormat="HEX">
                            <ColorPicker.Values />
                            <ColorPicker.Gradient />
                        </ColorPicker.Root>
                    </div>
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

/**
 * Names the hidden trigger of a virtually anchored menu, whose `aria-labelledby` on the content names the menu over
 * its `aria-label`.
 */
const nameTrigger = (content: HTMLElement | null, label: string) => {
    const triggerId = content?.getAttribute('aria-labelledby');
    if (content === null || triggerId === null || triggerId === undefined) {
        return;
    }
    const root = content.getRootNode() as Document | ShadowRoot;
    root.getElementById(triggerId)?.setAttribute('aria-label', label);
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
    const holds = (mark: ColorMark, payload: object) =>
        runtime !== undefined && runtime.handle.query(SET_COMMANDS[mark], payload).active === true;
    /** The literal colour of `mark` that the whole selection holds, which checks the custom row. */
    const literalOf = (mark: ColorMark) => {
        const value = literalAt(runtime, mark);
        if (value === undefined || !holds(mark, { value })) {
            return undefined;
        }
        return value;
    };
    const run = (command: string, payload?: object) => {
        // The command moves focus to the editor first, which the overlay reads as a move that keeps the menu open.
        close(false);
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
                    nameTrigger(element, strings.label);
                }}
                aria-label={strings.label}
                container={overlay.container}
                data-test-id={`${testId}-color-menu`}
            >
                {groups.map(({ mark, heading, custom }) => {
                    const literal = options.literal.includes(mark) ? literalOf(mark) : undefined;
                    return (
                        <Dropdown.Group key={mark} heading={heading}>
                            {options.tokens
                                .filter((token) => token.usage.includes(mark))
                                .map((token) => (
                                    <ColorRow
                                        key={token.id}
                                        label={token.label}
                                        description={token.value}
                                        color={token.value}
                                        checked={holds(mark, { tokenId: token.id })}
                                        onSelect={() => run(SET_COMMANDS[mark], { tokenId: token.id })}
                                    />
                                ))}
                            {options.literal.includes(mark) && (
                                <ColorRow
                                    label={custom}
                                    description={literal}
                                    color={literal}
                                    checked={literal !== undefined}
                                    onSelect={(event) => {
                                        event.preventDefault();
                                        onCustom(mark);
                                    }}
                                />
                            )}
                        </Dropdown.Group>
                    );
                })}
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
        return <ColorDraft mark={custom} tokens={options.tokens} strings={strings} testId={testId} onClose={onClose} />;
    }
    // A custom row replaces the menu with the picker.
    return <Swatches options={options} strings={strings} testId={testId} onCustom={setCustom} onClose={onClose} />;
};
