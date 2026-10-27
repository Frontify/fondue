/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Ref, useMemo } from 'react';

import { portOfHandle, type ShippedCommands } from '#/runtime/port';

import { fieldProps, type RichTextFormField } from '../helpers/formField';
import { validityOf } from '../helpers/validity';
import { type EditorHandle } from '../types';

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
            const runtime = portOfHandle(handle);
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
