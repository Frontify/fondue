/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import fc from 'fast-check';
import { TextSelection } from 'prosemirror-state';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { partWithOptions } from '#/bridge/plugin';
import { createCodecs } from '#/codecs';
import { documentArb, fcSettings, nodeIdsIn, plainTextArb, seeded } from '#/features/__tests__/fixtures/generated';
import { pluginsById } from '#/features/plugins';
import { decodeDocument, type JsonValue, type KeyBinding, type RichTextDocument } from '#/model';
import { compiledModel } from '#/model/compile';
import { PROFILE_MODELS } from '#/react/examples/records';
import { loadProfile } from '#/react/profiles';
import { RichTextEditor } from '#/react/rich-text-editor';
import { type EditorHandle, type RichTextProfile } from '#/react/types';
import { runtimeOf } from '#/runtime/runtime';
import { type DocumentChange } from '#/runtime/types';
import { paste, pressKey, typeText } from '#/testing';

// What a user types to fire the input rules of every shipped feature, with plain words between them.
const TYPED = ['# ', '## ', '> ', '- ', '* ', '1. ', '[ ] ', '``` ', '**b** ', '*i* ', '~~s~~ ', '`c` ', '--', '(c)'];
const KEYS: readonly KeyBinding[] = [
    'Enter',
    'Shift-Enter',
    'Mod-Enter',
    'Backspace',
    'Delete',
    'Tab',
    'Shift-Tab',
    'Escape',
    'ArrowUp',
];

type Action =
    | { readonly kind: 'select'; readonly anchor: number; readonly head: number }
    | { readonly kind: 'command'; readonly index: number }
    | { readonly kind: 'type'; readonly text: string }
    | { readonly kind: 'key'; readonly key: KeyBinding }
    | { readonly kind: 'paste'; readonly input: { readonly html?: string; readonly text?: string } }
    | { readonly kind: 'drop'; readonly at: number; readonly data: Readonly<Record<string, string>> }
    | { readonly kind: 'history'; readonly command: 'history.undo' | 'history.redo' };

/** The commands of the profile with a payload each: none, then each payload a toolbar entry runs it with. */
const commandsOf = (profile: RichTextProfile, ids: readonly string[]) => {
    const payloads = compiledModel(PROFILE_MODELS[profile]).features.flatMap(({ id, options }) => {
        const part = pluginsById([id])[0]?.editor;
        if (part === undefined) {
            return [];
        }
        return (partWithOptions(part, options).toolbar ?? []).flatMap(({ command, payload }) => {
            if (payload === undefined) {
                return [];
            }
            return [{ id: command, payload }];
        });
    });
    return [...ids.map((id): { readonly id: string; readonly payload?: JsonValue } => ({ id })), ...payloads];
};

const actionArb = (profile: RichTextProfile, commandCount: number): fc.Arbitrary<Action> => {
    const model = PROFILE_MODELS[profile];
    const codecs = createCodecs(model);
    const htmls = documentArb(model, plainTextArb).map((document) => codecs.toHTML(document).html);
    const texts = fc.constantFrom('# Title\n\n- one\n- two', '> quote', 'plain words', '1. first\n2. second');
    const pasted = fc.oneof(
        htmls.map((html) => ({ 'text/html': html })),
        texts.map((text) => ({ 'text/plain': text })),
    );
    const pasteInputs = fc.oneof(
        htmls.map((html) => ({ html })),
        texts.map((text) => ({ text })),
    );
    // A fraction of the document size, so positions spread over every block and land inside marks.
    // Unbiased, since fast-check otherwise draws the bounds most of the time.
    const position = fc.noBias(fc.integer({ min: 0, max: 1000 })).map((thousandths) => thousandths / 1000);
    return fc.oneof(
        fc.record({ kind: fc.constant('select' as const), anchor: position, head: position }),
        fc.record({ kind: fc.constant('command' as const), index: fc.nat({ max: commandCount - 1 }) }),
        fc.record({
            kind: fc.constant('type' as const),
            text: fc.oneof(fc.constantFrom(...TYPED), plainTextArb),
        }),
        fc.record({ kind: fc.constant('key' as const), key: fc.constantFrom(...KEYS) }),
        fc.record({ kind: fc.constant('paste' as const), input: pasteInputs }),
        fc.record({ kind: fc.constant('drop' as const), at: position, data: pasted }),
        fc.record({
            kind: fc.constant('history' as const),
            command: fc.constantFrom('history.undo' as const, 'history.redo' as const),
        }),
    );
};

