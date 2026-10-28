/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ColorPicker, Flyout } from '@frontify/fondue-components';
import { useState } from 'react';

import { type EditorApi, type OverlayProps, useEditorApi, useEditorOverlay } from '#/bridge/pluginApi/plugin';
import { type ColorToken, hexColor } from '#/model';

import { type ColorMark, type ColorMenuStrings, colorMenuStrings, SET_COMMANDS } from '../helpers/colorMenuModel';
import styles from '../styles/color.module.scss';

import { Swatches } from './Swatches';

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

/**
 * The colour of `mark` at the selection's start, its literal or its token's, which the picker's draft starts from,
 * else black.
 */
const startColor = (api: EditorApi, mark: ColorMark, tokens: readonly ColorToken[]): Rgba => {
    const black = { red: 0, green: 0, blue: 0, alpha: 1 };
    const attrs = api.marks.attrs(mark);
    let hex: string | undefined;
    if (typeof attrs?.value === 'string') {
        hex = attrs.value;
    } else if (typeof attrs?.tokenId === 'string') {
        const token = tokens.find(({ id }) => id === attrs.tokenId);
        // A token value may be any CSS colour, which the picker takes only as hex.
        if (token !== undefined) {
            hex = hexColor(token.value);
        }
    }

    if (hex === undefined) {
        return black;
    }

    return rgbaOf(hex);
};

type ColorDraftProps = {
    api: EditorApi;
    mark: ColorMark;
    tokens: readonly ColorToken[];
    strings: ColorMenuStrings;
    testId: string;
    onClose: () => void;
};

/** The draft of a literal colour: the Fondue `ColorPicker`, whose Save writes the mark as one undo step. */
const ColorDraft = ({ api, mark, tokens, strings, testId, onClose }: ColorDraftProps) => {
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

export type ColorMenuProps = OverlayProps & {
    /** Limits the menu to the tokens it names. */
    tokenIds: readonly string[] | undefined;
    /** `marks.font-color` takes any colour. */
    literalText: boolean;
};

/**
 * The "A" colour menu at the selection: text colours, highlight colours when `marks.highlight` is installed, and
 * Clear; with `literalColors`, a custom colour row opens the Fondue `ColorPicker` with a draft that only Save writes.
 */
export const ColorMenu = ({ tokenIds, literalText, close: onClose }: ColorMenuProps) => {
    const api = useEditorApi();
    const [custom, setCustom] = useState<ColorMark>();
    if (api === undefined) {
        return null;
    }

    const strings = colorMenuStrings(api.translate);
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

ColorMenu.displayName = 'ColorMenu';
