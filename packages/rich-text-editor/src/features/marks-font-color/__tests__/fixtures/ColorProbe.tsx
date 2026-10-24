/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

import { COLOR_TOKENS, plain, styled, styledDocument, styleModel } from '#/features/__tests__/fixtures/styles';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { defineEditor, defineReactPresentation, type EditorHandle, RichTextEditor } from '#/index';
import { setSelection } from '#/testing';

const presentation = defineReactPresentation({ colorTokens: COLOR_TOKENS, toolbar: [['mark.color.menu.open']] });

export interface ColorChange {
    readonly commandId: string | null;
    readonly origin: string;
}

declare global {
    interface Window {
        /** The colour probe's handle, the selection helper and each change. */
        colorRte?: {
            readonly handle: EditorHandle;
            readonly setSelection: typeof setSelection;
            readonly changes: ColorChange[];
        };
    }
}

/**
 * Mounts `marks.font-color` and the highlight stand-in through `RichTextEditor` with the colour menu in the toolbar,
 * each with `literalColors` when `literal` is set, over one paragraph.
 */
export const ColorProbe = ({ literal = false }: { readonly literal?: boolean }) => {
    const [mounted] = useState(() => {
        const model = styleModel(literal);
        return {
            definition: defineEditor({ id: 'test.colors', model, plugins: unitsOf(model) }),
            document: styledDocument(model, [styled(null, plain('one two three'))]),
        };
    });
    const ref = useRef<EditorHandle>(null);
    const changesRef = useRef<ColorChange[]>([]);
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.colorRte = { handle, setSelection, changes: changesRef.current };
        }
    }, []);
    return (
        <RichTextEditor
            aria-label="Notes"
            definition={mounted.definition}
            presentation={presentation}
            defaultValue={{ documentId: 'document-1', revision: null, document: mounted.document }}
            ref={ref}
            onDocumentChange={({ commandId, origin }) => changesRef.current.push({ commandId, origin })}
        />
    );
};