/** Mounts the profile's editor with `document`, once its module has loaded, recording each change it commits. */
const mount = async (profile: RichTextProfile, document: RichTextDocument) => {
    const ref = createRef<EditorHandle<object>>();
    const changes: DocumentChange[] = [];
    const rendered = render(
        <RichTextEditor
            aria-label="Message"
            profile={profile}
            defaultValue={{ documentId: 'document-1', revision: null, document }}
            onDocumentChange={(change: DocumentChange) => changes.push(change)}
            ref={ref}
        />,
    );
    await act(async () => {
        await loadProfile(profile);
    });
    const runtime = runtimeOf(ref.current ?? {});
    const view = runtime?.view;
    if (ref.current === null || runtime === undefined || view === undefined) {
        throw new Error(`The ${profile} profile mounted no editor.`);
    }
    return { handle: ref.current, runtime, view, changes, unmount: rendered.unmount };
};
type Mounted = Awaited<ReturnType<typeof mount>>;

const transfer = (data: Readonly<Record<string, string>>) => {
    const dataTransfer = new DataTransfer();
    for (const [type, value] of Object.entries(data)) {
        dataTransfer.setData(type, value);
    }
    return dataTransfer;
};

const perform = (
    { handle, view }: Mounted,
    action: Action,
    commands: readonly { readonly id: string; readonly payload?: JsonValue }[],
) => {
    const size = view.state.doc.content.size;
    const at = (fraction: number) => Math.round(fraction * size);
    if (action.kind === 'select') {
        const { doc } = view.state;
        const selection = TextSelection.between(doc.resolve(at(action.anchor)), doc.resolve(at(action.head)));
        view.dispatch(view.state.tr.setSelection(selection));
    } else if (action.kind === 'command') {
        const command = commands[action.index];
        if (command !== undefined) {
            handle.execute(command.id as never, command.payload as never);
        }
    } else if (action.kind === 'type') {
        typeText(handle, action.text);
    } else if (action.kind === 'key') {
        pressKey(handle, action.key);
    } else if (action.kind === 'paste') {
        paste(handle, action.input);
    } else if (action.kind === 'drop') {
        const spy = vi.spyOn(view, 'posAtCoords').mockReturnValue({ pos: at(action.at), inside: -1 });
        const event = new DragEvent('drop', { bubbles: true, cancelable: true });
        // happy-dom's DragEvent ignores the `dataTransfer` init.
        Object.defineProperty(event, 'dataTransfer', { value: transfer(action.data) });
        view.dom.dispatchEvent(event);
        spy.mockRestore();
    } else {
        handle.execute(action.command as never, undefined as never);
    }
};

describe(seeded('documents that a batch commits'), () => {
    it.each(Object.keys(PROFILE_MODELS) as RichTextProfile[])(
        'decodes each document an action commits in the %s profile as editable with its model and limits, with unique nodeIds',
        async (profile) => {
            const model = PROFILE_MODELS[profile];
            const [first] = fc.sample(documentArb(model), { numRuns: 1, seed: 1 });
            if (first === undefined) {
                throw new Error('No document was generated.');
            }
            const probe = await mount(profile, first);
            const commands = commandsOf(profile, [...probe.runtime.definition.commands.keys()]);
            probe.unmount();
            await fc.assert(
                fc.asyncProperty(
                    documentArb(model),
                    fc.array(actionArb(profile, commands.length), { minLength: 1, maxLength: 12 }),
                    async (document, actions) => {
                        const mounted = await mount(profile, document);
                        try {
                            for (const action of actions) {
                                const committed = mounted.changes.length;
                                act(() => perform(mounted, action, commands));
                                for (const change of mounted.changes.slice(committed)) {
                                    const stored = change.readDocument();
                                    const result = decodeDocument(stored, model, { limits: mounted.runtime.limits });
                                    const ids = nodeIdsIn(stored.content);

                                    expect(result.status).toBe('editable');
                                    expect(new Set(ids).size).toBe(ids.length);
                                }
                            }
                        } finally {
                            mounted.unmount();
                        }
                    },
                ),
                fcSettings(20),
            );
        },
        120_000,
    );
});
