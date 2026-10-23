/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useMemo, useRef, useState } from 'react';

import { fixtureEditorsOf } from '#/features/__tests__/fixtures/editors';
import {
    COLOR_TOKENS,
    plain,
    STYLE_MAP,
    styled,
    styledDocument,
    styledHeading,
    styleModel,
} from '#/features/__tests__/fixtures/styles';
import { defineEditor, defineReactPresentation, type EditorHandle, RichTextEditor } from '#/index';
import { type RichTextDocument } from '#/model';
import { RichTextReader } from '#/reader';
import { setSelection } from '#/testing';

const model = styleModel();
const definition = defineEditor({ id: 'test.styles', model, plugins: fixtureEditorsOf(model) });

/** One block per style of the shared map, each with its own text, and a deprecated and an unknown style. */
const document = styledDocument(model, [
    styledHeading('brand.title', 2, plain('Title style')),
    styled('brand.lead', plain('Lead style')),
    styled('brand.caption', plain('Caption style')),
    styledHeading('brand.caption', 3, plain('Caption heading')),
    styled('brand.legacy', plain('Legacy style')),
    styled('brand.unknown', plain('Unknown style')),
]);

export interface StyleChange {
    readonly commandId: string | null;
    readonly sequence: number;
}

declare global {
    interface Window {
        /** The style probe's handle, the selection helper and each change. */
        styleRte?: {
            readonly handle: EditorHandle;
            readonly setSelection: typeof setSelection;
            readonly changes: StyleChange[];
        };
    }
}

/**
 * Mounts the brand style features through `RichTextEditor` with the shared style map and the text style picker, and
 * below it the reader of the same document with the same presentation. `leadSize` replaces the Lead recipe's font size.
 */
export const StyleProbe = ({ leadSize }: { readonly leadSize?: number }) => {
    const presentation = useMemo(() => {
        const styles = STYLE_MAP.map((style) => {
            if (style.id !== 'brand.lead' || leadSize === undefined) {
                return style;
            }
            return { ...style, recipe: { ...style.recipe, fontSize: leadSize } };
        });
        return defineReactPresentation({ styles, colorTokens: COLOR_TOKENS, toolbar: [['text-style']] });
    }, [leadSize]);
    const ref = useRef<EditorHandle>(null);
    const changesRef = useRef<StyleChange[]>([]);
    const [shown, setShown] = useState<RichTextDocument>(document);
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.styleRte = { handle, setSelection, changes: changesRef.current };
        }
    }, []);
    return (
        <>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                presentation={presentation}
                defaultValue={{ documentId: 'document-1', revision: null, document }}
                ref={ref}
                onDocumentChange={({ commandId, stamp, readDocument }) => {
                    changesRef.current.push({ commandId, sequence: stamp.sequence });
                    setShown(readDocument());
                }}
            />
            <section aria-label="Reader">
                <RichTextReader document={shown} model={model} presentation={presentation} />
            </section>
        </>
    );
};
