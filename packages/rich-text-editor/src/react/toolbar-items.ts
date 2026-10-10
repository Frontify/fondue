/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CompiledDefinition } from '#/definition';
import { type CodecContext, type CommandRef, type JsonValue, type ToolbarEntry } from '#/model';
import { compiledModel } from '#/model/compile';
import { canonicalJson } from '#/model/hash';
import { type AuthoringPolicy } from '#/runtime/types';
import { type ToolbarItem } from '#/ui/toolbar/toolbar';

import { type ReactPresentation } from './types';

type ButtonEntry = Exclude<ToolbarEntry, { readonly kind: 'menu' }>;

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

const payloadKey = (payload: JsonValue | null | undefined) => {
    if (payload === undefined) {
        return canonicalJson(null);
    }
    return canonicalJson(payload);
};

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
    const refused = (command: string) => {
        const compiled = commands.find(({ id }) => id === command);
        return compiled !== undefined && authoring.features[compiled.featureId]?.create === false;
    };
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
    const items: ToolbarItem[] = [];
    for (const group of presentation.toolbar) {
        let groupStart = items.length > 0;
        const bubble = group.some(marks);
        for (const ref of group) {
            const { command, payload } = routeOf(ref);
            const key = `${command} ${payloadKey(payload)}`;
            const entry = entries.find(
                (candidate) => candidate.command === command && payloadKey(candidate.payload) === payloadKey(payload),
            );
            if (
                entry === undefined ||
                !engine.commands.has(command) ||
                refused(command) ||
                items.some((item) => item.key === key)
            ) {
                continue;
            }
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
            const bindings = keymap
                .filter((binding) => binding.command === command && payloadKey(binding.payload) === payloadKey(payload))
                .map((binding) => binding.key);
            items.push({
                key,
                command,
                payload,
                toggle: entry.kind === 'toggle',
                label,
                icon,
                bindings,
                groupStart,
                bubble,
            });
            groupStart = false;
        }
    }
    return items;
};
