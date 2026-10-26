/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ColorPicker, Dropdown, Flyout } from '@frontify/fondue-components';
import { type CSSProperties, useEffect, useId, useRef, useState } from 'react';

import { CheckedSlot } from '#/bridge/define';
import { type EditorApi, type OverlayProps, useEditorApi, useEditorOverlay } from '#/bridge/plugin';
import { type CodecContext, type ColorToken, hexColor } from '#/model';

import styles from './styles/color.module.scss';

/** The command that sets each colour mark, and the one that removes both. */
const SET_COMMANDS = { font_color: 'mark.font-color.set', highlight: 'mark.highlight.set' } as const;
const CLEAR_COLOR = 'mark.color.clear';
type ColorMark = keyof typeof SET_COMMANDS;

/** The colour menu's strings, in the UI locale. */
type ColorMenuStrings = {
    label: string;
    textColors: string;
    highlightColors: string;
    clear: string;
    customText: string;
    customHighlight: string;
    save: string;
    cancel: string;
};

const colorMenuStrings = (t: CodecContext['t']): ColorMenuStrings => ({
    label: t('RichTextEditor_colorMenu'),
    textColors: t('RichTextEditor_textColors'),
    highlightColors: t('RichTextEditor_highlightColors'),
    clear: t('RichTextEditor_clearColor'),
    customText: t('RichTextEditor_customColor'),
    customHighlight: t('RichTextEditor_customHighlight'),
    save: t('RichTextEditor_colorPickerSave'),
    cancel: t('RichTextEditor_cancel'),
});

/** What the menu offers: the tokens for each mark, and which marks take any colour through the picker. */
type ColorMenuOptions = {
    tokens: readonly ColorToken[];
    /** `marks.highlight` is installed, so the menu offers its colours. */
    highlight: boolean;
    /** The marks whose feature has `literalColors` on. */
    literal: readonly ColorMark[];
};

type Rgba = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
};

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

/** The colour of `mark` at the selection's start, its literal or its token's, which the picker's draft starts from, else black. */
const startColor = (api: EditorApi, mark: ColorMark, tokens: readonly ColorToken[]): Rgba => {
    const black = { red: 0, green: 0, blue: 0, alpha: 1 };
    const attrs = api.marks.attrs(mark);
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
const Chip = ({ color }: { color: string }) => (
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
    label: string;
    description: string | undefined;
    color: string | undefined;
    checked: boolean;
    onSelect: (event: Event) => void;
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
    api,
    mark,
    tokens,
    strings,
    testId,
    onClose,
}: {
    api: EditorApi;
    mark: ColorMark;
    tokens: readonly ColorToken[];
    strings: ColorMenuStrings;
    testId: string;
    onClose: () => void;
}) => {
    const [open, setOpen] = useState(true);
    const [draft, setDraft] = useState(() => startColor(api, mark, tokens));
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
                            api.commands.execute(SET_COMMANDS[mark], { value: hexOf(draft) }, { focus: 'editor' });
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
    api,
    options,
    strings,
    testId,
    onCustom,
    onClose,
}: {
    api: EditorApi;
    options: ColorMenuOptions;
    strings: ColorMenuStrings;
    testId: string;
    onCustom: (mark: ColorMark) => void;
    onClose: () => void;
}) => {
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
    const run = (command: string, payload?: object) => {
        // The command moves focus to the editor first, which the overlay reads as a move that keeps the menu open.
        close(false);
        api.commands.execute(command, payload, { focus: 'editor' });
    };

    const groups: { mark: ColorMark; heading: string; custom: string }[] = [
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
                    // The literal colour that the whole selection holds, which checks the custom row.
                    let literal: string | undefined;
                    const value = api.marks.attrs(mark)?.value;
                    if (
                        options.literal.includes(mark) &&
                        typeof value === 'string' &&
                        api.marks.active(mark, { value }) === true
                    ) {
                        literal = value;
                    }

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
                                        checked={api.marks.active(mark, { tokenId: token.id }) === true}
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
    tokenIds,
    literalText,
    close: onClose,
}: OverlayProps & {
    /** Limits the menu to the tokens it names. */
    tokenIds: readonly string[] | undefined;
    /** `marks.font-color` takes any colour. */
    literalText: boolean;
}) => {
    const api = useEditorApi();
    const [custom, setCustom] = useState<ColorMark>();
    if (api === undefined) {
        return null;
    }

    const strings = colorMenuStrings(api.t);
    const testId = api.testId();
    let tokens = api.services.presentation().colorTokens;
    if (tokenIds !== undefined) {
        tokens = tokens.filter(({ id }) => tokenIds.includes(id));
    }

    const literal: ColorMark[] = [];
    if (literalText) {
        literal.push('font_color');
    }

    if (api.optionsOf('marks.highlight')?.literalColors === true) {
        literal.push('highlight');
    }

    const options = { tokens, highlight: api.marks.installed().includes('highlight'), literal };
    if (custom !== undefined) {
        return (
            <ColorDraft
                api={api}
                mark={custom}
                tokens={options.tokens}
                strings={strings}
                testId={testId}
                onClose={onClose}
            />
        );
    }

    // A custom row replaces the menu with the picker.
    return (
        <Swatches
            api={api}
            options={options}
            strings={strings}
            testId={testId}
            onCustom={setCustom}
            onClose={onClose}
        />
    );
};
