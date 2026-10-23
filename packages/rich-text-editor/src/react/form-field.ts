/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Ref, useMemo } from 'react';

import { type RichTextDocument } from '#/model';
import { type LoadedDocument, type ReplaceResult } from '#/persistence/types';
import { runtimeOf } from '#/runtime/runtime';
import { type ShippedCommands } from '#/runtime/types';

import { type EditorHandle } from './types';
import { validityOf } from './validity';

/** A handle for a form to read the editor's document and check that it is valid. */
export interface RichTextFormField {
    getValue(): RichTextDocument;
    validate(): { readonly valid: true } | { readonly valid: false; readonly reason: 'empty' | 'too-long' };
    /**
     * Replaces with the `defaultValue` record, discarding unsaved changes, and empties the history. A host whose session
     * saves through `services.persistence` keeps `defaultValue` at the last acknowledged record, so a reset discards only
     * unsaved edits.
     */
    reset(): Promise<ReplaceResult>;
    /** Resolves with the committed document, or rejects with code `timeout`. */
    getSettledValue(options: { readonly timeoutMs: number }): Promise<RichTextDocument>;
}

/** The editor props the form field reads, by the handle of the session that renders with them. */
interface FieldProps {
    readonly required?: boolean | undefined;
    readonly defaultValue: LoadedDocument;
}
const fieldProps = new WeakMap<object, () => FieldProps>();

/** Lets `useRichTextFormField` read the newest props of the editor behind `handle`. */
export const registerFormField = (handle: object, read: () => FieldProps) => {
    fieldProps.set(handle, read);
};

const NOT_MOUNTED = 'useRichTextFormField needs the ref object of a mounted RichTextEditor.';
/** The editor behind `ref` as a form field: its committed value, `required` check, reset and settled value. */
export const useRichTextFormField = <C extends object = ShippedCommands>(
    ref: Ref<EditorHandle<C>>,
): RichTextFormField =>
    useMemo(() => {
        const sessionOf = () => {
            // A callback ref keeps no handle to read.
            if (ref === null || typeof ref === 'function' || ref.current === null) {
                throw new Error(NOT_MOUNTED);
            }
            const handle = ref.current;
            const runtime = runtimeOf(handle);
            const read = fieldProps.get(handle);
            if (runtime === undefined || read === undefined) {
                throw new Error(NOT_MOUNTED);
            }
            return { handle, runtime, props: read() };
        };
        return {
            // The committed document, never the DOM's.
            getValue: () => sessionOf().handle.getSnapshot().document,
            validate: () => {
                const { runtime, props } = sessionOf();
                return validityOf(runtime, props.required);
            },
            reset: async () => {
                const { handle, runtime, props } = sessionOf();
                const { generation } = handle.getSummary().session;
                const result = await handle.replaceDocument({
                    expected: handle.getSnapshot().stamp,
                    next: props.defaultValue,
                    unsaved: { action: 'discard', confirmed: true },
                    selection: 'start',
                    history: 'reset',
                });
                // A record equal to the content is an echo, which replaces nothing and so keeps the history (step 1).
                if (result.status === 'replaced' && result.session.generation === generation) {
                    runtime.clearHistory();
                }
                return result;
            },
            // A form never submits half-composed text.
            getSettledValue: ({ timeoutMs }) => {
                const { handle, runtime } = sessionOf();
                if (!handle.getSummary().compositionActive) {
                    return Promise.resolve(handle.getSnapshot().document);
                }
                return new Promise((resolve, reject) => {
                    runtime.afterInput((outcome) => {
                        if (outcome === 'settled') {
                            resolve(handle.getSnapshot().document);
                            return;
                        }
                        if (outcome === 'disposed') {
                            reject(new Error(NOT_MOUNTED));
                            return;
                        }
                        reject(Object.assign(new Error('The input did not settle in time.'), { code: 'timeout' }));
                    }, timeoutMs);
                });
            },
        };
    }, [ref]);
