/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CompiledDefinition } from '#/definition';
import { type CodecContext, type CommandRef, type JsonValue, type PresentationStyle, type ToolbarEntry } from '#/model';
import { compiledModel } from '#/model/compile';
import { canonicalJson } from '#/model/hash';
import { isPlatformBinding } from '#/model/platform';
import { cssValue, isPresentationStyle } from '#/model/styles';
import { refusesLevel, setsHeading } from '#/runtime/policy';
import { type AuthoringPolicy } from '#/runtime/types';
import { type LinkBubbleStrings } from '#/ui/links/link-bubble';
import { type LinkPopoverStrings, type LinkStyleOption } from '#/ui/links/link-popover';
import { type ColorMenuStrings } from '#/ui/menus/color';
import { type NumberingStrings } from '#/ui/menus/numbering';
import { type MentionSearchStrings } from '#/ui/suggestions/mention-search';
import { type ToolbarItem } from '#/ui/toolbar/toolbar';

import { type ReactPresentation } from './types';

type ButtonEntry = Exclude<ToolbarEntry, { readonly kind: 'menu' }>;

/** The control ID of the text style picker in a presentation's toolbar. */
const TEXT_STYLE = 'text-style';
// The picker's rows, in order: Normal text, the heading levels, then Quote, then Code block.
const TEXT_STYLE_COMMANDS = ['paragraph.set', 'heading.set', 'quote.toggle', 'code-block.toggle'];
/** The command of the picker's brand style rows, which `styles.brand` installs. */
export const SET_STYLE = 'block.style.set';
// The block types a picker row can style, and the font properties its row previews.
const STYLED_BLOCKS = new Set(['paragraph', 'heading']);
const PREVIEW = ['fontFamily', 'fontSize', 'fontWeight'] as const;

/**
 * The font family, size and weight a brand style row previews, never its colour or background, on a unitless line
 * height, so the row grows to hold a large font.
 */
const previewOf = ({ recipe }: PresentationStyle): Readonly<Record<string, string>> => {
    const preview: Record<string, string> = {};
    for (const name of PREVIEW) {
        const value = cssValue(name, recipe[name]);
        if (value !== undefined) {
            preview[name] = value;
        }
    }
    preview.lineHeight = '1.25';
    return preview;
};

/**
 * The manifest label for `lang` by RFC 4647 lookup, without subtags from the end until a tag matches, else `en-US`,
 * which every manifest label holds.
 */
const manifestLabel = (label: Readonly<Record<string, string>>, lang: string): string => {
    // Language tags match case-insensitively (RFC 4647, section 2).
    const byTag = new Map(Object.entries(label).map(([tag, text]) => [tag.toLowerCase(), text]));
    for (let tag = lang.toLowerCase(); tag !== ''; tag = tag.slice(0, Math.max(tag.lastIndexOf('-'), 0))) {
        const found = byTag.get(tag);
        if (found !== undefined) {
            return found;
        }
    }
    return label['en-US'] ?? '';
};

type Keymap = ReturnType<typeof compiledModel>['keymap'];

/**
 * Where a binding applies: a plain one not on the platform whose `mac:` or `other:` binding of the same key, in the same
 * keymap, the editor runs instead.
 */
const applying = (binding: Keymap[number], keymap: Keymap): readonly string[] => {
    if (isPlatformBinding(binding.key)) {
        return [binding.key];
    }
    const replaced = (platform: 'mac' | 'other') =>
        keymap.some(({ plugin, key }) => plugin === binding.plugin && key === `${platform}:${binding.key}`);
    const onApple = !replaced('mac');
    const onOther = !replaced('other');
    if (onApple && onOther) {
        return [binding.key];
    }
    if (onApple) {
        return [`mac:${binding.key}`];
    }
    if (onOther) {
        return [`other:${binding.key}`];
    }
    return [];
};

const payloadKey = (payload: JsonValue | null | undefined) => {
    if (payload === undefined) {
        return canonicalJson(null);
    }
    return canonicalJson(payload);
};

type Commands = ReturnType<typeof compiledModel>['commands'];

