/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render } from '@testing-library/react';
import { createRef, Profiler, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useEditorSelection } from '#/bridge/hooks';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { core } from '#/features/core/feature';
import { links } from '#/features/links/feature';
import { compileContentModel, type Diagnostic } from '#/model';
import { type RuntimeHandle } from '#/runtime/runtime';
import { type CommandResult } from '#/runtime/types';
import { setSelection, typeText } from '#/testing';

import { defineEditor } from '../define';
import { RichTextEditor } from '../rich-text-editor';
import { type EditorHandle } from '../types';

import { definition, para, defaultValue, type Props } from './fixtures/editor-harness';

vi.mock('#/model', { spy: true });
vi.mock('#/definition/schema', { spy: true });

beforeEach(() => {
    vi.useFakeTimers();
});
afterEach(() => {
    vi.useRealTimers();
});

describe('RichTextEditor host surface', () => {
    it('gives a host mount effect the handle on the first commit, with a shipped editor part installed', () => {
        const linkedModel = compileContentModel([core(), links()], { id: 'test.editor', version: 1 });
        const linked = defineEditor({ id: 'test.linked', model: linkedModel, plugins: unitsOf(linkedModel) });
        const seen: (EditorHandle<object> | null)[] = [];
        const Host = () => {
            const ref = useRef<EditorHandle<object>>(null);
            useEffect(() => {
                seen.push(ref.current);
            }, []);
            return (
                <RichTextEditor
                    aria-label="Notes"
                    definition={linked}
                    defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
                    ref={ref}
                />
            );
        };
        render(<Host />);

        expect(seen).toHaveLength(1);
        expect(seen[0]?.getSummary().phase).toBe('mounting');
    });

    it('keeps a selector result with equal fields under a shallow equality function', () => {
        const ref = createRef<EditorHandle<object>>();
        const seen: { readonly active: boolean }[] = [];
        let renders = 0;
        const shallow = (a: { readonly active: boolean }, b: { readonly active: boolean }) => a.active === b.active;
        const Collapsed = () => {
            seen.push(useEditorSelection((selection) => ({ active: selection.collapsed }), shallow));
            return null;
        };
        const { unmount } = render(
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Profiler id="collapsed" onRender={() => (renders += 1)}>
                    <Collapsed />
                </Profiler>
            </RichTextEditor.Root>,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        const handle = ref.current as EditorHandle<object>;
        const before = renders;

        // Each typed character is a commit with a new selection summary whose `collapsed` stays true.
        act(() => typeText(handle, 'xyz'));
        expect(renders).toBe(before);

        act(() => setSelection(handle, { text: 'ab' }));
        expect(renders).toBe(before + 1);
        expect(seen.at(-1)).toEqual({ active: false });
        unmount();
    });

    it('warns once from the second of two editors that share an accessible name', () => {
        const run = (first: Props, second: Props) => {
            const firstDiagnostics = vi.fn<(diagnostic: Diagnostic) => void>();
            const secondDiagnostics = vi.fn<(diagnostic: Diagnostic) => void>();
            const editor = (props: Props, onDiagnostic: (diagnostic: Diagnostic) => void) => (
                <RichTextEditor
                    aria-label="Notes"
                    definition={definition}
                    defaultValue={defaultValue()}
                    onDiagnostic={onDiagnostic}
                    {...props}
                />
            );
            const { unmount } = render(
                <>
                    <span id="label-a">Meeting notes</span>
                    <span id="label-b">Meeting notes</span>
                    {editor(first, firstDiagnostics)}
                    {editor(second, secondDiagnostics)}
                </>,
            );
            act(() => {
                vi.advanceTimersToNextFrame();
            });
            const codes = (spy: typeof firstDiagnostics) => spy.mock.calls.map(([{ code }]) => code);
            unmount();
            return [codes(firstDiagnostics), codes(secondDiagnostics)];
        };

        expect(run({}, {})).toEqual([[], ['react.duplicate-accessible-name']]);
        const labelledBy = (id: string) => ({ 'aria-label': undefined, 'aria-labelledby': id }) as unknown as Props;
        expect(run(labelledBy('label-a'), labelledBy('label-b'))).toEqual([[], ['react.duplicate-accessible-name']]);
        expect(run({}, { 'aria-label': 'Summary' } as Props)).toEqual([[], []]);
    });

    it('warns from the editor mounted second even when it sits before the first', () => {
        const first = vi.fn<(diagnostic: Diagnostic) => void>();
        const second = vi.fn<(diagnostic: Diagnostic) => void>();
        const editor = (key: string, onDiagnostic: (diagnostic: Diagnostic) => void) => (
            <RichTextEditor
                key={key}
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue()}
                onDiagnostic={onDiagnostic}
            />
        );
        const { rerender, unmount } = render(<>{[editor('a', first)]}</>);
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        rerender(<>{[editor('b', second), editor('a', first)]}</>);
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        expect(first).not.toHaveBeenCalled();
        expect(second.mock.calls.map(([{ code }]) => code)).toEqual(['react.duplicate-accessible-name']);
        unmount();
    });

    it('warns from an editor mounted after another remounted its surface', () => {
        const first = vi.fn<(diagnostic: Diagnostic) => void>();
        const second = vi.fn<(diagnostic: Diagnostic) => void>();
        const tree = (surfaceKey: string, withSecond: boolean) => (
            <>
                <RichTextEditor.Root
                    aria-label="Notes"
                    definition={definition}
                    defaultValue={defaultValue()}
                    onDiagnostic={first}
                >
                    <RichTextEditor.Surface key={surfaceKey} />
                </RichTextEditor.Root>
                {withSecond && (
                    <RichTextEditor
                        aria-label="Notes"
                        definition={definition}
                        defaultValue={defaultValue()}
                        onDiagnostic={second}
                    />
                )}
            </>
        );
        const { rerender, unmount } = render(tree('a', false));
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        rerender(tree('b', false));

        rerender(tree('b', true));
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        expect(first).not.toHaveBeenCalled();
        expect(second.mock.calls.map(([{ code }]) => code)).toEqual(['react.duplicate-accessible-name']);
        unmount();
    });

    it('reports no duplicate accessible name in a production build', () => {
        vi.stubEnv('NODE_ENV', 'production');
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
        const editor = () => (
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue()}
                onDiagnostic={onDiagnostic}
            />
        );
        const { unmount } = render(
            <>
                {editor()}
                {editor()}
            </>,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        expect(onDiagnostic).not.toHaveBeenCalled();
        unmount();
        vi.unstubAllEnvs();
    });

    it.each(['render', 'effect', 'layout effect'] as const)(
        'rejects execute from a React %s with one react.execute-in-render error and no change',
        (during) => {
            const ref = createRef<EditorHandle<object>>();
            const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
            const results: CommandResult[] = [];
            const insert = () => {
                const commands = ref.current as unknown as Pick<RuntimeHandle, 'execute'>;
                return commands.execute('text.insert', { text: 'x' });
            };
            const Caller = ({ calling }: { readonly calling: boolean }) => {
                if (calling && during === 'render') {
                    results.push(insert());
                }
                useEffect(() => {
                    if (calling && during === 'effect') {
                        results.push(insert());
                    }
                });
                useLayoutEffect(() => {
                    if (calling && during === 'layout effect') {
                        results.push(insert());
                    }
                });
                return null;
            };
            const tree = (calling: boolean) => (
                <RichTextEditor.Root
                    aria-label="Notes"
                    definition={definition}
                    defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
                    onDiagnostic={onDiagnostic}
                    ref={ref}
                >
                    <RichTextEditor.Surface />
                    <Caller calling={calling} />
                </RichTextEditor.Root>
            );
            const { rerender, unmount } = render(tree(false));
            act(() => {
                vi.advanceTimersToNextFrame();
            });
            const before = (ref.current as EditorHandle<object>).getSnapshot();

            rerender(tree(true));

            expect(results).toEqual([{ status: 'rejected', code: 'busy' }]);
            expect(onDiagnostic.mock.calls.map(([{ code, severity }]) => [code, severity])).toEqual([
                ['react.execute-in-render', 'error'],
            ]);
            expect((ref.current as EditorHandle<object>).getSnapshot()).toBe(before);
            // The same call outside React's work, as from an event handler, runs.
            expect(insert().status).toBe('applied');
            unmount();
        },
    );

    it('rejects execute from the render of a part that rerenders from its own state', () => {
        const ref = createRef<EditorHandle<object>>();
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
        const results: CommandResult[] = [];
        let flip: (calling: boolean) => void = () => undefined;
        const Caller = () => {
            const [calling, setCalling] = useState(false);
            flip = setCalling;
            const kind = useEditorSelection((selection) => selection.kind);
            if (calling) {
                const commands = ref.current as unknown as Pick<RuntimeHandle, 'execute'>;
                results.push(commands.execute('text.insert', { text: kind }));
            }
            return null;
        };
        const { unmount } = render(
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
                onDiagnostic={onDiagnostic}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Caller />
            </RichTextEditor.Root>,
        );
        act(() => {
            vi.advanceTimersToNextFrame();
        });
        const before = (ref.current as EditorHandle<object>).getSnapshot();

        // Only the part renders: its own setter runs inside `act`, and the root does not.
        act(() => flip(true));

        expect(results).toEqual([{ status: 'rejected', code: 'busy' }]);
        expect(onDiagnostic.mock.calls.map(([{ code }]) => code)).toEqual(['react.execute-in-render']);
        expect((ref.current as EditorHandle<object>).getSnapshot()).toBe(before);
        unmount();
    });

    it('reports once when the diagnostic listener itself calls execute', () => {
        const ref = createRef<EditorHandle<object>>();
        const insert = () =>
            (ref.current as unknown as Pick<RuntimeHandle, 'execute'>).execute('text.insert', { text: 'x' });
        const inner: CommandResult[] = [];
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>(() => {
            inner.push(insert());
        });
        const Caller = ({ calling }: { readonly calling: boolean }) => {
            if (calling) {
                insert();
            }
            return null;
        };
        const tree = (calling: boolean) => (
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
                onDiagnostic={onDiagnostic}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Caller calling={calling} />
            </RichTextEditor.Root>
        );
        const { rerender, unmount } = render(tree(false));
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        rerender(tree(true));

        expect(onDiagnostic).toHaveBeenCalledTimes(1);
        expect(inner).toEqual([{ status: 'rejected', code: 'busy' }]);
        unmount();
    });

    it('runs execute from a render with no diagnostic in a production build', () => {
        vi.stubEnv('NODE_ENV', 'production');
        const ref = createRef<EditorHandle<object>>();
        const onDiagnostic = vi.fn<(diagnostic: Diagnostic) => void>();
        const results: CommandResult[] = [];
        const Caller = ({ calling }: { readonly calling: boolean }) => {
            if (calling) {
                results.push(
                    (ref.current as unknown as Pick<RuntimeHandle, 'execute'>).execute('text.insert', { text: 'x' }),
                );
            }
            return null;
        };
        const tree = (calling: boolean) => (
            <RichTextEditor.Root
                aria-label="Notes"
                definition={definition}
                defaultValue={defaultValue(para({ type: 'text', text: 'ab' }))}
                onDiagnostic={onDiagnostic}
                ref={ref}
            >
                <RichTextEditor.Surface />
                <Caller calling={calling} />
            </RichTextEditor.Root>
        );
        const { rerender, unmount } = render(tree(false));
        act(() => {
            vi.advanceTimersToNextFrame();
        });

        rerender(tree(true));

        expect(results.map(({ status }) => status)).toEqual(['applied']);
        expect(onDiagnostic).not.toHaveBeenCalled();
        unmount();
        vi.unstubAllEnvs();
    });
});
