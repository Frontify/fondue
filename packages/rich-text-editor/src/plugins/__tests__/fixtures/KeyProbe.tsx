/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dialog, ThemeProvider } from '@frontify/fondue-components';
import { type ReactNode, useMemo, useRef } from 'react';

import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import { brandDocumentFeatures, commentFeatures, documentFeatures } from '#/plugins';
import { storedIn } from '#/plugins/__tests__/fixtures/documents';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { heard, recordSubmit } from '#/react/__tests__/fixtures/host';
import { createFakeReferenceService, setSelection } from '#/testing';

const FEATURES = { comment: commentFeatures, document: documentFeatures, 'brand-document': brandDocumentFeatures };
const services = {
    references: createFakeReferenceService([
        { resourceType: 'user', resourceId: 'user-1', labelSnapshot: 'Ada Lovelace' },
    ]),
};

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** The key order probe's handle, selection helper, submitted texts, host dialog changes and keys. */
        keyProbe?: {
            handle: EditorHandle;
            setSelection: typeof setSelection;
            submitted: string[];
            hostDialogChanges: boolean[];
            /** Each keydown's key and whether it reached the host prevented, in order. */
            prevented: (readonly [string, boolean])[];
        };
    }
}

const hostDialogChanges: boolean[] = [];
const EMPTY: readonly ContentNodeJSON[] = [{ type: 'paragraph' }];

export type KeyProbeProps = {
    features: keyof typeof FEATURES;
    /** Compiles the model from the feature list in reverse, as a host may list its features in any order. */
    reversed?: boolean;
    blocks?: readonly ContentNodeJSON[];
    enterBehavior?: 'paragraph' | 'submit';
    bubble?: boolean;
    /** Puts the editor in an open host Fondue `Dialog`. */
    inDialog?: boolean;
};

/** An editor of a profile's feature list between two host buttons, which records each submitted snapshot's text. */
export const KeyProbe = ({
    features,
    reversed = false,
    blocks = EMPTY,
    enterBehavior = 'paragraph',
    bubble = false,
    inDialog = false,
}: KeyProbeProps) => {
    const ref = useRef<EditorHandle>(null);
    const { definition, document } = useMemo(() => {
        let list = [...FEATURES[features]];
        if (reversed) {
            list = list.reverse();
        }

        const model = compileContentModel(list, { id: 'test.keys', version: 1 });

        return {
            definition: defineEditor({ id: 'test.keys', model, policy: { enterBehavior }, plugins: pluginsFor(model) }),
            document: storedIn(model, blocks),
        };
    }, [features, reversed, blocks, enterBehavior]);
    // A host Dialog mounts its content after the probe's effects, so the probe publishes the handle once it is ready.
    const onReady = () => {
        const handle = ref.current;
        if (handle !== null) {
            window.keyProbe = {
                handle,
                setSelection,
                submitted: heard.submitted,
                hostDialogChanges,
                prevented: heard.keys,
            };
        }
    };

    let toolbarMode: 'bubble' | 'fixed' = 'fixed';
    if (bubble) {
        toolbarMode = 'bubble';
    }

    const shared = {
        'aria-label': 'Notes',
        services,
        defaultToolbarMode: toolbarMode,
        onReady,
        onSubmit: recordSubmit,
        ref,
    };
    let body: ReactNode = (
        <>
            {/* WebKit puts a button in the Tab order only with an explicit `tabIndex`. */}
            <button type="button" tabIndex={0}>
                Before
            </button>
            <RichTextEditor
                {...shared}
                definition={definition}
                defaultValue={{ documentId: 'document-1', revision: null, document }}
            />
            <button type="button" tabIndex={0}>
                After
            </button>
        </>
    );
    if (inDialog) {
        body = (
            <Dialog.Root modal open onOpenChange={(next) => hostDialogChanges.push(next)}>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Host dialog</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>{body}</Dialog.Body>
                </Dialog.Content>
            </Dialog.Root>
        );
    }

    return <ThemeProvider>{body}</ThemeProvider>;
};
