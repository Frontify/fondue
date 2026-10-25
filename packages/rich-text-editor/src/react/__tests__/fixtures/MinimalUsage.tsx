/* (c) Copyright Frontify Ltd., all rights reserved. */

import { documentModel } from '#/features';
import { RichTextEditor } from '#/index';
import { createEmptyDocument } from '#/model';

const defaultValue = { documentId: 'document-1', revision: null, document: createEmptyDocument(documentModel) };

/** The fewest props a host passes: the record and one accessible name, in the default Document profile, unmanaged. */
export const MinimalUsage = () => <RichTextEditor aria-label="Notes" defaultValue={defaultValue} />;

export const labelled = <RichTextEditor aria-labelledby="notes-label" defaultValue={defaultValue} />;

// @ts-expect-error: one accessible name source is required.
export const unnamed = <RichTextEditor defaultValue={defaultValue} />;

// @ts-expect-error: only one accessible name source is allowed.
export const twice = <RichTextEditor aria-label="Notes" aria-labelledby="notes-label" defaultValue={defaultValue} />;

// @ts-expect-error: the record to load is required.
export const valueless = <RichTextEditor aria-label="Notes" />;
