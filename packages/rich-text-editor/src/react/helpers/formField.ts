/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextDocument } from '#/model';
import { type LoadedDocument, type ReplaceResult } from '#/persistence/types';

/** A handle for a form to read the editor's document and check that it is valid. */
export type RichTextFormField = {
    getValue(): RichTextDocument;
    validate(): { valid: true } | { valid: false; reason: 'empty' | 'too-long' };
    /**
     * Replaces with the `defaultValue` record, discarding unsaved changes, and empties the history. A host whose session
     * saves through `services.persistence` keeps `defaultValue` at the last acknowledged record, so a reset discards only
     * unsaved edits.
     */
    reset(): Promise<ReplaceResult>;
    /** Resolves with the committed document, or rejects with code `timeout`. */
    getSettledValue(options: { timeoutMs: number }): Promise<RichTextDocument>;
};

/** The editor props the form field reads, by the handle of the session that renders with them. */
export type FieldProps = {
    required?: boolean | undefined;
    defaultValue: LoadedDocument;
};
export const fieldProps = new WeakMap<object, () => FieldProps>();

/** Lets `useRichTextFormField` read the newest props of the editor behind `handle`. */
export const registerFormField = (handle: object, read: () => FieldProps) => {
    fieldProps.set(handle, read);
};
