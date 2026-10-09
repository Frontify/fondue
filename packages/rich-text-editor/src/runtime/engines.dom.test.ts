/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import { compileDefinition } from '#/definition';
import { core } from '#/features/core/feature';
import { compileContentModel, type Diagnostic } from '#/model';
import { decodeToTree, limitsOf } from '#/model/decode';
import { createTestEnvironment } from '#/testing';

import { CAPABILITIES } from './capabilities';
import { authoringOf } from './policy';
import { createEditorRuntime } from './runtime';

// This package resolves a second module instance of `prosemirror-model`, while `prosemirror-state`,
// `prosemirror-transform` and `prosemirror-view` keep the first, so the engine packages see two copies.
vi.mock('prosemirror-model', () => vi.importActual('prosemirror-model?second-copy'));

describe('a second copy of the engine', () => {
    it('SPEC-rich-text/AC-006 reports a second copy of prosemirror-model once per page and keeps mounting', () => {
        const model = compileContentModel([core()], { id: 'test.engines', version: 1 });
        const definition = compileDefinition(model, CAPABILITIES);
        const { tree } = decodeToTree(
            {
                format: 'frontify.rich-text',
                formatVersion: 1,
                model: model.ref,
                requiredCapabilities: [{ id: 'core', version: 1 }],
                content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [{ type: 'paragraph' }] },
            },
            model,
        );
        const diagnostics: Diagnostic[] = [];
        const phases: string[] = [];
        for (const documentId of ['document-1', 'document-2']) {
            const environment = createTestEnvironment({ seed: 1 });
            const runtime = createEditorRuntime({
                definition,
                documentId,
                tree: tree as NonNullable<typeof tree>,
                capabilities: [],
                environment,
                mode: 'editable',
                policy: authoringOf(model),
                limits: limitsOf(undefined),
            });
            runtime.handle.subscribe('diagnostic', (diagnostic: Diagnostic) => diagnostics.push(diagnostic));
            runtime.attach(document.body.appendChild(document.createElement('div')));
            environment.flushFrames();
            phases.push(runtime.handle.getSummary().phase);
            runtime.handle.dispose();
        }

        expect(diagnostics).toEqual([
            {
                code: 'runtime.duplicate-engine',
                severity: 'warning',
                messageKey: 'runtime.duplicate-engine',
                details: { packages: ['prosemirror-model'] },
            },
        ]);
        expect(phases).toEqual(['ready', 'ready']);
    });
});
