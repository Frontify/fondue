/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createRef } from 'react';

import { bold, core } from '../../src/features';
import { fixtureItalic } from '../../src/features/__fixtures__/features';
import { defineEditor, defineReactPresentation, type EditorHandle, RichTextEditor } from '../../src/index';
import { compileContentModel, createEmptyDocument } from '../../src/model';

// A custom model from shipped features and an outside one without commands (SPEC-rich-text/AC-032).
const model = compileContentModel([core(), bold(), fixtureItalic()], { id: 'acme.notes', version: 1 });
const definition = defineEditor({ id: 'acme.notes', model });
const presentation = defineReactPresentation({ toolbar: [['mark.bold.toggle']] });
const defaultValue = { documentId: 'document-1', revision: null, document: createEmptyDocument(model) };
const ref = createRef<EditorHandle<{ readonly 'mark.bold.toggle': undefined }>>();

export const usage = (
    <RichTextEditor
        aria-label="Notes"
        definition={definition}
        presentation={presentation}
        defaultValue={defaultValue}
        ref={ref}
    />
);

// @ts-expect-error: one accessible name source is required.
export const unnamed = <RichTextEditor definition={definition} defaultValue={defaultValue} />;

// SPEC-rich-text/AC-069: command IDs and payloads come from the compiled definition.
export const commands = (handle: EditorHandle<{ readonly 'mark.bold.toggle': undefined }>, shipped: EditorHandle) => {
    handle.query('mark.bold.toggle');
    // @ts-expect-error: the definition installs no such command.
    handle.query('mark.unknown.toggle');
    // @ts-expect-error: `mark.bold.toggle` takes no payload.
    handle.query('mark.bold.toggle', { level: 1 });
    shipped.query('link.set', { href: 'https://frontify.com', openInNewWindow: false, styleId: null });
    // @ts-expect-error: `link.set` needs a link value.
    shipped.query('link.set', { href: 1 });
};
