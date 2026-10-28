/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type InputRule, type KeyBinding } from '#/model';

import { type EditorApi, type PluginToolbarEntry } from './plugin';

/** One typed delimiter pair that turns the text between them into the mark. */
export type ToggleMarkInputRule = {
    /** The text that opens the span, such as `**`. */
    open: string;
    /** The text that closes the span and fires the rule, such as `**`. */
    close: string;
    /**
     * The rule's ID.
     *
     * @default `<mark>.<n>`, with `n` the 1-based position in `inputRules`.
     */
    id?: string;
};

/** The toolbar entry of a toggle mark. */
export type ToggleMarkToolbar = {
    /**
     * The entry's ID.
     *
     * @default the mark name
     */
    id?: string;
    /** The package string that names the button. */
    labelKey: string;
    /** The name of a Fondue icon, such as `IconTextFormatBold`. */
    icon: string;
    /**
     * Shows the entry in the bubble toolbar too.
     *
     * @default false
     */
    bubble?: boolean;
    /** The group a presentation with no toolbar places this entry in. */
    group?: PluginToolbarEntry['group'];
    /** Entries with a rank come first in the group, lowest rank first; the others follow in plugin order. */
    rank?: number;
};

/** The command a toggle mark installs: it takes no payload. */
type ToggleCommand = {
    run: (api: EditorApi<'marks'>) => boolean;
    active: (api: EditorApi<'marks'>) => boolean | 'mixed';
};

/** What `defineToggleMark` takes. */
export type ToggleMarkOptions = {
    /** The name of the mark the command toggles, such as `bold`. */
    mark: string;
    /**
     * The ID of the toggle command.
     *
     * @default `mark.<mark>.toggle`
     */
    command?: string;
    /** The key bindings that run the command. */
    keys: readonly KeyBinding[];
    /**
     * Delimiter pairs that apply the mark as they are typed.
     *
     * @default none
     */
    inputRules?: readonly ToggleMarkInputRule[];
    /** The toolbar entry that shows pressed while the mark is active. */
    toolbar: ToggleMarkToolbar;
    /**
     * A mark that the command takes off in the same undo step when it adds this one, and the command refuses where
     * this mark is not allowed.
     *
     * @default none
     */
    replaces?: string;
};

/** The ID of the toggle command that `Options` names, or the default one for its mark. */
type CommandOf<Options extends ToggleMarkOptions> = Options extends { command: infer Name extends string }
    ? Name
    : `mark.${Options['mark']}.toggle`;

/** The parts of a mark that toggles, which `defineEditorPart` takes. */
export type ToggleMarkParts<Command extends string> = {
    needs: ['marks'];
    commands: Record<Command, ToggleCommand>;
    keys: Partial<Record<KeyBinding, string>>;
    inputRules?: InputRule[];
    toolbar: PluginToolbarEntry[];
};

/**
 * The editor parts of a mark that toggles, for `defineEditorPart`: one command that toggles the mark and shows active
 * while it holds, bound to `keys`, with optional typed delimiters and one toolbar toggle.
 */
export const toggleMark = <const Options extends ToggleMarkOptions>(
    options: Options,
): ToggleMarkParts<CommandOf<Options>> => {
    type Command = CommandOf<Options>;
    const { mark, replaces } = options;
    const command = (options.command ?? `mark.${mark}.toggle`) as Command;
    const keys: Partial<Record<KeyBinding, string>> = {};
    for (const key of options.keys) {
        keys[key] = command;
    }

    const entry: PluginToolbarEntry = {
        id: options.toolbar.id ?? mark,
        kind: 'toggle',
        command,
        labelKey: options.toolbar.labelKey,
        icon: options.toolbar.icon,
    };
    if (options.toolbar.bubble !== undefined) {
        entry.bubble = options.toolbar.bubble;
    }

    if (options.toolbar.group !== undefined) {
        entry.group = options.toolbar.group;
    }

    if (options.toolbar.rank !== undefined) {
        entry.rank = options.toolbar.rank;
    }

    const toggle: ToggleCommand = {
        run: (api) => {
            if (replaces === undefined) {
                return api.marks.toggle(mark);
            }

            if (!api.marks.allowed(mark)) {
                return false;
            }

            // Adding the mark takes the other one off in the same undo step.
            if (api.marks.active(mark) !== true) {
                api.marks.remove(replaces);
            }

            return api.marks.toggle(mark);
        },
        active: (api) => api.marks.active(mark),
    };
    // A computed key of a type-parameter type is typed as a string index, so the record type is asserted.
    const commands = { [command]: toggle } as Record<Command, ToggleCommand>;

    const parts: ToggleMarkParts<Command> = { needs: ['marks'], commands, keys, toolbar: [entry] };
    if (options.inputRules !== undefined && options.inputRules.length > 0) {
        parts.inputRules = options.inputRules.map(({ open, close, id }, index) => ({
            id: id ?? `${mark}.${index + 1}`,
            kind: 'mark-delimiter',
            open,
            close,
            mark,
        }));
    }

    return parts;
};
