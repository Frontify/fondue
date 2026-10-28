/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';

import { defineReactPresentation } from '#/entries/authoring';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel } from '#/model';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { core } from '#/plugins/Core/feature';

import { FIXTURE_PLUGINS } from '../plugins';

import { spotlight, spotlightDocument } from './feature';

const model = compileContentModel([core(), spotlight()], { id: 'fixture.spotlight', version: 1 });
const definition = defineEditor({ id: 'fixture.spotlight', model, plugins: pluginsFor(model, FIXTURE_PLUGINS) });

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        spotlightRte?: {
            document: () => string;
        };
    }
}

/** An editor with only `core` and the fixture plugin, whose control and panel sit in the toolbar. */
export const SpotlightProbe = () => {
    const ref = useRef<EditorHandle>(null);
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.spotlightRte = { document: () => JSON.stringify(handle.getSnapshot().document.content) };
        }
    });

    return (
        <RichTextEditor
            ref={ref}
            aria-label="Notes"
            definition={definition}
            presentation={defineReactPresentation({
                toolbar: [['fixture.spotlight.toggle', 'fixture.spotlight.panel', 'fixture.spotlight.note']],
            })}
            defaultValue={{ documentId: 'document-1', revision: null, document: spotlightDocument }}
        />
    );
};