/** Whether the policy lets the author create nothing with the feature of `command`. */
const refusedBy = (authoring: AuthoringPolicy, commands: Commands, command: string) => {
    const compiled = commands.find(({ id }) => id === command);
    return compiled !== undefined && authoring.features[compiled.featureId]?.create === false;
};

/** Whether `command` opens a package-built control rather than changing the document. */
const opensControl = (commands: Commands, command: string) =>
    commands.some(({ id, definition }) => id === command && definition.capability === 'openControl');

/** The compiled key bindings of a route, each where it applies. */
const bindingsOf = (keymap: Keymap, command: string, payload: JsonValue | undefined) =>
    keymap
        .filter((binding) => binding.command === command && payloadKey(binding.payload) === payloadKey(payload))
        .flatMap((binding) => applying(binding, keymap));

const routeOf = (ref: CommandRef) => {
    if (typeof ref === 'string') {
        return { command: ref, payload: undefined };
    }
    return { command: ref.command, payload: ref.payload };
};

/**
 * The presentation's toolbar groups as items, in order, each with its feature's one registry label and icon unless
 * the presentation's `controls` replace them.
 * A command the definition does not install, that has no toolbar entry, or whose feature the policy lets the author
 * create nothing with has no item. The bubble toolbar shows the groups that
 * toggle a mark.
 */
export const toolbarItems = (
    engine: CompiledDefinition,
    authoring: AuthoringPolicy,
    presentation: ReactPresentation | undefined,
    t: CodecContext['t'],
    /** The UI locale's language tag, which picks a data manifest's label. */
    lang: string,
): readonly ToolbarItem[] => {
    if (presentation === undefined) {
        return [];
    }
    const { features, keymap, commands } = compiledModel(engine.model);
    const entries: ButtonEntry[] = [];
    for (const { declaration, options } of features) {
        for (const entry of declaration.toolbar ?? []) {
            const { when } = entry;
            const holds = when === undefined || payloadKey(options[when.option]) === payloadKey(when.equals);
            if (holds && entry.kind !== 'menu') {
                entries.push(entry);
            }
        }
    }
    const marks = (ref: CommandRef) =>
        commands.some(({ id, definition }) => id === routeOf(ref).command && definition.capability === 'toggleMark');
    const runnable = (command: string) => engine.commands.has(command) && !refusedBy(authoring, commands, command);
    /** The item of one entry, with the presentation's label and icon for its command. */
    const itemOf = (entry: ButtonEntry, groupStart: boolean, bubble: boolean): ToolbarItem => {
        const { command, payload } = entry;
        let label: string;
        if (entry.label === undefined) {
            label = t(entry.labelKey as `RichTextEditor_${string}`);
        } else {
            label = manifestLabel(entry.label, lang);
        }
        let { icon } = entry;
        const control = presentation.controls?.[command];
        if (control !== undefined) {
            if (control.labelKey !== undefined) {
                label = t(control.labelKey as `RichTextEditor_${string}`);
            }
            icon = control.icon ?? icon;
        }
        const bindings = bindingsOf(keymap, command, payload);
        const key = `${command} ${payloadKey(payload)}`;
        return {
            key,
            command,
            payload,
            toggle: entry.kind === 'toggle',
            label,
            icon,
            bindings,
            groupStart,
            bubble,
            opensControl: opensControl(commands, command),
        };
    };
    // A heading level the policy cannot create only names a stored heading.
    const offered = ({ command, payload }: ButtonEntry) => {
        const compiled = commands.find(({ id }) => id === command);
        return compiled === undefined || !setsHeading(compiled.definition) || !refusesLevel(authoring, payload);
    };
    /** The brand style rows: the default style, then each style that is not deprecated and applies to a styled block type. */
    const brandRows = (defaults: readonly ButtonEntry[]) => {
        const styles = presentation.styles.filter(
            (style) =>
                isPresentationStyle(style) &&
                style.deprecated !== true &&
                style.appliesTo.some((type) => STYLED_BLOCKS.has(type)),
        );
        if (!runnable(SET_STYLE) || styles.length === 0) {
            return [];
        }
        const rows: (ToolbarItem & { readonly offered: boolean })[] = defaults.map((entry) => ({
            ...itemOf(entry, false, false),
            offered: true,
            brand: { appliesTo: [...STYLED_BLOCKS], preview: {} },
        }));
        for (const style of styles) {
            const payload = { styleId: style.id };
            rows.push({
                key: `${SET_STYLE} ${payloadKey(payload)}`,
                command: SET_STYLE,
                payload,
                toggle: true,
                label: style.label,
                icon: '',
                bindings: [],
                groupStart: false,
                bubble: false,
                offered: true,
                brand: { appliesTo: style.appliesTo, preview: previewOf(style) },
            });
        }
        return rows;
    };
    const items: ToolbarItem[] = [];
    for (const group of presentation.toolbar) {
        let groupStart = items.length > 0;
        const bubble = group.some(marks);
        for (const ref of group) {
            const { command, payload } = routeOf(ref);
            if (command === TEXT_STYLE) {
                const options = TEXT_STYLE_COMMANDS.flatMap((id) => entries.filter((entry) => entry.command === id))
                    .filter((entry) => runnable(entry.command))
                    .map((entry) => ({ ...itemOf(entry, false, false), offered: offered(entry) }));
                options.push(...brandRows(entries.filter((entry) => entry.command === SET_STYLE)));
                if (options.some((option) => option.offered) && !items.some((item) => item.key === TEXT_STYLE)) {
                    const label = t('RichTextEditor_textStyle');
                    items.push({
                        key: TEXT_STYLE,
                        command,
                        payload,
                        toggle: false,
                        label,
                        icon: '',
                        bindings: [],
                        groupStart,
                        bubble,
                        options,
                        groupLabel: t('RichTextEditor_brandStyles'),
                    });
                    groupStart = false;
                }
                continue;
            }
            const key = `${command} ${payloadKey(payload)}`;
            const entry = entries.find(
                (candidate) => candidate.command === command && payloadKey(candidate.payload) === payloadKey(payload),
            );
            if (entry === undefined || !runnable(command) || items.some((item) => item.key === key)) {
                continue;
            }
            items.push(itemOf(entry, groupStart, bubble));
            groupStart = false;
        }
    }
    return items;
};

