/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef, useState } from 'react';

import { defineEditor, type EditorHandle, type LoadedDocument, type PersistenceService, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';
import { core } from '#/plugins';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { createFakePersistenceService } from '#/testing';

const model = compileContentModel([core()], { id: 'story.switching', version: 1 });
const definitions = {
    note: defineEditor({ id: 'story.switching.note', model, plugins: pluginsFor(model) }),
    comment: defineEditor({ id: 'story.switching.comment', model, plugins: pluginsFor(model) }),
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

type Mounted = {
    key: number;
    definition: (typeof definitions)[keyof typeof definitions];
    record: LoadedDocument;
};

/**
 * Switches an editor to another document: `replaceDocument` within one definition, and for another definition
 * `requestCommit` settling before the remount with a new `key`.
 */
export const SwitchingDocuments = () => {
    const handleRef = useRef<EditorHandle>(null);
    const counterRef = useRef(0);
    const [events, setEvents] = useState<readonly { id: number; text: string }[]>([]);
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
