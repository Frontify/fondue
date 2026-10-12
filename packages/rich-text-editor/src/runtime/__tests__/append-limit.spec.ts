/* (c) Copyright Frontify Ltd., all rights reserved. */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { compileDefinition } from '#/definition';
import { fixtureHistory } from '#/features/__tests__/fixtures/features';
import { core } from '#/features/core/feature';
import { compileContentModel, type Diagnostic } from '#/model';
import { decodeToTree, limitsOf } from '#/model/decode';
import { typeText } from '#/testing';

import { CAPABILITIES } from '../capabilities';
import { authoringOf } from '../policy';
import { createEditorRuntime } from '../runtime';

import type * as Engine from 'prosemirror-state';

// The compiled `history` plugin appends nothing, so here it appends to every batch.
vi.mock('prosemirror-state', async (importOriginal) => {
    const engine = await importOriginal<typeof Engine>();
    class Plugin extends engine.Plugin {
        constructor(spec: ConstructorParameters<typeof engine.Plugin>[0]) {
            const history =
                spec.key !== undefined && (spec.key as unknown as { key: string }).key.startsWith('history$');
            if (!history || spec.appendTransaction !== undefined) {
                super(spec);
                return;
            }
            super({ ...spec, appendTransaction: (_transactions, _old, state) => state.tr });
        }
    }
    return { ...engine, Plugin };
});

describe('the append limit of a compiled definition', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('counts the appends of every plugin the compiler emits, with no wrapping by hand', () => {
        vi.useFakeTimers();
        const model = compileContentModel([core(), fixtureHistory()], { id: 'test.append', version: 1 });
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
        const runtime = createEditorRuntime({
            definition: compileDefinition(model, CAPABILITIES),
            documentId: 'document-1',
            tree: tree as NonNullable<typeof tree>,
            capabilities: [],
            mode: 'editable',
            policy: authoringOf(model),
            // ProseMirror calls a plugin's `appendTransaction` only with transactions it has not seen, so one plugin appends once.
            limits: limitsOf({ maxAppendedTransactions: 0 }),
        });
        const diagnostics: Diagnostic[] = [];
        runtime.handle.subscribe('diagnostic', (diagnostic: Diagnostic) => diagnostics.push(diagnostic));
        runtime.attach(document.body.appendChild(document.createElement('div')));
        vi.runAllTimers();

        typeText(runtime.handle, 'a');

        expect(runtime.handle.getSummary().phase).toBe('faulted');
        expect(diagnostics.map(({ code, details }) => ({ code, details }))).toEqual([
            {
                code: 'runtime.append-limit',
                details: { features: ['core'], capabilities: ['history'], count: 1 },
            },
        ]);
        runtime.handle.dispose();
    });
});
