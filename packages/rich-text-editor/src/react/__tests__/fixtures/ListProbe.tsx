/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { useEffect, useRef, useState } from 'react';

import { bold, core, inputRules } from '#/features';
import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { orderedList } from '#/features/lists-ordered/feature';
import { taskList } from '#/features/lists-task/feature';
import {
    defineEditor,
    defineReactPresentation,
    type EditorHandle,
    type ListLevels,
    RichTextEditor,
    type RichTextEditorProps,
} from '#/index';
import { compileContentModel, type RichTextDocument } from '#/model';
import { RichTextReader } from '#/reader';
import { setSelection } from '#/testing';

const model = compileContentModel([core(), bold(), listItem(), bulletList(), orderedList(), taskList(), inputRules()], {
    id: 'test.list-ct',
    version: 1,
});
const definition = defineEditor({ id: 'test.list-ct', model });
const presentation = defineReactPresentation({
    toolbar: [
        ['mark.bold.toggle'],
        ['list.bullet.toggle', { command: 'list.ordered.toggle', payload: { start: 1 } }, 'list.task.toggle'],
    ],
});

/** One change as the probe records it: where it came from and the document content after it. */
export interface ListChange {
    readonly origin: string;
    readonly commandId: string | null;
    readonly content: unknown;
}

declare global {
    interface Window {
        /** The list probe's handle, the selection helper and each change. */
        listRte?: {
            readonly handle: EditorHandle;
            readonly setSelection: typeof setSelection;
            readonly changes: ListChange[];
        };
    }
}

const documentOf = (blocks: readonly object[]): RichTextDocument =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: [...blocks] },
    }) as unknown as RichTextDocument;

/**
 * Mounts the list features through `RichTextEditor` between two focusable buttons, with the list toolbar, and with
 * `reader` the reader's output of each change below it.
 */
export const ListProbe = ({
    blocks,
    dir = 'ltr',
    reader = false,
    listLevels,
    tabMovesFocus,
    strikeCheckedTasks = false,
}: {
    /** Stored blocks, such as `list-blocks.ts` builds. */
    readonly blocks: readonly object[];
    /** The theme direction. */
    readonly dir?: 'ltr' | 'rtl';
    readonly reader?: boolean;
    readonly listLevels?: ListLevels;
    /** Passed to the editor when set, else the editor keeps its default. */
    readonly tabMovesFocus?: boolean;
    /** Strikethrough and the secondary text colour on a checked task, in the editor and the reader. */
    readonly strikeCheckedTasks?: boolean;
}) => {
    let options: Pick<RichTextEditorProps, 'tabMovesFocus'> = {};
    if (tabMovesFocus !== undefined) {
        options = { tabMovesFocus };
    }
    const [shownPresentation] = useState(() => {
        let next = presentation;
        if (listLevels !== undefined) {
            next = { ...presentation, listLevels };
        }
        if (strikeCheckedTasks) {
            next = { ...next, strikeCheckedTasks: true };
        }
        return next;
    });
    const ref = useRef<EditorHandle>(null);
    const changesRef = useRef<ListChange[]>([]);
    const [shown, setShown] = useState(() => documentOf(blocks));
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.listRte = { handle, setSelection, changes: changesRef.current };
        }
    }, []);
    return (
        <ThemeProvider dir={dir}>
            {/* An explicit tabindex, since WebKit leaves buttons out of the Tab order by default. */}
            <button type="button" tabIndex={0}>
                Before
            </button>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                presentation={shownPresentation}
                defaultValue={{ documentId: 'document-1', revision: null, document: documentOf(blocks) }}
                {...options}
                ref={ref}
                onDocumentChange={({ origin, commandId, readDocument }) => {
                    const document = readDocument();
                    changesRef.current.push({ origin, commandId, content: document.content });
                    setShown(document);
                }}
            />
            <button type="button" tabIndex={0}>
                After
            </button>
            {reader && (
                <section aria-label="Reader">
                    <RichTextReader document={shown} model={model} presentation={shownPresentation} />
                </section>
            )}
        </ThemeProvider>
    );
};
