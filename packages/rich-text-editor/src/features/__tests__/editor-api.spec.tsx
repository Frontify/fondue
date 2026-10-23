/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { bold, core } from '#/features';
import { spotlight } from '#/features/__tests__/fixtures/spotlight/feature';
import {
    type CommandOutcome,
    defineEditor,
    defineEditorPlugin,
    type EditorApi,
    type EditorHandle,
    RichTextEditor,
} from '#/index';
import { compileContentModel, type ContentNodeJSON, type RichTextDocument } from '#/model';
import { type DocumentChange } from '#/runtime/types';
import { setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

// The probe's commands take any payload, which the shipped command map does not name.
type Handle = EditorHandle<Record<string, unknown>>;

// What the command under test does, and what it saw, set by each test.
let script: (api: EditorApi) => boolean = () => false;
let seen: CommandOutcome | undefined;

const probe = defineEditorPlugin(spotlight, {
    commands: {
        'fixture.api.run': { run: (api) => script(api) },
        'fixture.api.read-only': { readOnly: true, run: (api) => script(api) },
    },
});

const model = compileContentModel([core(), bold(), spotlight()], { id: 'fixture.api', version: 1 });

const paragraph: ContentNodeJSON = {
    type: 'paragraph',
    attrs: { lang: null },
    content: [
        { type: 'text', text: 'Plain ' },
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
    ],
};
const stored = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: model.ref,
    requiredCapabilities: model.capabilities,
    content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [paragraph] },
} as unknown as RichTextDocument;

interface Mount {
    readonly readOnly?: boolean;
    readonly disabled?: boolean;
}

const mount = (options?: Mount) => {
    let given: Mount = {};
    if (options !== undefined) {
        given = options;
    }
    const { readOnly = false, disabled = false } = given;
    const definition = defineEditor({ id: 'fixture.api', model, plugins: [probe] });
    const ref = createRef<EditorHandle>();
    const changes: DocumentChange[] = [];
    render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            defaultValue={{ documentId: 'document-1', revision: null, document: stored }}
            readOnly={readOnly}
            disabled={disabled}
            onDocumentChange={(change) => changes.push(change)}
            ref={ref}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    if (ref.current === null) {
        throw new Error('The editor did not mount.');
    }
    return { handle: ref.current as unknown as Handle, changes };
};

/** Runs `run` as a plugin command, as a key or the toolbar would, with the caret in `at`. */
const runIn = (handle: Handle, at: string, run: (api: EditorApi) => boolean, id = 'fixture.api.run') => {
    script = run;
    setSelection(handle, { text: at, from: 1, to: 1 });
    let result: ReturnType<Handle['execute']> | undefined;
    act(() => {
        result = handle.execute(id);
    });
    return result;
};

beforeEach(() => {
    script = () => false;
    seen = undefined;
});

describe('a plugin command in an editor that cannot be edited', () => {
    it.each([
        ['read-only', { readOnly: true }],
        ['disabled', { disabled: true }],
    ])('writes nothing in a %s editor, even when it runs there', (_name, options) => {
        const { handle } = mount(options);

        const result = runIn(handle, 'Plain', (api) => api.insert.text('x'), 'fixture.api.read-only');

        expect(result).toEqual({ status: 'rejected', code: 'readonly' });
    });
});

const text = (value: string, marks?: ContentNodeJSON['marks']): ContentNodeJSON => ({
    type: 'text',
    text: value,
    ...(marks === undefined ? {} : { marks }),
});

describe('the writer of the editor API', () => {
    it.each([
        ['a node the vocabulary does not hold', [{ type: 'table' }]],
        ['a mark the vocabulary does not hold', [text('x', [{ type: 'highlight' }])]],
    ])('refuses %s as invalid and changes nothing', (_name, nodes) => {
        const { handle, changes } = mount();

        runIn(handle, 'Plain', (api) => {
            seen = api.content.insert(api.selectedRange(), nodes);
            return true;
        });

        expect(seen).toEqual({ status: 'rejected', code: 'invalid' });
        expect(changes).toEqual([]);
    });
});

describe('a name the model does not install, in the editor API', () => {
    it('is answered with false or nothing by every member that takes a mark, a node or a list item', () => {
        const { handle } = mount();
        const answers: Record<string, unknown> = {};

        runIn(handle, 'Plain', (api) => {
            answers.markActive = api.marks.active('missing');
            answers.markToggle = api.marks.toggle('missing');
            answers.blockActive = api.blocks.active('missing');
            answers.blockSet = api.blocks.set('missing');
            answers.nearest = api.nearest('missing');
            return false;
        });

        expect(answers).toEqual({
            markActive: false,
            markToggle: false,
            blockActive: false,
            blockSet: false,
            nearest: undefined,
        });
    });
});

describe('the content writes of the editor API that change nothing or go too far', () => {
    it('reports no-op for an empty insert and an empty replacement at a caret', () => {
        const { handle, changes } = mount();
        const outcomes: unknown[] = [];

        runIn(handle, 'Plain', (api) => {
            outcomes.push(api.content.insert(api.selectedRange(), []).status);
            outcomes.push(api.content.replace(api.selectedRange(), []).status);
            return true;
        });

        expect(outcomes).toEqual(['no-op', 'no-op']);
        expect(changes).toEqual([]);
    });
});
