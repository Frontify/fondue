/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue-components';
import { useEffect, useRef, useState } from 'react';

import { defineReactPresentation } from '#/entries/authoring';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { compileContentModel, type RichTextLocale } from '#/model';
import { core, emoji } from '#/plugins';
import { pluginsFor } from '#/plugins/__tests__/fixtures/pluginsFor';

const model = compileContentModel([core(), emoji()], { id: 'test.suggestions-ct', version: 1 });
const definition = defineEditor({ id: 'test.suggestions-ct', model, plugins: pluginsFor(model) });
const withToolbar = defineReactPresentation({ toolbar: [['emoji.picker.open']] });
const withoutToolbar = defineReactPresentation({ toolbar: [] });

/** The strings the specs name the chrome by, in the editor locale `lang`. */
const localeOf = (lang: string): RichTextLocale => ({
    lang,
    translationStrings: {
        RichTextEditor_emoji: 'Emoji',
        RichTextEditor_emojiSearch: 'Search emoji',
        RichTextEditor_emojiNoResults: 'No emoji found',
        RichTextEditor_emojiLoading: 'Loading emoji…',
        RichTextEditor_emojiFailed: 'Emoji could not be loaded.',
        RichTextEditor_suggestions: 'Suggestions',
    },
});

declare global {
    // oxlint-disable-next-line typescript/consistent-type-definitions -- only an interface merges into the global `Window`.
    interface Window {
        /** The suggestion probe's handle. */
        suggestionRte?: { handle: EditorHandle };
    }
}

const paragraphOf = (value: string) => ({
    type: 'paragraph' as const,
    attrs: { lang: null },
    content: [{ type: 'text' as const, text: value }],
});

const documentOf = (text: string, extraLines: number) => {
    const content = [paragraphOf(text)];
    for (let line = 1; line <= extraLines; line += 1) {
        content.push(paragraphOf(`Line ${line}`));
    }

    return {
        documentId: 'document-1',
        revision: null,
        document: {
            format: 'frontify.rich-text' as const,
            formatVersion: 1 as const,
            model: model.ref,
            requiredCapabilities: model.capabilities,
            content: {
                type: 'doc',
                attrs: { lang: null, dir: 'auto' as const },
                content,
            },
        },
    };
};

/** Mounts the emoji feature between two focusable buttons, with its toolbar button when `toolbar` is set. */
export const SuggestionProbe = ({
    lang = 'en-US',
    toolbar = false,
    text = 'Hi',
    scrollHeight,
}: {
    lang?: string;
    toolbar?: boolean;
    text?: string;
    /** Wraps the editor in a scrolling box of this height, with lines below the first paragraph. */
    scrollHeight?: number;
}) => {
    const ref = useRef<EditorHandle>(null);
    const [locale] = useState(() => localeOf(lang));
    useEffect(() => {
        const handle = ref.current;
        if (handle !== null) {
            window.suggestionRte = { handle };
        }
    }, []);
    let presentation = withoutToolbar;
    if (toolbar) {
        presentation = withToolbar;
    }

    // Enough lines that a short scroller can move the first paragraph fully out of view.
    let extraLines = 0;
    if (scrollHeight !== undefined) {
        extraLines = 40;
    }

    let editor = (
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            locale={locale}
            presentation={presentation}
            defaultValue={documentOf(text, extraLines)}
            ref={ref}
        />
    );
    if (scrollHeight !== undefined) {
        editor = (
            // Scroll anchoring would keep the first line in view when text above it changes.
            <div data-scroller="" style={{ blockSize: scrollHeight, overflowY: 'auto', overflowAnchor: 'none' }}>
                {editor}
            </div>
        );
    }

    return (
        <ThemeProvider>
            {/* WebKit puts a button in the Tab order only with an explicit `tabIndex`. */}
            <button type="button" tabIndex={0}>
                Before
            </button>
            {editor}
            <button type="button" tabIndex={0}>
                After
            </button>
        </ThemeProvider>
    );
};
