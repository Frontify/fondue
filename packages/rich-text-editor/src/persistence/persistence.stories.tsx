/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';

import { core } from '#/features';
import { defineEditor, type EditorHandle, type LoadedDocument, type PersistenceService, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';
import { createFakePersistenceService } from '#/testing';

const model = compileContentModel([core()], { id: 'story.switching', version: 1 });
const definitions = {
    note: defineEditor({ id: 'story.switching.note', model }),
    comment: defineEditor({ id: 'story.switching.comment', model }),
};

const recordOf = (documentId: string, text: string): LoadedDocument => ({
    documentId,
    revision: null,
    document: {
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: [{ id: 'core', version: 1 }],
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: [{ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] }],
        },
    },
});

interface Mounted {
    readonly key: number;
    readonly definition: (typeof definitions)[keyof typeof definitions];
    readonly record: LoadedDocument;
}

/**
 * Switches an editor to another document: `replaceDocument` within one definition, and for another definition
 * `requestCommit` settling before the remount with a new `key` (SPEC-rich-text-react/AC-081).
 */
const SwitchingDocuments = () => {
    const handleRef = useRef<EditorHandle>(null);
    const counterRef = useRef(0);
    const [events, setEvents] = useState<readonly { readonly id: number; readonly text: string }[]>([]);
    const log = (text: string) => {
        counterRef.current += 1;
        const id = counterRef.current;
        setEvents((previous) => [...previous, { id, text }]);
    };
    // An in-memory server in place of the host's, which logs each save.
    const [services] = useState(() => {
        const server = createFakePersistenceService();
        const persistence: PersistenceService = {
            save: (request, context) => {
                log(`save ${request.stamp.documentId}`);
                return server.save(request, context);
            },
            read: server.read,
        };
        return { persistence };
    });
    const [mounted, setMounted] = useState<Mounted>(() => ({
        key: 0,
        definition: definitions.note,
        record: recordOf('note-1', 'The first note.'),
    }));
    return (
        <div style={{ display: 'grid', gap: '1rem' }}>
            <section aria-label="Actions" style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    type="button"
                    onClick={() => {
                        const result = handleRef.current?.execute('text.insert', { text: 'Edited. ' });
                        if (result !== undefined) {
                            log(`edit ${result.status}`);
                        }
                    }}
                >
                    Edit the text
                </button>
                <button
                    type="button"
                    onClick={async () => {
                        const handle = handleRef.current;
                        if (handle === null) {
                            return;
                        }
                        // The same definition keeps the session, which saves the unsaved edits first.
                        const result = await handle.replaceDocument({
                            expected: handle.getSnapshot().stamp,
                            next: recordOf('note-2', 'The second note.'),
                            unsaved: { action: 'save' },
                            selection: 'start',
                            history: 'reset',
                        });
                        log(`replaceDocument ${result.status}`);
                    }}
                >
                    Open the second note
                </button>
                <button
                    type="button"
                    onClick={async () => {
                        const handle = handleRef.current;
                        if (handle === null) {
                            return;
                        }
                        // A new definition needs a new mount, after the edits are saved.
                        const committed = await handle.requestCommit({ reason: 'navigate' });
                        log(`requestCommit ${committed.status}`);
                        if (committed.status !== 'acknowledged') {
                            return;
                        }
                        const { stamp, document } = handle.getSnapshot();
                        setMounted({
                            key: mounted.key + 1,
                            definition: definitions.comment,
                            record: {
                                documentId: stamp.documentId,
                                revision: committed.acknowledgment.revision,
                                document,
                            },
                        });
                    }}
                >
                    Open as a comment
                </button>
            </section>
            <RichTextEditor
                key={mounted.key}
                aria-label="Note"
                definition={mounted.definition}
                defaultValue={mounted.record}
                services={services}
                ref={handleRef}
                onReady={() => log(`ready ${mounted.definition.id}`)}
                onDiagnostic={(diagnostic) => log(`diagnostic ${diagnostic.code}`)}
            />
            <section aria-label="Event log">
                <ol>
                    {events.map(({ id, text }) => (
                        <li key={id}>{text}</li>
                    ))}
                </ol>
            </section>
        </div>
    );
};

/** Resolves once the event log holds an entry for which `found` holds, which the log's own mutations report. */
const logged = (canvasElement: HTMLElement, found: (entries: readonly string[]) => boolean) =>
    new Promise<readonly string[]>((resolve) => {
        const log = canvasElement.querySelector('[aria-label="Event log"]') as HTMLElement;
        const check = () => {
            const entries = [...log.querySelectorAll('li')].map((item) => item.textContent ?? '');
            if (found(entries)) {
                observer.disconnect();
                resolve(entries);
            }
        };
        const observer = new MutationObserver(check);
        observer.observe(log, { childList: true, subtree: true, characterData: true });
        check();
    });
const click = (canvasElement: HTMLElement, name: string) => {
    const button = [...canvasElement.querySelectorAll('button')].find((item) => item.textContent === name);
    if (button === undefined) {
        throw new Error(`No button named ${name}.`);
    }
    button.click();
};

const meta: Meta<typeof SwitchingDocuments> = {
    title: 'Rich Text Editor/Switching documents',
    component: SwitchingDocuments,
};
export default meta;

/** Unsaved edits are saved once before the remount with another definition, which leaves nothing unsaved behind. */
export const Default: StoryObj<typeof SwitchingDocuments> = {
    play: async ({ canvasElement }) => {
        await logged(canvasElement, (entries) => entries.includes('ready story.switching.note'));
        click(canvasElement, 'Edit the text');
        click(canvasElement, 'Open as a comment');
        const entries = await logged(canvasElement, (entries) => entries.includes('ready story.switching.comment'));

        const remount = entries.indexOf('ready story.switching.comment');
        const saves = entries.filter((entry) => entry.startsWith('save'));
        if (saves.length !== 1 || entries.indexOf('save note-1') > remount) {
            throw new Error(`Expected one save before the remount, got: ${entries.join(', ')}`);
        }
        if (entries.includes('diagnostic persistence.disposed-dirty')) {
            throw new Error(`The remount left unsaved edits behind: ${entries.join(', ')}`);
        }
    },
};
