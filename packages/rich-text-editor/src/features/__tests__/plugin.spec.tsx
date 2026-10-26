/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { definePlugin } from '#/bridge/definePlugin';
import {
    type CommandsOfPart,
    defineEditorPart,
    defineReactPresentation,
    type EditorPart,
    extendPlugin,
} from '#/entries/authoring';
import { featuresById } from '#/features';
import { commandCases } from '#/features/__tests__/fixtures/contract.cases';
import { FIXTURE_PLUGINS } from '#/features/__tests__/fixtures/plugins';
import { spotlight, spotlightDocument } from '#/features/__tests__/fixtures/spotlight/feature';
import { type UnitCommands, unitsOf } from '#/features/__tests__/fixtures/units';
import { codeBlockPlugin } from '#/features/blocksCode';
import { codeBlock } from '#/features/blocksCode/feature';
import { corePlugin } from '#/features/core';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marksBold/feature';
import { registry } from '#/features/registry';
import { type AuthoringPolicy, defineEditor, type EditorHandle, type RichTextPlugin, RichTextEditor } from '#/index';
import { compileContentModel, defineFeature, DefinitionError, type JsonObject } from '#/model';
import { extensionsOf } from '#/react/engine';
import { runtimeOf } from '#/runtime/runtime';
import { paste, pressKey, runFeatureContract, setSelection } from '#/testing';

// With every shipped feature, whose fixtures the shipped ones need, as an outside feature joins a profile.
const features = [...featuresById(Object.keys(registry)), spotlight()];
runFeatureContract(features, { plugins: FIXTURE_PLUGINS, fixtures: [spotlightDocument] });
commandCases(features, FIXTURE_PLUGINS);

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const model = compileContentModel([core(), spotlight()], { id: 'fixture.spotlight', version: 1 });

const mount = (readOnly = false) => {
    const definition = defineEditor({ id: 'fixture.spotlight', model, plugins: unitsOf(model, FIXTURE_PLUGINS) });
    const ref = createRef<EditorHandle>();
    render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            presentation={defineReactPresentation({
                toolbar: [['fixture.spotlight.toggle', 'fixture.spotlight.panel']],
            })}
            defaultValue={{ documentId: 'document-1', revision: null, document: spotlightDocument }}
            readOnly={readOnly}
            ref={ref}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    const view = handle === null ? undefined : runtimeOf(handle)?.view;
    if (handle === null || view === undefined) {
        throw new Error('The editor did not mount.');
    }

    return { handle, view };
};

const firstBlock = (handle: EditorHandle) => handle.getSnapshot().document.content.content?.[0]?.content;

