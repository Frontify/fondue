/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

import { defineReactPresentation } from '#/entries/authoring';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type RichTextDocument } from '#/model';
import { bold, core } from '#/plugins';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';
import { language } from '#/plugins/Language/feature';
import { setSelection } from '#/testing';

/** More languages than the dialog shows at once, with the stored passage's last. */
export const LANGUAGES = (
    'af ar bg bn ca cs da de el en es et fa fi fr he hi hr hu id it ja ko lt lv nl no pl pt ro ru sk sl sr sv th tr ' +
    'uk vi zh'
).split(' ');

const model = compileContentModel([core(), bold(), language({ languages: LANGUAGES })], {
    id: 'test.language-ct',
    version: 1,
});
const definition = defineEditor({ id: 'test.language-ct', model, plugins: pluginsFor(model) });

const document = {
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: model.ref,
    requiredCapabilities: model.capabilities,
    content: {
        type: 'doc',
        attrs: { lang: null, dir: 'auto' },
        content: [
            {
                type: 'paragraph',
                attrs: { lang: null },
                content: [
                    { type: 'text', text: 'Hello ' },
                    { type: 'text', text: '你好', marks: [{ type: 'language', attrs: { lang: 'zh', dir: null } }] },
                ],
            },
        ],
    },
} as unknown as RichTextDocument;

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** The language probe's handle and the selection helper. */
        languageRte?: { handle: EditorHandle; setSelection: typeof setSelection };
    }
}

export type LanguageProbeProps = { inToolbar?: boolean };

/**
 * Mounts `marks.language` with a long `languages` option over a Chinese passage, with Language on the toolbar when
 * `inToolbar` is set and otherwise only in More.
 */
export const LanguageProbe = ({ inToolbar = false }: LanguageProbeProps) => {
    const [presentation] = useState(() => {
        if (inToolbar) {
            return defineReactPresentation({ toolbar: [['mark.bold.toggle', 'mark.language.edit']] });
        }

        return defineReactPresentation({ toolbar: [['mark.bold.toggle']] });
    });
    const ref = useRef<EditorHandle>(null);
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.languageRte = { handle, setSelection };
        }
    }, []);

    return (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            presentation={presentation}
            defaultValue={{ documentId: 'document-1', revision: null, document }}
            ref={ref}
        />
    );
};
