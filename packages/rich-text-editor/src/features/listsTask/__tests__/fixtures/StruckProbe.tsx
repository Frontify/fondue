/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { defineReactPresentation } from '#/entries/authoring';
import { RichTextReader } from '#/entries/reader';
import {
    COLOR_TOKENS,
    linked,
    marked,
    plain,
    STYLE_MAP,
    styled,
    styledDocument,
    styleFeatures,
} from '#/features/__tests__/fixtures/styles';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { taskList } from '#/features/listsTask/feature';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel, type ContentNodeJSON } from '#/model';

const model = compileContentModel([...styleFeatures(true), taskList()], { id: 'test.struck-tasks', version: 1 });
const definition = defineEditor({ id: 'test.struck-tasks', model, plugins: unitsOf(model) });

const task = (nodeId: string, checked: boolean, ...content: readonly ContentNodeJSON[]): ContentNodeJSON =>
    ({ type: 'task_item', attrs: { nodeId, checked }, content: [...content] }) as ContentNodeJSON;
const tasks = (...items: readonly ContentNodeJSON[]): ContentNodeJSON =>
    ({ type: 'task_list', content: [...items] }) as ContentNodeJSON;

/**
 * A checked task whose text holds a plain run, a literal red run and a link in the white Button brand style, with an
 * unchecked task nested in it, in the editor and the reader with `strikeCheckedTasks` set.
 */
export const StruckProbe = () => {
    const [mounted] = useState(() => {
        const document = styledDocument(model, [
            tasks(
                task(
                    'task-done',
                    true,
                    styled(
                        null,
                        plain('Plain '),
                        marked('Red', 'font_color', { tokenId: null, value: '#ff0000' }),
                        plain(' '),
                        linked('Button', 'brand.button'),
                    ),
                    tasks(task('task-open', false, styled(null, plain('Nested')))),
                ),
            ),
        ]);
        const presentation = defineReactPresentation({
            styles: STYLE_MAP,
            colorTokens: COLOR_TOKENS,
            strikeCheckedTasks: true,
        });

        return { document, presentation };
    });

    return (
        <>
            <RichTextEditor
                aria-label="Notes"
                definition={definition}
                presentation={mounted.presentation}
                defaultValue={{ documentId: 'document-1', revision: null, document: mounted.document }}
            />
            <section aria-label="Reader">
                <RichTextReader document={mounted.document} model={model} presentation={mounted.presentation} />
            </section>
        </>
    );
};