describe('a plugin added only in its own files', () => {
    it('renders its own toolbar control, whose command toggles its mark as one undo step', () => {
        const { handle } = mount();
        act(() => {
            setSelection(handle, { text: 'Read' });
        });
        const control = screen.getByTestId('fixture-spotlight-control');

        expect(control).toHaveAttribute('aria-pressed', 'false');
        act(() => {
            control.click();
        });

        expect(firstBlock(handle)?.[0]).toEqual({ type: 'text', text: 'Read', marks: [{ type: 'fixture_spotlight' }] });
        expect(control).toHaveAttribute('aria-pressed', 'true');
        act(() => {
            handle.execute('history.undo');
        });
        expect(firstBlock(handle)?.[0]).toEqual({ type: 'text', text: 'Read the ' });
    });

    it('gives its own control the key binding of its command', () => {
        mount();

        expect(screen.getByTestId('fixture-spotlight-control')).toHaveAttribute('aria-keyshortcuts', 'Control+Shift+L');
    });

    it('moves focus into its panel when the panel opens, and closes the panel on Escape', () => {
        const { view } = mount();

        act(() => {
            screen.getByRole('button', { name: 'Spotlit passages' }).click();
        });
        const panel = screen.getByRole('region', { name: 'Spotlit passages' });
        expect(within(panel).getByRole('button')).toHaveFocus();

        fireEvent.keyDown(within(panel).getByRole('button'), { key: 'Escape' });
        expect(screen.queryByRole('region', { name: 'Spotlit passages' })).toBeNull();
        expect(view.dom).toHaveFocus();
    });

    it('pastes a `mark` as its mark unless another editor’s search left it behind', () => {
        const { handle } = mount();
        act(() => {
            setSelection(handle, { text: ' part.', from: 6, to: 6 });
        });
        act(() => {
            paste(handle, { html: '<mark>kept</mark> <mark data-search-hit="">found</mark>', text: 'kept found' });
        });

        expect(firstBlock(handle)).toEqual([
            { type: 'text', text: 'Read the ' },
            { type: 'text', text: 'spotlit', marks: [{ type: 'fixture_spotlight' }] },
            { type: 'text', text: ' part.' },
            { type: 'text', text: 'kept', marks: [{ type: 'fixture_spotlight' }] },
            { type: 'text', text: ' found' },
        ]);
    });

    it('opens and closes its panel from its toolbar toggle, in a read-only editor too', () => {
        mount(true);
        const toggle = screen.getByRole('button', { name: 'Spotlit passages' });

        act(() => {
            toggle.click();
        });
        expect(screen.getByRole('region', { name: 'Spotlit passages' })).toHaveTextContent('1 spotlit passages');
        expect(toggle).toHaveAttribute('aria-pressed', 'true');

        act(() => {
            toggle.click();
        });
        expect(screen.queryByRole('region', { name: 'Spotlit passages' })).toBeNull();
    });

    it('refuses a plugin for a feature the model does not install', () => {
        const bare = compileContentModel([core()], { id: 'fixture.bare', version: 1 });
        const [editor] = FIXTURE_PLUGINS;
        const orphan = definePlugin({ feature: spotlight, editor })();

        const plugins: readonly RichTextPlugin[] = [...unitsOf(bare), orphan];

        expect(() => defineEditor({ id: 'fixture.bare', model: bare, plugins })).toThrow(DefinitionError);
    });
});

