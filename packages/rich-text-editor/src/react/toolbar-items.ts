/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CompiledDefinition } from '#/definition';
import { type CodecContext, type CommandRef, type JsonValue, type ToolbarEntry } from '#/model';
import { compiledModel } from '#/model/compile';
import { canonicalJson } from '#/model/hash';
import { isPlatformBinding } from '#/model/platform';
import { refusesLevel, setsHeading } from '#/runtime/policy';
import { type AuthoringPolicy } from '#/runtime/types';
import { type ToolbarItem } from '#/ui/toolbar/toolbar';

import { type ReactPresentation } from './types';

type ButtonEntry = Exclude<ToolbarEntry, { readonly kind: 'menu' }>;

/** The control ID of the text style picker in a presentation's toolbar (SPEC-rich-text-react, Default toolbars). */
const TEXT_STYLE = 'text-style';
// The picker's rows, in order: Normal text, the heading levels, then Quote.
const TEXT_STYLE_COMMANDS = ['paragraph.set', 'heading.set', 'quote.toggle'];

/**
 * The manifest label for `lang` by RFC 4647 lookup, without subtags from the end until a tag matches, else `en-US`,
 * which every manifest label holds (SPEC-rich-text/AC-074).
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
 * keymap, the editor runs instead (SPEC-rich-text-react/AC-039).
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

/** Whether the policy lets the author create nothing with the feature of `command` (SPEC-rich-text-react/AC-099). */
const refusedBy = (authoring: AuthoringPolicy, commands: Commands, command: string) => {
    const compiled = commands.find(({ id }) => id === command);
    return compiled !== undefined && authoring.features[compiled.featureId]?.create === false;
};

/** The compiled key bindings of a route, each where it applies (SPEC-rich-text-react/AC-039). */
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
 * the presentation's `controls` replace them (SPEC-rich-text-react/AC-094, SPEC-rich-text-accessibility/AC-033).
 * A command the definition does not install, that has no toolbar entry, or whose feature the policy lets the author
 * create nothing with has no item (SPEC-rich-text-react/AC-099, DR-049). The bubble toolbar shows the groups that
 * toggle a mark (Default toolbars).
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
        return { key, command, payload, toggle: entry.kind === 'toggle', label, icon, bindings, groupStart, bubble };
    };
    // A heading level the policy cannot create only names a stored heading (SPEC-rich-text-editing/AC-014).
    const offered = ({ command, payload }: ButtonEntry) => {
        const compiled = commands.find(({ id }) => id === command);
        return compiled === undefined || !setsHeading(compiled.definition) || !refusesLevel(authoring, payload);
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
 * each is reachable without its shortcut (SPEC-rich-text-editing/AC-069, SPEC-rich-text-react, Default toolbars).
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
    }
    return rows;
};