/** The numbering dialog's strings in the UI locale. */
export const numberingStrings = (t: CodecContext['t']): NumberingStrings => ({
    title: t('RichTextEditor_startNumbering'),
    field: t('RichTextEditor_startNumberingField'),
    range: (min, max) => t('RichTextEditor_startNumberingRange', { min, max }),
    apply: t('RichTextEditor_apply'),
    cancel: t('RichTextEditor_cancel'),
});

/**
 * The More rows of the key routes a feature labels and the toolbar does not show, such as Move up and Move down, so
 * each is reachable without its shortcut.
 */
export const menuItems = (
    engine: CompiledDefinition,
    authoring: AuthoringPolicy,
    items: readonly ToolbarItem[],
    t: CodecContext['t'],
): readonly ToolbarItem[] => {
    const { features, keymap, commands } = compiledModel(engine.model);
    const shown = new Set(items.flatMap((item) => [item, ...(item.options ?? [])]).map(({ key }) => key));
    const rows: ToolbarItem[] = [];
    for (const { declaration } of features) {
        for (const ref of Object.values(declaration.keys ?? {})) {
            if (typeof ref === 'string' || ref.labelKey === undefined || !engine.commands.has(ref.command)) {
                continue;
            }
            const { command, payload } = ref;
            const key = `${command} ${payloadKey(payload)}`;
            if (refusedBy(authoring, commands, command) || shown.has(key) || rows.some((row) => row.key === key)) {
                continue;
            }
            const bindings = bindingsOf(keymap, command, payload);
            const label = t(ref.labelKey as `RichTextEditor_${string}`);
            rows.push({
                key,
                command,
                payload,
                toggle: false,
                label,
                icon: '',
                bindings,
                groupStart: false,
                bubble: false,
            });
        }
        // A command that opens a control has no key, so its toolbar entry names its row, as Start numbering at does.
        for (const entry of declaration.toolbar ?? []) {
            const key = `${entry.command} ${payloadKey(undefined)}`;
            if (
                !opensControl(commands, entry.command) ||
                !engine.commands.has(entry.command) ||
                refusedBy(authoring, commands, entry.command)
            ) {
                continue;
            }
            if (shown.has(key) || rows.some((row) => row.key === key)) {
                continue;
            }
            rows.push({
                key,
                command: entry.command,
                payload: undefined,
                toggle: false,
                label: t(entry.labelKey as `RichTextEditor_${string}`),
                icon: entry.icon,
                bindings: [],
                groupStart: false,
                bubble: false,
                opensControl: true,
            });
        }
    }
    return rows;
};