describe('a host part for a feature the package ships', () => {
    const boldModel = compileContentModel([core(), bold()], { id: 'fixture.bold', version: 1 });
    const boldDocument = {
        format: 'frontify.rich-text' as const,
        formatVersion: 1 as const,
        model: { id: 'fixture.bold', version: 1 },
        requiredCapabilities: [{ id: 'core', version: 1 }],
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: [{ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'one two' }] }],
        },
    };
    const strong = defineEditorPart(bold, {
        commands: { 'mark.bold.count': { run: () => true } },
        toolbar: [
            {
                id: 'bold',
                kind: 'toggle',
                command: 'mark.bold.toggle',
                label: { 'en-US': 'Strong' },
                icon: 'IconTextFormatBold',
            },
        ],
    });

    it('keeps the shipped commands, adds its own, and replaces a toolbar entry of the same id', () => {
        const definition = defineEditor({
            id: 'fixture.bold',
            model: boldModel,
            plugins: unitsOf(boldModel, [strong]),
        });
        const ref = createRef<EditorHandle<UnitCommands & CommandsOfPart<typeof strong>>>();
        render(
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                presentation={defineReactPresentation({ toolbar: [['mark.bold.toggle']] })}
                defaultValue={{ documentId: 'document-1', revision: null, document: boldDocument }}
                ref={ref}
            />,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        expect(ref.current?.query('mark.bold.toggle').enabled).toBe(true);
        expect(ref.current?.execute('mark.bold.count').status).not.toBe('rejected');
        const toolbar = screen.getByRole('toolbar');
        expect(within(toolbar).getByRole('button', { name: 'Strong' })).toBeDefined();
        expect(within(toolbar).queryByRole('button', { name: 'Bold' })).toBeNull();
    });

    it('shows pressed only the toolbar entry whose payload its command answers active for', () => {
        const weights = defineEditorPart(bold, {
            commands: {
                'mark.bold.weight': {
                    payload: { fields: { weight: { type: 'integer', min: 1, max: 2 } } },
                    run: (_api, payload: { weight: number }) => payload.weight > 0,
                    active: (_api, payload: { weight: number }) => payload.weight === 1,
                },
            },
            toolbar: [1, 2].map((weight) => ({
                id: `weight-${weight}`,
                kind: 'toggle' as const,
                command: 'mark.bold.weight',
                payload: { weight },
                label: { 'en-US': `Weight ${weight}` },
                icon: 'IconTextFormatBold',
            })),
        });
        const definition = defineEditor({
            id: 'fixture.bold',
            model: boldModel,
            plugins: unitsOf(boldModel, [weights]),
        });
        render(
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                presentation={defineReactPresentation({
                    toolbar: [[1, 2].map((weight) => ({ command: 'mark.bold.weight', payload: { weight } }))],
                })}
                defaultValue={{ documentId: 'document-1', revision: null, document: boldDocument }}
            />,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        const toolbar = screen.getByRole('toolbar');

        expect(within(toolbar).getByRole('button', { name: 'Weight 1' })).toHaveAttribute('aria-pressed', 'true');
        expect(within(toolbar).getByRole('button', { name: 'Weight 2' })).toHaveAttribute('aria-pressed', 'false');
    });

    it('refuses two units for one feature', () => {
        const units = unitsOf(boldModel, [strong]);

        expect(() => defineEditor({ id: 'fixture.bold', model: boldModel, plugins: [...units, ...units] })).toThrow(
            DefinitionError,
        );
    });

    it('keeps the shipped code highlighting when it adds a decoration source to blocks.code', () => {
        const codeModel = compileContentModel([core(), codeBlock()], { id: 'fixture.code', version: 1 });
        const shipped = codeBlockPlugin();
        const marked = extendPlugin(shipped, {
            decorations: [
                ...(shipped.editor.decorations ?? []),
                { id: 'fixture.marked', nodes: ['code_block'], derive: () => [] },
            ],
        });
        const extension = extensionsOf(codeModel, [corePlugin(), marked]).find(
            ({ featureId }) => featureId === 'blocks.code',
        );
        expect(extension?.decorations.map(({ id }) => id)).toEqual(['code-syntax', 'fixture.marked']);
    });
});

