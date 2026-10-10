/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Ref, useMemo } from 'react';

import { type RichTextDocument, type RuntimeEnvironment } from '#/model';
import { isRecord } from '#/model/values';
import { type LoadedDocument, type ReplaceResult } from '#/persistence/types';
import { browserEnvironment } from '#/runtime/environment';
import { type EditorRuntime, runtimeOf } from '#/runtime/runtime';
import { type ShippedCommands } from '#/runtime/types';

import { type EditorHandle } from './types';

export interface RichTextFormField {
    getValue(): RichTextDocument;
    validate(): { readonly valid: true } | { readonly valid: false; readonly reason: 'empty' | 'too-long' };
    /** Replaces with the `defaultValue` record, discarding unsaved changes. */
    reset(): Promise<ReplaceResult>;
    /** Resolves with the committed document, or rejects with code `timeout`. */
    getSettledValue(options: { readonly timeoutMs: number }): Promise<RichTextDocument>;
}

/** The editor props the form field reads, by the handle of the session that renders with them. */
interface FieldProps {
    readonly required?: boolean | undefined;
    readonly defaultValue: LoadedDocument;
    readonly environment?: RuntimeEnvironment | undefined;
}
const fieldProps = new WeakMap<object, () => FieldProps>();

/** Lets `useRichTextFormField` read the newest props of the editor behind `handle`. */
export const registerFormField = (handle: object, read: () => FieldProps) => {
    fieldProps.set(handle, read);
};

const VALID = { valid: true } as const;
const EMPTY = { valid: false, reason: 'empty' } as const;
const HARD_BREAK = 'hard_break';

/**
 * Whether stored content holds no non-whitespace text and no leaf or atom node but `hard_break`; a node the schema
 * does not know is an island, which counts as content (`SPEC-rich-text.glossary`, Blank document).
 */
const isBlank = (content: unknown, schema: EditorRuntime['state']['schema']): boolean => {
    if (!isRecord(content)) {
        return true;
    }
    const { type } = content;
    if (type === 'text') {
        return typeof content.text !== 'string' || content.text.trim() === '';
    }
    if (type === HARD_BREAK) {
        return true;
    }
    const nodeType = schema.nodes[String(type)];
    if (nodeType === undefined || nodeType.isLeaf || nodeType.isAtom) {
        return false;
    }
    if (!Array.isArray(content.content)) {
        return true;
    }
    return content.content.every((child) => isBlank(child, schema));
};

/** The editor behind `ref` as a form field: its committed value, `required` check, reset and settled value. */
export const useRichTextFormField = <C extends object = ShippedCommands>(
    ref: Ref<EditorHandle<C>>,
): RichTextFormField =>
    useMemo(() => {
        const sessionOf = () => {
            // A callback ref keeps no handle to read.
            if (ref === null || typeof ref === 'function' || ref.current === null) {
                throw new Error('useRichTextFormField needs the ref object of a mounted RichTextEditor.');
            }
            const handle = ref.current;
            const runtime = runtimeOf(handle);
            const read = fieldProps.get(handle);
            if (runtime === undefined || read === undefined) {
                throw new Error('useRichTextFormField needs the ref object of a mounted RichTextEditor.');
            }
            return { handle, runtime, props: read() };
        };
        return {
            // The committed document, never the DOM's (SPEC-rich-text-persistence/AC-050).
            getValue: () => sessionOf().handle.getSnapshot().document,
            validate: () => {
                const { handle, runtime, props } = sessionOf();
                if (props.required === true && isBlank(handle.getSnapshot().document.content, runtime.state.schema)) {
                    return EMPTY;
                }
                return VALID;
            },
            reset: () => {
                const { handle, props } = sessionOf();
                return handle.replaceDocument({
                    expected: handle.getSnapshot().stamp,
                    next: props.defaultValue,
                    unsaved: { action: 'discard', confirmed: true },
                    selection: 'start',
                    history: 'reset',
                });
            },
            // A form never submits half-composed text (SPEC-rich-text-persistence/AC-061).
            getSettledValue: ({ timeoutMs }) => {
                const { handle, runtime, props } = sessionOf();
                if (!handle.getSummary().compositionActive) {
                    return Promise.resolve(handle.getSnapshot().document);
                }
                const { clock } = props.environment ?? browserEnvironment;
                return new Promise((resolve, reject) => {
                    const stop = runtime.afterInput(() => {
                        clock.clearTimeout(timer);
                        resolve(handle.getSnapshot().document);
                    });
                    const timer = clock.setTimeout(() => {
                        stop();
                        reject(Object.assign(new Error('The input did not settle in time.'), { code: 'timeout' }));
                    }, timeoutMs);
                });
            },
        };
    }, [ref]);