/** The colour menu's strings in the UI locale. */
/** The mention list's and the mention search dialog's strings from the chrome's `t`. */
export const mentionStrings = (t: CodecContext['t']): MentionSearchStrings => ({
    label: t('RichTextEditor_mentionSuggestions'),
    loading: t('RichTextEditor_mentionLoading'),
    noResults: t('RichTextEditor_mentionNoResults'),
    failed: t('RichTextEditor_mentionFailed'),
    loadMore: t('RichTextEditor_mentionLoadMore'),
    retry: t('RichTextEditor_retry'),
    results: (count) => t('RichTextEditor_mentionResults', { count }),
    option: ({ label, detail }, position, total) => {
        if (detail === undefined) {
            return t('RichTextEditor_suggestionOption', { label, position, total });
        }
        return t('RichTextEditor_mentionOption', { label, type: detail, position, total });
    },
    both: (first, second) => t('RichTextEditor_announceBoth', { first, second }),
    title: t('RichTextEditor_mention'),
    search: t('RichTextEditor_mentionSearch'),
    cancel: t('RichTextEditor_cancel'),
});

export const colorMenuStrings = (t: CodecContext['t']): ColorMenuStrings => ({
    label: t('RichTextEditor_colorMenu'),
    textColors: t('RichTextEditor_textColors'),
    highlightColors: t('RichTextEditor_highlightColors'),
    clear: t('RichTextEditor_clearColor'),
    customText: t('RichTextEditor_customColor'),
    customHighlight: t('RichTextEditor_customHighlight'),
    save: t('RichTextEditor_colorPickerSave'),
    cancel: t('RichTextEditor_cancel'),
});

/** The link popover's strings in the UI locale. */
export const linkPopoverStrings = (t: CodecContext['t']): LinkPopoverStrings => ({
    title: t('RichTextEditor_link'),
    destination: t('RichTextEditor_linkDestination'),
    text: t('RichTextEditor_linkText'),
    newWindow: t('RichTextEditor_linkOpenInNewWindow'),
    style: t('RichTextEditor_linkStyle'),
    noStyle: t('RichTextEditor_linkStyleNone'),
    invalid: t('RichTextEditor_linkInvalid'),
    schemesAllowed: (schemes) => t('RichTextEditor_linkSchemesAllowed', { schemes }),
    hostsAllowed: (hosts) => t('RichTextEditor_linkHostsAllowed', { hosts }),
    failed: t('RichTextEditor_linkFailed'),
    removed: t('RichTextEditor_linkTextRemoved'),
    insertNew: t('RichTextEditor_linkInsertNew'),
    results: t('RichTextEditor_linkResults'),
    result: (label, position, total) => t('RichTextEditor_suggestionOption', { label, position, total }),
    apply: t('RichTextEditor_apply'),
});

/** The link bubble's strings in the UI locale. */
export const linkBubbleStrings = (t: CodecContext['t']): LinkBubbleStrings => ({
    label: t('RichTextEditor_link'),
    open: t('RichTextEditor_linkOpenInNewTab'),
    edit: t('RichTextEditor_linkEdit'),
    copy: t('RichTextEditor_linkCopy'),
    remove: t('RichTextEditor_linkRemove'),
    copied: t('RichTextEditor_linkCopied'),
});

/** The presentation styles the link popover offers: each that applies to links and is not deprecated. */
export const linkStylesOf = (styles: readonly PresentationStyle[]): readonly LinkStyleOption[] =>
    styles
        .filter((style) => isPresentationStyle(style) && style.deprecated !== true && style.appliesTo.includes('link'))
        .map(({ id, label }) => ({ id, label }));
