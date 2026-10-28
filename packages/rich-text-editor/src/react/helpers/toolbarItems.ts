/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPart, type PluginToolbarEntry } from '#/bridge/pluginApi/plugin';
import {
    type CodecContext,
    type CommandRef,
    type JsonValue,
    type PresentationStyle,
    isPresentationStyle,
} from '#/model';
import { canonicalJson, isPlatformBinding, cssValue } from '#/model/internal';
import { type CompiledDefinition } from '#/runtime/definition';
import { type AuthoringPolicy } from '#/runtime/port';
import { type ToolbarItem } from '#/ui/helpers/items';

import { type ReactPresentation } from '../types';

import { toolbarGroups } from './toolbarGroups';

type ButtonEntry = Omit<PluginToolbarEntry, 'labelKey' | 'label'> & {
    labelKey: string;
    label?: Readonly<Record<string, string>>;
};

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
 * The plugin label for `lang` by RFC 4647 lookup, without subtags from the end until a tag matches, else `en-US`,
 * which every plugin label holds.
 */
export const translatedLabel = (label: Readonly<Record<string, string>>, lang: string): string => {
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

type Keymap = CompiledDefinition['keymap'];

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

/** A stable text for a payload, so two routes of the same command and payload compare equal. */
const payloadKey = (payload: JsonValue | null | undefined) => {
    if (payload === undefined) {
        return canonicalJson(null);
    }

    return canonicalJson(payload);
};

/** Whether the policy lets the author create nothing with the feature of `command`. */
const refusedBy = (authoring: AuthoringPolicy, engine: CompiledDefinition, command: string) => {
    const featureId = engine.commands.get(command)?.featureId;

    return featureId !== undefined && authoring.features[featureId]?.create === false;
};

/** The compiled key bindings of a route, each where it applies. */
const bindingsOf = (keymap: Keymap, command: string, payload: JsonValue | undefined) =>
    keymap
        .filter((binding) => binding.command === command && payloadKey(binding.payload) === payloadKey(payload))
        .flatMap((binding) => applying(binding, keymap));

/** The command and payload of a toolbar group's entry, which is a bare command ID or a `{ command, payload }` item. */
const routeOf = (ref: CommandRef) => {
    if (typeof ref === 'string') {
        return { command: ref, payload: undefined };
    }

    return { command: ref.command, payload: ref.payload };
};

/** The engine, policy, presentation and entries `toolbarItems` derives once. */
type ToolbarItemsContext = {
    engine: CompiledDefinition;
    authoring: AuthoringPolicy;
    presentation: ReactPresentation;
    translate: CodecContext['translate'];
    lang: string;
    entries: ButtonEntry[];
};

const marks = (context: ToolbarItemsContext, ref: CommandRef) =>
    context.entries.some((entry) => entry.command === routeOf(ref).command && entry.bubble === true);

const runnable = (context: ToolbarItemsContext, command: string) =>
    context.engine.commands.has(command) && !refusedBy(context.authoring, context.engine, command);

/** The item of one entry, with the presentation's label and icon for its command. */
const itemOf = (
    context: ToolbarItemsContext,
    entry: ButtonEntry,
    groupStart: boolean,
    bubble: boolean,
): ToolbarItem => {
    const { command, payload } = entry;
    const { keymap } = context.engine;
    let label: string;
    if (entry.label === undefined) {
        label = context.translate(entry.labelKey as `RichTextEditor_${string}`);
    } else {
        label = translatedLabel(entry.label, context.lang);
    }

    let { icon } = entry;
    const control = context.presentation.controls?.[command];
    if (control !== undefined) {
        if (control.labelKey !== undefined) {
            label = context.translate(control.labelKey as `RichTextEditor_${string}`);
        }

        icon = control.icon ?? icon;
    }

    const bindings = bindingsOf(keymap, command, payload);
    const key = `${command} ${payloadKey(payload)}`;
    const item: ToolbarItem = {
        key,
        command,
        payload,
        toggle: entry.kind === 'toggle',
        label,
        icon,
        bindings,
        groupStart,
        bubble,
        opensControl: entry.opensOverlay === true,
        ...(entry.panel === undefined ? {} : { control: entry.panel }),
    };
    if (entry.control === undefined) {
        return item;
    }

    return { ...item, component: entry.control };
};

// A heading level the policy cannot create only names a stored heading.
const offered = (context: ToolbarItemsContext, { command, payload }: ButtonEntry) =>
    context.engine.commands.get(command)?.policyRefuses?.(context.authoring, payload) !== true;

/** The brand style rows: the default style, then each style that is not deprecated and applies to a styled block type. */
const brandRows = (context: ToolbarItemsContext, defaults: readonly ButtonEntry[]) => {
    const stylesOfBrand = (style: PresentationStyle) =>
        isPresentationStyle(style) &&
        style.deprecated !== true &&
        style.appliesTo.some((type) => STYLED_BLOCKS.has(type));
    const styles = context.presentation.styles.filter(stylesOfBrand);
    if (!runnable(context, SET_STYLE) || styles.length === 0) {
        return [];
    }

    const rows: (ToolbarItem & { offered: boolean })[] = defaults.map((entry) => ({
        ...itemOf(context, entry, false, false),
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

/** The text style picker, once, when a row is offered and the toolbar has none yet. */
const textStyleItem = (
    context: ToolbarItemsContext,
    command: string,
    payload: JsonValue | undefined,
    groupStart: boolean,
    items: readonly ToolbarItem[],
): ToolbarItem | undefined => {
    const options = TEXT_STYLE_COMMANDS.flatMap((id) => context.entries.filter((entry) => entry.command === id))
        .filter((entry) => runnable(context, entry.command))
        .map((entry) => ({ ...itemOf(context, entry, false, false), offered: offered(context, entry) }));
    options.push(
        ...brandRows(
            context,
            context.entries.filter((entry) => entry.command === SET_STYLE),
        ),
    );
    if (options.some((option) => option.offered) && !items.some((item) => item.key === TEXT_STYLE)) {
        const label = context.translate('RichTextEditor_textStyle');

        return {
            key: TEXT_STYLE,
            command,
            payload,
            toggle: false,
            label,
            icon: '',
            bindings: [],
            groupStart,
            bubble: true,
            options,
            groupLabel: context.translate('RichTextEditor_brandStyles'),
        };
    }

    return undefined;
};

/**
 * The presentation's toolbar groups as items, in order, each with its feature's one registry label and icon unless
 * the presentation's `controls` replace them.
 * A command the definition does not install, that has no toolbar entry, or whose feature the policy lets the author
 * create nothing with has no item. The bubble toolbar shows the groups that
 * toggle a mark and the text style picker.
 */
export const toolbarItems = (
    engine: CompiledDefinition,
    authoring: AuthoringPolicy,
    presentation: ReactPresentation | undefined,
    t: CodecContext['translate'],
    /** The UI locale's language tag, which picks a plugin's label. */
    lang: string,
    plugins: readonly EditorPart[] = [],
): readonly ToolbarItem[] => {
    if (presentation === undefined) {
        return [];
    }

    const entries: ButtonEntry[] = [];
    for (const plugin of plugins) {
        // A node's entry is a menu row only, which `menuItems` lists.
        const shown = (plugin.toolbar ?? []).filter((entry) => entry.node === undefined);
        entries.push(...shown.map((entry) => ({ ...entry, labelKey: entry.labelKey ?? '' })));
    }

    const context: ToolbarItemsContext = { engine, authoring, presentation, translate: t, lang, entries };
    const items: ToolbarItem[] = [];
    const groups = presentation.toolbar ?? toolbarGroups(plugins, authoring);
    for (const group of groups) {
        let groupStart = items.length > 0;
        const bubble = group.some((ref) => marks(context, ref));
        for (const ref of group) {
            const { command, payload } = routeOf(ref);
            if (command === TEXT_STYLE) {
                const item = textStyleItem(context, command, payload, groupStart, items);
                if (item !== undefined) {
                    items.push(item);
                    groupStart = false;
                }

                continue;
            }

            const key = `${command} ${payloadKey(payload)}`;
            const entry = context.entries.find(
                (candidate) => candidate.command === command && payloadKey(candidate.payload) === payloadKey(payload),
            );
            if (entry === undefined || !runnable(context, command) || items.some((item) => item.key === key)) {
                continue;
            }

            items.push(itemOf(context, entry, groupStart, bubble));
            groupStart = false;
        }
    }

    return items;
};

/**
 * The More rows of the key routes a feature labels and the toolbar does not show, such as Move up and Move down, so
 * each is reachable without its shortcut.
 */
export const menuItems = (
    engine: CompiledDefinition,
    authoring: AuthoringPolicy,
    items: readonly ToolbarItem[],
    t: CodecContext['translate'],
    /** The UI locale's language tag, which picks a plugin's label. */
    lang: string,
    plugins: readonly EditorPart[] = [],
): readonly ToolbarItem[] => {
    const { keymap } = engine;
    const shown = new Set(items.flatMap((item) => [item, ...(item.options ?? [])]).map(({ key }) => key));
    const rows: ToolbarItem[] = [];
    const parts = plugins.map(({ keys, toolbar }) => ({
        keys,
        toolbar: (toolbar ?? []).filter((entry) => entry.opensOverlay === true || entry.node !== undefined),
    }));
    for (const declaration of parts) {
        for (const ref of Object.values(declaration.keys ?? {})) {
            if (typeof ref !== 'object' || ref.labelKey === undefined || !engine.commands.has(ref.command)) {
                continue;
            }

            const { command, payload } = ref;
            const key = `${command} ${payloadKey(payload)}`;
            if (refusedBy(authoring, engine, command) || shown.has(key) || rows.some((row) => row.key === key)) {
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

        // A command that opens an overlay has no key, so its toolbar entry names its row, as Start numbering at does;
        // a node's entry is a row with its payload, which shows while that node is selected.
        for (const entry of declaration.toolbar) {
            const key = `${entry.command} ${payloadKey(entry.payload)}`;
            // A node's command edits a node that exists, so only its own policy check refuses it, as for a toolbar item.
            let refused = refusedBy(authoring, engine, entry.command);
            if (entry.node !== undefined) {
                const spec = engine.commands.get(entry.command);
                refused = spec !== undefined && spec.policyRefuses?.(authoring, entry.payload) === true;
            }

            if (!engine.commands.has(entry.command) || refused) {
                continue;
            }

            if (shown.has(key) || rows.some((row) => row.key === key)) {
                continue;
            }

            let label: string;
            if (entry.label === undefined) {
                label = t(entry.labelKey as `RichTextEditor_${string}`);
            } else {
                label = translatedLabel(entry.label, lang);
            }

            rows.push({
                key,
                command: entry.command,
                payload: entry.payload,
                toggle: entry.node !== undefined && entry.kind === 'toggle',
                label,
                icon: entry.icon,
                bindings: [],
                groupStart: false,
                bubble: false,
                opensControl: entry.opensOverlay === true,
                ...(entry.node === undefined ? {} : { node: entry.node }),
            });
        }
    }

    return rows;
};
