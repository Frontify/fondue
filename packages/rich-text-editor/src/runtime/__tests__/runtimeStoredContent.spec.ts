/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { countingIds, notesModel } from '#/features/__tests__/fixtures/notes';
import { core } from '#/features/core/feature';
import { links } from '#/features/links/feature';
import { bold } from '#/features/marks-bold/feature';
import { compileContentModel, migrateDocument } from '#/model';
import { setSelection, typeText } from '#/testing';

import newerNotes from '../../model/__tests__/fixtures/migration/v3-current.json';

import { stored, para, start, contentOf, installRuntimeHooks } from './fixtures/start';

installRuntimeHooks();

describe('stored content the session keeps', () => {
    const linked = compileContentModel([core(), bold(), links()], { id: 'test.bold', version: 1 });
    const link = {
        type: 'link',
        attrs: { href: 'https://frontify.com', openInNewWindow: false, styleId: null, rel: 'x' },
    };

    it('writes undeclared attributes back under their own names after an unrelated edit', () => {
        const plain = { type: 'paragraph', attrs: { lang: null, tone: 'warm', unknownAttributes: 5 }, content: [] };
        const marked = para({ type: 'text', text: 'a', marks: [link] });
        const input = stored(plain, marked);
        const root = { ...input.content, attrs: { lang: null, dir: 'auto', unknownAttributes: { a: 1 } } };
        const { handle, changes } = start({ ...input, content: root }, { model: linked });

        setSelection(handle, { text: 'a', from: 1, to: 1 });
        typeText(handle, 'b');

        const { content: _plainContent, ...withoutContent } = plain;
        expect(contentOf(changes[0])).toEqual({
            ...root,
            content: [withoutContent, para({ type: 'text', text: 'a', marks: [link] }, { type: 'text', text: 'b' })],
        });
    });

    it('applies the declared default of an invalid doc attribute and writes the stored value back', () => {
        const input = stored(para());
        const root = { ...input.content, attrs: { lang: 'en_US', dir: 'auto' } };
        const { handle, changes, runtime } = start({ ...input, content: root });

        expect(runtime.view?.state.doc.attrs).toMatchObject({ lang: null, unknownAttributes: { lang: 'en_US' } });
        typeText(handle, 'a');

        expect(contentOf(changes[0])).toEqual({ ...root, content: [para({ type: 'text', text: 'a' })] });
    });

    it('keeps an island of content the installed model cannot hold through an edit', () => {
        const unknown = {
            type: 'acme_callout',
            attrs: { tone: 'warm' },
            content: [para({ type: 'text', text: 'kept' })],
        };
        const input = {
            ...stored(para(), unknown),
            model: { id: 'test.bold', version: 2 },
            requiredCapabilities: [
                { id: 'acme.callout', version: 1 },
                { id: 'core', version: 1 },
            ],
        };
        const { handle, changes } = start(input);

        typeText(handle, 'a');
        const saved = changes[0]?.readDocument();

        expect(saved?.model).toEqual({ id: 'test.bold', version: 1 });
        expect(saved?.content).toEqual(stored(para({ type: 'text', text: 'a' }), unknown).content);
        expect(saved?.requiredCapabilities).toContainEqual({ id: 'acme.callout', version: 1 });
    });

    it('lets a newer model migrate what an older one saved after an edit through the session', () => {
        const { handle, changes } = start(newerNotes, { model: notesModel(1) });
        setSelection(handle, { text: 'keys', from: 4, to: 4 });
        typeText(handle, '!');
        const saved = changes[0]?.readDocument();
        if (saved === undefined) {
            throw new Error('no change');
        }

        const result = migrateDocument(saved, notesModel(3), { generateId: countingIds() });

        expect(saved.model).toEqual({ id: 'fixture.notes', version: 1 });
        expect(result.status).toBe('migrated');
        expect(result.manifest.steps).toEqual(['fixture.notes.divider-to-rule']);
        const blocks = result.document === null ? [] : result.document.content.content;
        expect(blocks?.[0]).toMatchObject({
            attrs: { nodeId: 'note-8', level: 'danger', collapsed: true },
            content: [{ content: [{ text: 'Rotate the signing keys!' }] }],
        });
        expect(blocks?.[1]).toEqual({ type: 'horizontal_rule' });
    });
});