describe('a plugin part that reads the policy and its options', () => {
    /** An editor of `features` with its parts, a paragraph `Body`, and `toolbar`. */
    const mountWith = (
        features: Parameters<typeof compileContentModel>[0],
        plugins: readonly EditorPart[],
        toolbar: ReturnType<typeof defineReactPresentation>['toolbar'],
        policy: Partial<AuthoringPolicy> = {},
    ) => {
        const fixtureModel = compileContentModel(features, { id: 'fixture.parts', version: 1 });
        const definition = defineEditor({
            id: 'fixture.parts',
            model: fixtureModel,
            plugins: unitsOf(fixtureModel, plugins),
            policy,
        });
        const ref = createRef<EditorHandle<Record<string, unknown>>>();
        const document = {
            format: 'frontify.rich-text' as const,
            formatVersion: 1 as const,
            model: fixtureModel.ref,
            requiredCapabilities: fixtureModel.capabilities,
            content: {
                type: 'doc',
                attrs: { lang: null, dir: 'auto' },
                content: [{ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'Body' }] }],
            },
        };
        const rendered = render(
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                presentation={defineReactPresentation({ toolbar })}
                defaultValue={{ documentId: 'document-1', revision: null, document }}
                ref={ref}
            />,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        if (ref.current === null) {
            throw new Error('The editor did not mount.');
        }

        setSelection(ref.current, { text: 'Body', from: 1, to: 1 });

        return { handle: ref.current, unmount: rendered.unmount };
    };

    it('rejects a payload the policy refuses as not-allowed before applicability, and does not offer its entry', () => {
        const levels = defineFeature({ id: 'fixture.levels', version: 1, requires: [{ id: 'core', version: 1 }] });
        const levelsEditor = defineEditorPart(levels, {
            commands: {
                // The text style picker lists the rows of `heading.set`, which this feature's model does not install.
                'heading.set': {
                    payload: { fields: { level: { type: 'integer', min: 1, max: 6 } } },
                    run: (_api, payload: { level: number }) => payload.level < 0,
                    refuses: (policy, payload: { level: number }) =>
                        !policy.creatableHeadingLevels.some((level) => level === payload.level),
                },
            },
            toolbar: [1, 2].map((level) => ({
                id: `level-${level}`,
                kind: 'toggle' as const,
                command: 'heading.set',
                payload: { level },
                label: { 'en-US': `Level ${level}` },
                icon: 'IconHeading',
            })),
        });
        const { handle } = mountWith([core(), levels()], [levelsEditor], [['text-style']], {
            creatableHeadingLevels: [1],
        });

        expect(handle.execute('heading.set', { level: 2 })).toMatchObject({ status: 'rejected', code: 'not-allowed' });
        expect(handle.query('heading.set', { level: 2 }).disabledReason).toBe('not-allowed');
        expect(handle.execute('heading.set', { level: 1 })).toMatchObject({
            status: 'rejected',
            code: 'not-applicable',
        });
        act(() => {
            fireEvent.pointerDown(screen.getByRole('button', { name: 'Normal text' }), {
                button: 0,
                ctrlKey: false,
                pointerType: 'mouse',
            });
        });
        expect(screen.getAllByRole('menuitemradio').map((row) => row.textContent)).toEqual(['Normal text', 'Level 1']);
    });

    it('takes its keys, toolbar entries and payload values from the options of its feature', () => {
        const picks = defineFeature({
            id: 'fixture.picks',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            options: { third: { type: 'boolean', default: true } },
        });
        const picksEditor = defineEditorPart(picks, (options: JsonObject) => {
            const values = ['first', 'second'];
            if (options.third === true) {
                values.push('third');
            }

            return {
                needs: ['insert'],
                commands: {
                    'fixture.pick': {
                        payload: { fields: { value: { type: 'enum', values } } },
                        run: (api, payload: { value: string }) => api.insert.text(payload.value),
                    },
                },
                keys: Object.fromEntries(
                    values.map((value, index) => [
                        `Mod-Shift-${index + 1}`,
                        { command: 'fixture.pick', payload: { value } },
                    ]),
                ),
                toolbar: values.map((value) => ({
                    id: value,
                    kind: 'button' as const,
                    command: 'fixture.pick',
                    payload: { value },
                    label: { 'en-US': `Pick ${value}` },
                    icon: 'IconHeading',
                })),
            };
        });
        const toolbar = [
            ['first', 'second', 'third'].map((value) => ({ command: 'fixture.pick', payload: { value } })),
        ];
        const shown = () =>
            ['first', 'second', 'third'].filter(
                (value) =>
                    within(screen.getByRole('toolbar')).queryByRole('button', { name: `Pick ${value}` }) !== null,
            );

        const wide = mountWith([core(), picks()], [picksEditor], toolbar);
        const all = shown();
        wide.unmount();
        const { handle } = mountWith([core(), picks({ third: false })], [picksEditor], toolbar);
        act(() => {
            pressKey(handle, 'Mod-Shift-3');
            pressKey(handle, 'Mod-Shift-2');
        });

        expect(all).toEqual(['first', 'second', 'third']);
        expect(shown()).toEqual(['first', 'second']);
        const first = handle.getSnapshot().document.content.content?.[0];
        expect(first?.content).toEqual([{ type: 'text', text: 'Bsecondody' }]);
        expect(handle.execute('fixture.pick', { value: 'third' })).toEqual({
            status: 'rejected',
            code: 'invalid-payload',
        });
    });
});
