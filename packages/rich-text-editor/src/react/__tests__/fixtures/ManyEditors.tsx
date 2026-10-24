/* (c) Copyright Frontify Ltd., all rights reserved. */

import { featuresById } from '#/features';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';

import { PERF_FEATURES, perfDocument } from '../../../model/__tests__/fixtures/perf/documents';

const model = compileContentModel(featuresById(PERF_FEATURES), { id: 'test.many', version: 1 });
const definition = defineEditor({ id: 'test.many', model, plugins: unitsOf(model) });

/** `count` editors on one page, each with the `small` fixture, as a page of comments holds. */
export const ManyEditors = ({ count }: { readonly count: number }) => (
    <>
        {Array.from({ length: count }, (_, index) => (
            <RichTextEditor
                key={index}
                aria-label={`Comment ${index}`}
                definition={definition}
                defaultValue={{
                    documentId: `document-${index}`,
                    revision: null,
                    document: perfDocument('small', model),
                }}
            />
        ))}
    </>
);
