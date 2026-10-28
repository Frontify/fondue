/* (c) Copyright Frontify Ltd., all rights reserved. */

import { keydownHandler } from 'prosemirror-keymap';
import { type Command } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { isApple, isPlatformBinding, keyOn, modOn } from '#/model/internal';

import { type KeyHandlerEntry } from './contributions';
import { type EngineCommand, type EngineImplementations, type KeymapEntry } from './types';

/** The platform key maps one plugin fills, and the commands those bindings run. */
type KeymapContext = {
    id: string;
    apple: Record<string, Command>;
    other: Record<string, Command>;
    commands: ReadonlyMap<string, EngineCommand>;
    implementations: EngineImplementations;
};

/** The empty platform maps of plugin `id`. */
export const createKeymapContext = (
    id: string,
    commands: ReadonlyMap<string, EngineCommand>,
    implementations: EngineImplementations,
): KeymapContext => ({
    id,
    apple: {},
    other: {},
    commands,
    implementations,
});

/** A binding that starts with `mac:` or `other:` runs only on that platform. */
const bindKey = (context: KeymapContext, key: string, run: Command) => {
    const appleKey = keyOn(key, true);
    if (appleKey !== undefined) {
        context.apple[modOn(appleKey, true)] = run;
    }

    const otherKey = keyOn(key, false);
    if (otherKey !== undefined) {
        context.other[modOn(otherKey, false)] = run;
    }
};

const bindEntry = (context: KeymapContext, entry: KeymapEntry) => {
    const command = context.commands.get(entry.command);
    if (entry.plugin !== context.id || command === undefined) {
        return;
    }

    bindKey(context, entry.key, (state, dispatch, view) => {
        if (command.viaExecute === true && view !== undefined && context.implementations.execute !== undefined) {
            return context.implementations.execute(view, entry.command, entry.payload);
        }

        return command.run(state, dispatch, entry.payload);
    });
};

const bindHandler = (context: KeymapContext, { plugin, key, handler: given }: KeyHandlerEntry) => {
    if (plugin !== context.id) {
        return;
    }

    // A key that took its key keeps the caret in sight, as the base keys do.
    const handler: EngineCommand = {
        ...given,
        run: (state, dispatch, payload, context) => {
            if (dispatch === undefined) {
                return given.run(state, undefined, payload, context);
            }

            return given.run(state, (transaction) => dispatch(transaction.scrollIntoView()), payload, context);
        },
    };
    bindKey(context, key, (state, dispatch, view) => {
        if (view !== undefined && context.implementations.handleKey !== undefined) {
            return context.implementations.handleKey(view, handler);
        }

        return handler.run(state, dispatch);
    });
};

/** Plain bindings first, so on its platform a prefixed one of the same key wins. */
export const bindKeyEntries = (
    context: KeymapContext,
    keymap: readonly KeymapEntry[],
    keyHandlers: readonly KeyHandlerEntry[],
) => {
    for (const entry of keymap) {
        if (!isPlatformBinding(entry.key)) {
            bindEntry(context, entry);
        }
    }

    for (const binding of keyHandlers) {
        if (!isPlatformBinding(binding.key)) {
            bindHandler(context, binding);
        }
    }

    for (const entry of keymap) {
        if (isPlatformBinding(entry.key)) {
            bindEntry(context, entry);
        }
    }

    for (const binding of keyHandlers) {
        if (isPlatformBinding(binding.key)) {
            bindHandler(context, binding);
        }
    }
};

/** The keydown handler of the filled maps, for the platform the tooltips name. */
export const handleBoundKeyDown = (context: KeymapContext) => {
    const handlers = { apple: keydownHandler(context.apple), other: keydownHandler(context.other) };

    return (view: EditorView, event: KeyboardEvent) => {
        // The tooltips name the context of the same platform check.
        const owner = view.dom.ownerDocument.defaultView;
        if (owner !== null && isApple(owner.navigator)) {
            return handlers.apple(view, event);
        }

        return handlers.other(view, event);
    };
};
