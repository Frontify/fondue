/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { highlight, highlightDocument } from '@frontify/fondue-rich-text-editor-fixture-feature';
import { act, render, screen } from '@testing-library/react';
import { createElement, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { featuresById } from '#/features';
import { core } from '#/features/core/feature';
import { registry } from '#/features/registry';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';
import { type DocumentChange } from '#/runtime/types';
import { createTestEnvironment, pressKey, runFeatureContract, setSelection } from '#/testing';

runFeatureContract([...featuresById(Object.keys(registry)), highlight()], { fixtures: [highlightDocument] });

describe('the outside fixture feature', () => {
    it('SPEC-rich-text/AC-017 fails the fixture cases of an outside document that misspells its mark', async () => {
        const misspelled = {
            ...highlightDocument,
            content: {
                type: 'doc',
                attrs: { lang: null, dir: 'auto' },
                content: [
                    {
                        type: 'paragraph',
                        attrs: { lang: null },
                        content: [{ type: 'text', text: 'Read', marks: [{ type: 'highlite' }] }],
                    },
                ],
            },
        };
        const cases = new Map<string, () => unknown>();
        vi.stubGlobal('describe', (_name: string, body: () => void) => body());
        vi.stubGlobal('it', (name: string, body: () => unknown) => cases.set(name, body));
        try {
            runFeatureContract([core(), highlight()], { fixtures: [misspelled] });
        } finally {
            vi.unstubAllGlobals();
        }
        const failing: string[] = [];
        for (const [name, body] of cases) {
            try {
                await body();
            } catch {
                failing.push(name);
            }
        }

        expect(failing).toEqual([
            'SPEC-rich-text/AC-017 decodes and encodes fixture 1 to itself',
            'SPEC-rich-text/AC-017 renders fixture 1 in the reader and writes it through every codec',
        ]);
    });

    it('SPEC-rich-text/AC-017 shows and toggles its mark in the editor', () => {
        const model = compileContentModel([core(), highlight()], { id: 'fixture.highlight', version: 1 });
        const environment = createTestEnvironment({ seed: 1 });
        const ref = createRef<EditorHandle<object>>();
        const changes: DocumentChange[] = [];
        render(
            createElement(RichTextEditor, {
                'aria-label': 'Notes',
                definition: defineEditor({ id: 'fixture.highlight', model }),
                defaultValue: { documentId: 'document-1', revision: null, document: highlightDocument },
                environment,
                onDocumentChange: (change: DocumentChange) => changes.push(change),
                ref,
            }),
        );
        act(() => environment.flushFrames());
        const handle = ref.current;
        if (handle === null) {
            throw new Error('no handle');
        }
        const marked = screen.getByRole('textbox', { name: 'Notes' }).querySelector('mark');

        expect(marked?.textContent).toBe('highlighted');

        act(() => setSelection(handle, { text: 'part' }));
        act(() => pressKey(handle, 'Mod-Shift-m'));

        expect(changes.map(({ commandId }) => commandId)).toEqual(['fixture.highlight.toggle']);
        expect(changes[0]?.readDocument().content).toEqual({
            ...highlightDocument.content,
            content: [
                {
                    type: 'paragraph',
                    attrs: { lang: null },
                    content: [
                        { type: 'text', text: 'Read the ' },
                        { type: 'text', text: 'highlighted', marks: [{ type: 'fixture_highlight' }] },
                        { type: 'text', text: ' ' },
                        { type: 'text', text: 'part', marks: [{ type: 'fixture_highlight' }] },
                        { type: 'text', text: '.' },
                    ],
                },
            ],
        });
    });
});
