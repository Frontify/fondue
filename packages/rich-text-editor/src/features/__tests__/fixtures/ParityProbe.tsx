/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';

import { defineReactPresentation } from '#/entries/authoring';
import { RichTextReader } from '#/entries/reader';
import { featuresById } from '#/features';
import { highlightEditor } from '#/features/__tests__/fixtures/outsideEditor';
import { badgeDocument, highlight, highlightDocument } from '#/features/__tests__/fixtures/outsideFeature';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { registry } from '#/features/registry';
import { defineEditor, RichTextEditor } from '#/index';
import { compileContentModel, type RichTextDocument } from '#/model';
import { featureFixtures } from '#/testing/conformance/fixtures';

// The model of the feature contract suite: every shipped feature and the outside fixture feature.
const model = compileContentModel([...featuresById(Object.keys(registry)), highlight()], {
    id: 'feature-contract',
    version: 1,
});
const definition = defineEditor({ id: 'test.parity', model, plugins: unitsOf(model, [highlightEditor]) });
/** Every asset at a same-origin URL, which the CT page CSP allows, answered through `page.route`. */
const resolveAssetUrl = (assetId: string) => `${window.location.origin}/test-assets/${assetId}`;
const presentation = defineReactPresentation({ resolveAssetUrl });

/** The fixtures the contract suite runs through the reader and every codec, by `feature/name`. */
const PARITY_FIXTURES: Readonly<Record<string, RichTextDocument>> = Object.fromEntries<RichTextDocument>([
    ...Object.entries(featureFixtures).flatMap(([feature, fixtures]) =>
        Object.entries(fixtures).map(([name, document]): [string, RichTextDocument] => [
            `${feature}/${name}`,
            document,
        ]),
    ),
    ['fixture.highlight/highlight', highlightDocument],
    ['fixture.highlight/badge', badgeDocument],
]);

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** The names of the fixtures the probe renders. */
        parityNames?: readonly string[];
    }
}
window.parityNames = Object.keys(PARITY_FIXTURES);

/** The fixture `name` in the editor, named Editor, and in the reader, in a region named Reader. */
export const ParityProbe = ({ name }: { name: string }) => {
    const document = { ...PARITY_FIXTURES[name], model: model.ref } as RichTextDocument;

    return (
        <ThemeProvider key={name}>
            <RichTextEditor
                aria-label="Editor"
                definition={definition}
                presentation={presentation}
                defaultValue={{ documentId: 'document-1', revision: null, document }}
            />
            <section aria-label="Reader">
                <RichTextReader document={document} model={model} presentation={{ resolveAssetUrl } as never} />
            </section>
        </ThemeProvider>
    );
};
