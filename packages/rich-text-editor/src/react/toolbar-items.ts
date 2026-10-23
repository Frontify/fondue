/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPlugin, type PluginToolbarEntry } from '#/bridge/plugin';
import { type CompiledDefinition } from '#/definition';
import { type CodecContext, type CommandRef, type JsonValue } from '#/model';
import { canonicalJson } from '#/model/hash';
import { isPlatformBinding } from '#/model/platform';
import { type AuthoringPolicy } from '#/runtime/types';
import { type ToolbarItem } from '#/ui/toolbar/toolbar';

import { type ReactPresentation } from './types';

type ButtonEntry = Omit<PluginToolbarEntry, 'labelKey' | 'label'> & {
    readonly labelKey: string;
    readonly label?: Readonly<Record<string, string>>;
};

/** The control ID of the text style picker in a presentation's toolbar. */
const TEXT_STYLE = 'text-style';
// The picker's rows, in order: Normal text, the heading levels, then Quote, then Code block.
const TEXT_STYLE_COMMANDS = ['paragraph.set', 'heading.set', 'quote.toggle', 'code-block.toggle'];

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
 * toggle a mark and the text style picker.
 */
export const toolbarItems = (
    engine: CompiledDefinition,
    authoring: AuthoringPolicy,
    presentation: ReactPresentation | undefined,
    t: CodecContext['t'],
    /** The UI locale's language tag, which picks a plugin's label. */
    lang: string,
    plugins: readonly EditorPlugin[] = [],
): readonly ToolbarItem[] => {
    if (presentation === undefined) {
        return [];
    }
    const { keymap } = engine;
    const entries: ButtonEntry[] = [];
    for (const plugin of plugins) {
        // A node's entry is a menu row only, which `menuItems` lists.
        const shown = (plugin.toolbar ?? []).filter((entry) => entry.node === undefined);
        entries.push(...shown.map((entry) => ({ ...entry, labelKey: entry.labelKey ?? '' })));
    }
    const marks = (ref: CommandRef) =>
        entries.some((entry) => entry.command === routeOf(ref).command && entry.bubble === true);
    const runnable = (command: string) => engine.commands.has(command) && !refusedBy(authoring, engine, command);
    /** The item of one entry, with the presentation's label and icon for its command. */
    const itemOf = (entry: ButtonEntry, groupStart: boolean, bubble: boolean): ToolbarItem => {
        const { command, payload } = entry;
        let label: string;
        if (entry.label === undefined) {
            label = t(entry.labelKey as `RichTextEditor_${string}`);
        } else {
            label = translatedLabel(entry.label, lang);
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
        };
        if (entry.control === undefined) {
            return item;
        }
        return { ...item, component: entry.control };
    };
    // A heading level the policy cannot create only names a stored heading.
    const offered = ({ command, payload }: ButtonEntry) =>
        engine.commands.get(command)?.policyRefuses?.(authoring, payload) !== true;
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
                        bubble: true,
                        options,
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

/**
 * The More rows of the key routes a feature labels and the toolbar does not show, such as Move up and Move down, so
 * each is reachable without its shortcut.
 */
export const menuItems = (
    engine: CompiledDefinition,
    authoring: AuthoringPolicy,
    items: readonly ToolbarItem[],
    t: CodecContext['t'],
    /** The UI locale's language tag, which picks a plugin's label. */
    lang: string,
    plugins: readonly EditorPlugin[] = [],
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
