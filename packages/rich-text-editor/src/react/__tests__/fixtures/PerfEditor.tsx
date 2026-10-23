/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { type ProfilerOnRenderCallback, Profiler, useRef, useState } from 'react';

import {
    defineEditor,
    defineReactPresentation,
    type EditorHandle,
    RichTextEditor,
    type RichTextEditorProps,
} from '#/index';
import { RichTextReader } from '#/reader';

import { perfDocument, type PerfFixtureName, perfModel } from '../../../model/__tests__/fixtures/perf/documents';

import pixel from './pixel.png?no-inline';

export const perfDefinition = defineEditor({ id: 'test.perf', model: perfModel });

export const perfPresentation = defineReactPresentation({
    // The page's own origin, since `data:` URLs fail the href check and the test page's CSP allows only `self`.
    resolveAssetUrl: () => new URL(pixel, document.baseURI).href,
    contentClassName: 'host-content',
    toolbar: [['mark.bold.toggle', 'mark.italic.toggle'], ['link.edit'], ['list.bullet.toggle']],
});

/** The value an editor of `fixture` mounts with. */
export const perfValue = (fixture: PerfFixtureName): RichTextEditorProps['defaultValue'] => ({
    documentId: 'document-1',
    revision: null,
    document: perfDocument(fixture, perfModel),
});

/** One editor over a perf fixture, which a component test mounts. */
export const PerfEditor = ({ fixture }: { readonly fixture: PerfFixtureName }) => {
    const [value] = useState(() => perfValue(fixture));
    return (
        <RichTextEditor
            aria-label="Perf"
            definition={perfDefinition}
            presentation={perfPresentation}
            defaultValue={value}
        />
    );
};

/** An editor over a perf fixture, then the reader of the same document in a region named Reader. */
export const PerfEditorWithReader = ({ fixture }: { readonly fixture: PerfFixtureName }) => {
    const [value] = useState(() => perfValue(fixture));
    return (
        <>
            <RichTextEditor
                aria-label="Perf"
                definition={perfDefinition}
                presentation={perfPresentation}
                defaultValue={value}
            />
            <section aria-label="Reader">
                <RichTextReader document={value.document} model={perfModel} presentation={perfPresentation} />
            </section>
        </>
    );
};

const noop = () => undefined;

/** One editor per value inside the theme a host mounts them in, which calls `onReady` once every editor is ready. */
export const PerfTree = ({
    values,
    onReady,
    onRender = noop,
    onHandle = noop,
}: {
    readonly values: readonly RichTextEditorProps['defaultValue'][];
    readonly onReady: (handles: EditorHandle[]) => void;
    readonly onRender?: ProfilerOnRenderCallback;
    readonly onHandle?: (handle: EditorHandle) => void;
}) => {
    const handlesRef = useRef<EditorHandle[]>([]);
    const readyRef = useRef(0);
    const editors = values.map((value, index) => ({ id: `editor-${index}`, value }));
    return (
        <ThemeProvider theme="light">
            {editors.map(({ id, value }) => (
                <Profiler key={id} id={id} onRender={onRender}>
                    <RichTextEditor
                        aria-label={`Perf ${id}`}
                        definition={perfDefinition}
                        presentation={perfPresentation}
                        defaultValue={value}
                        ref={(handle) => {
                            if (handle !== null && !handlesRef.current.includes(handle)) {
                                onHandle(handle);
                                handlesRef.current.push(handle);
                            }
                        }}
                        onReady={() => {
                            readyRef.current += 1;
                            if (readyRef.current === values.length) {
                                onReady(handlesRef.current);
                            }
                        }}
                    />
                </Profiler>
            ))}
        </ThemeProvider>
    );
};
