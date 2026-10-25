/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo, useRef } from 'react';

import { createEmptyDocument } from '#/model';
import { PROFILE_MODELS } from '#/react/examples/records';
import { RichTextEditor } from '#/react/RichTextEditor';
import { type EditorHandle, type RichTextProfile, type ToolbarMode } from '#/react/types';
import { runtimeOf } from '#/runtime/runtime';
import { createFakeReferenceService, type SelectionTarget, setSelection } from '#/testing';

import { heard, recordSubmit } from './host';

declare global {
    interface Window {
        /**
         * The text of each submitted snapshot, whether each Enter keydown reached the host prevented, and the handle
         * with the selection and command helpers that specs prepare a state with.
         */
        profileProbe?: {
            readonly submitted: string[];
            readonly enterKeys: boolean[];
            handle: EditorHandle<object> | null;
            readonly select: (target: SelectionTarget) => void;
            /** Selects the first node of type `name` as a node, which a block with no `nodeId` cannot be named by. */
            readonly selectNode: (name: string) => void;
            readonly execute: (command: string, payload?: unknown) => void;
        };
    }
}

const probe: NonNullable<Window['profileProbe']> = {
    submitted: heard.submitted,
    get enterKeys() {
        return heard.keys.filter(([key]) => key === 'Enter').map(([, prevented]) => prevented);
    },
    handle: null,
    select: (target) => {
        if (probe.handle !== null) {
            setSelection(probe.handle, target);
        }
    },
    selectNode: (name) => {
        if (probe.handle === null) {
            return;
        }
        const runtime = runtimeOf(probe.handle);
        runtime?.view?.state.doc.descendants((node, pos) => {
            if (node.type.name !== name) {
                return true;
            }
            runtime.select({ node: pos });
            return false;
        });
    },
    // A spec names any installed command, which the handle's typed `execute` does not list.
    execute: (command, payload) => {
        if (probe.handle !== null) {
            (probe.handle.execute as (id: string, payload?: unknown) => unknown)(command, payload);
        }
    },
};
window.profileProbe = probe;

interface ProfileProbeProps {
    readonly profile: RichTextProfile;
    /** Sets `onSubmit`, which records each submitted snapshot's text. */
    readonly submits?: boolean;
    readonly required?: boolean;
    /** Sets `enterBehavior: 'none'` once the editor is ready. */
    readonly enterNone?: boolean;
    readonly defaultToolbarMode?: ToolbarMode;
    readonly disabled?: boolean;
    readonly readOnly?: boolean;
    readonly status?: 'neutral' | 'error';
    /** Gives a host asset picker and reference search, so Image and Mention run. */
    readonly withServices?: boolean;
    /** Sets the surface's `id`, the `aria-describedby` and the `aria-errormessage` it names. */
    readonly id?: string;
    readonly describedby?: string;
    readonly errormessage?: string;
}

// A host picker that hands back one asset, and a directory of one person.
const SERVICES = {
    assets: {
        pick: () => Promise.resolve({ assetId: 'logo', mediaType: 'image/png', labelSnapshot: 'logo.png' }),
    },
    references: createFakeReferenceService([
        { resourceType: 'user', resourceId: 'user-ada', labelSnapshot: 'Ada Lovelace', kind: 'user' },
    ]),
};

/** A shipped profile's editor with an empty document, named Message. */
export const ProfileProbe = ({
    profile,
    submits = false,
    required = false,
    enterNone = false,
    defaultToolbarMode = 'fixed',
    disabled = false,
    readOnly = false,
    status = 'neutral',
    withServices = false,
    id,
    describedby,
    errormessage,
}: ProfileProbeProps) => {
    const ref = useRef<EditorHandle<object>>(null);
    const defaultValue = useMemo(
        () => ({ documentId: 'document-1', revision: null, document: createEmptyDocument(PROFILE_MODELS[profile]) }),
        [profile],
    );
    const onReady = () => {
        probe.handle = ref.current;
        if (!enterNone || ref.current === null) {
            return;
        }
        const runtime = runtimeOf(ref.current);
        if (runtime !== undefined) {
            ref.current.updatePolicy({ ...runtime.policy, enterBehavior: 'none' });
        }
    };
    let submitting = {};
    if (submits) {
        submitting = { onSubmit: recordSubmit };
    }
    let services = {};
    if (withServices) {
        services = { services: SERVICES };
    }
    let labelling = {};
    if (id !== undefined) {
        labelling = { ...labelling, id };
    }
    if (describedby !== undefined) {
        labelling = { ...labelling, 'aria-describedby': describedby };
    }
    if (errormessage !== undefined) {
        labelling = { ...labelling, 'aria-errormessage': errormessage };
    }
    return (
        <RichTextEditor
            aria-label="Message"
            profile={profile}
            defaultValue={defaultValue}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            status={status}
            defaultToolbarMode={defaultToolbarMode}
            onReady={onReady}
            ref={ref}
            {...submitting}
            {...services}
            {...labelling}
        />
    );
};
