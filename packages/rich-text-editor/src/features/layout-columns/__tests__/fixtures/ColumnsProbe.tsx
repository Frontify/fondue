/* (c) Copyright Frontify Ltd., all rights reserved. */

import '#/styles/content.css';
import { columns as layoutColumns, core } from '#/features';
import { defineEditor, defineReactPresentation, RichTextEditor } from '#/index';
import { compileContentModel, type RichTextDocument } from '#/model';
import { RichTextReader } from '#/reader';

const model = compileContentModel([core(), layoutColumns()], { id: 'test.columns', version: 1 });
const definition = defineEditor({ id: 'test.columns', model });
const paragraph = (text: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text }] });

/** `One`, then each further paragraph after a column break: `One`, break, `Two`, break, `Three`, and so on. */
const documentOf = (breaks: number) =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: {
            type: 'doc',
            attrs: { lang: null, dir: 'auto' },
            content: [
                paragraph('One'),
                ...['Two', 'Three', 'Four', 'Five', 'Six', 'Seven']
                    .slice(0, breaks)
                    .flatMap((text) => [{ type: 'column_break' }, paragraph(text)]),
            ],
        },
    }) as unknown as RichTextDocument;

/** The editor, in a region named Editor, and the reader of the same document, in a region named Reader, side by side in width. */
export const ColumnsProbe = ({
    columns,
    columnGap = 'normal',
    breaks,
    width = '100%',
    contentClassName = 'host-columns',
}: {
    readonly columns: number;
    readonly columnGap?: string;
    readonly breaks: number;
    /** The CSS inline size of the box both sit in. */
    readonly width?: string;
    readonly contentClassName?: string;
}) => {
    const document = documentOf(breaks);
    const presentation = defineReactPresentation({ columns, columnGap, contentClassName });
    return (
        <div style={{ inlineSize: width }}>
            <section aria-label="Editor">
                <RichTextEditor
                    aria-label="Notes"
                    definition={definition}
                    presentation={presentation}
                    defaultValue={{ documentId: 'columns-1', revision: null, document }}
                />
            </section>
            <section aria-label="Reader">
                <RichTextReader document={document} model={model} presentation={presentation} />
            </section>
        </div>
    );
};
