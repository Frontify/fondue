/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

import { defineReactPresentation } from '#/entries/authoring';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { COLOR_TOKENS, plain, styled, styledDocument, styleModel } from '#/plugins/__tests__/fixtures/styles';
import { setSelection } from '#/testing';

const presentation = defineReactPresentation({ colorTokens: COLOR_TOKENS, toolbar: [['mark.color.menu.open']] });

export type ColorChange = {
    commandId: string | null;
    origin: string;
};

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** The colour probe's handle, the selection helper and each change. */
        colorRte?: {
            handle: EditorHandle;
            setSelection: typeof setSelection;
            changes: ColorChange[];
        };
    }
}

export type ColorProbeProps = { literal?: boolean };

/**
 * Mounts `marks.font-color` and the highlight stand-in through `RichTextEditor` with the colour menu in the toolbar,
 * each with `literalColors` when `literal` is set, over one paragraph.
 */
export const ColorProbe = ({ literal = false }: ColorProbeProps) => {
    const [mounted] = useState(() => {
        const model = styleModel(literal);

        return {
            definition: defineEditor({ id: 'test.colors', model, plugins: pluginsFor(model) }),
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
