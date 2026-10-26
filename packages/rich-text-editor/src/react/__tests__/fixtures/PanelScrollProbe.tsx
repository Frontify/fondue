/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';

import { defineEditorPart } from '#/bridge/pluginApi/plugin';
import { defineReactPresentation } from '#/entries/authoring';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, defineFeature } from '#/model';
import { bold, core, heading } from '#/plugins';
import { openFind } from '#/plugins/__tests__/fixtures/panels';
import { unitsOf } from '#/plugins/__tests__/fixtures/units';

const TallPanel = () => (
    <div role="search" aria-label="Find">
        {Array.from({ length: 40 }, (_, index) => (
            <p key={index}>{index === 0 ? <button type="button">First</button> : `Row ${index}`}</p>
        ))}
    </div>
);

const tall = defineFeature({ id: 'fixture.find-tall', version: 1, requires: [{ id: 'core', version: 1 }] });
const tallPart = defineEditorPart(tall, {
    needs: ['panels'],
    commands: {
        'find.open': {
            readOnly: true,
            run: (api) => {
                api.panels.open('find');

                return true;
            },
        },
    },
    panels: [{ control: 'find', component: TallPanel }],
});

const model = compileContentModel([core(), heading(), bold(), tall()], { id: 'test.panel-scroll', version: 1 });
const definition = defineEditor({ id: 'test.panel-scroll', model, plugins: unitsOf(model, [tallPart]) });

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        panelScroll?: { open: () => void };
    }
}

/** An editor whose open panel holds more rows than the panel slot's height shows. */
export const PanelScrollProbe = () => {
    const ref = useRef<EditorHandle>(null);
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.panelScroll = { open: () => openFind(handle) };
        }
    });

    return (
        <RichTextEditor
            ref={ref}
            aria-label="Notes"
            definition={definition}
            defaultValue={{
                documentId: 'document-1',
                revision: null,
                document: {
                    format: 'frontify.rich-text',
                    formatVersion: 1,
                    model: model.ref,
                    requiredCapabilities: model.capabilities,
                    content: {
                        type: 'doc',
                        attrs: { lang: null, dir: 'auto' },
                        content: [
                            { type: 'paragraph', attrs: { lang: null }, content: [{ type: 'text', text: 'Hello' }] },
                        ],
                    },
                },
            }}
            presentation={defineReactPresentation({ toolbar: [['mark.bold.toggle']] })}
        />
    );
};
