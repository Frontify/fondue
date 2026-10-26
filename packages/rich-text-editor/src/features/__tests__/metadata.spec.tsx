/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render, screen } from '@testing-library/react';
import { AllSelection } from 'prosemirror-state';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { defineReactPresentation } from '#/entries/authoring';
import { documentModel } from '#/features';
import { canonicalOf } from '#/features/__tests__/fixtures/generated';
import { unitsOf } from '#/features/__tests__/fixtures/units';
import { resolving } from '#/features/mediaImage/__tests__/fixtures/mount';
import { defineEditor, type EditorHandle, RichTextEditor } from '#/index';
import { type ContentNodeJSON, createEmptyDocument, type RichTextDocument, type RichTextSlice } from '#/model';
import fixture from '#/model/__tests__/fixtures/a11y/metadata.json';
import { runtimeOf } from '#/runtime/runtime';
import { paste } from '#/testing';

const metadata = fixture as unknown as RichTextDocument;
const SLICE_TYPE = 'application/x-frontify-rich-text+json';
const model = documentModel;
const definition = defineEditor({ id: 'test.metadata', model, plugins: unitsOf(model) });
const presentation = defineReactPresentation({ resolveAssetUrl: resolving });

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

/** A stored attribute value as text. */
const show = (value: unknown): string => {
    if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
    }

    return JSON.stringify(value);
};

/** The text of `node`, with nothing between its parts. */
const textOf = (node: ContentNodeJSON): string => node.text ?? (node.content ?? []).map(textOf).join('');

/** The accessibility metadata of the blocks: heading levels, `lang` and `dir`, link text and alternative text. */
const metadataOf = (blocks: readonly ContentNodeJSON[]): string[] =>
    blocks.flatMap((node): string[] => {
        const own: string[] = [];
        if (node.type === 'heading') {
            own.push(`h${show(node.attrs?.level)} ${textOf(node)}`);
        }

        if (node.attrs?.lang !== undefined && node.attrs.lang !== null) {
            own.push(`${node.type} lang ${show(node.attrs.lang)}`);
        }

        if (node.type === 'asset_image') {
            const intent = show(node.attrs?.altIntent);
            own.push(`image ${intent} "${show(node.attrs?.altText)}"`);
        }

        const text = node.text ?? '';
        for (const mark of node.marks ?? []) {
            if (mark.type === 'link') {
                own.push(`link ${show(mark.attrs?.href)} ${text}`);
            }

            if (mark.type === 'language') {
                const lang = show(mark.attrs?.lang);
                own.push(`language ${lang} ${show(mark.attrs?.dir)} ${text}`);
            }
        }

        return [...own, ...metadataOf(node.content ?? [])];
    });

const EXPECTED = [
    'h2 Brand guidelines',
    'h3 Colours',
    'paragraph lang de',
    'link https://frontify.com/guide colour guide',
    'language fr ltr bonjour',
    'language he rtl שלום',
    'image meaningful "Five swatches from deep blue to sand"',
    'image decorative ""',
];

/** Mounts an editor of the Document model holding `document`, with its view. */
const mount = (document: RichTextDocument) => {
    const ref = createRef<EditorHandle<object>>();
    const rendered = render(
        <RichTextEditor
            aria-label="Notes"
            definition={definition}
            presentation={presentation}
            defaultValue={{ documentId: 'document-1', revision: null, document }}
            ref={ref}
        />,
    );
    act(() => {
        vi.advanceTimersToNextFrame();
    });
    const handle = ref.current;
    const view = handle === null ? undefined : runtimeOf(handle)?.view;
    if (handle === null || view === undefined) {
        throw new Error('The editor did not mount.');
    }

    const selectAll = () =>
        act(() => {
            view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)));
        });

    return { handle, view, selectAll, unmount: rendered.unmount };
};

/** Copies the whole document of an editor holding the fixture, and returns the flavors the copy wrote. */
const copiedFixture = () => {
    const source = mount(metadata);
    source.selectAll();
    const clipboardData = new DataTransfer();
    act(() => {
        source.view.dom.dispatchEvent(new ClipboardEvent('copy', { clipboardData, bubbles: true, cancelable: true }));
    });
    source.unmount();

    return clipboardData;
};

/** Pastes `data` over the whole of an empty editor and returns the blocks it then holds, and what it announced. */
const pasted = (input: Parameters<typeof paste>[1]) => {
    const target = mount(createEmptyDocument(model));
    target.selectAll();
    act(() => {
        paste(target.handle, input);
    });
    act(() => {
        vi.runOnlyPendingTimers();
    });
    const blocks = target.handle.getSnapshot().document.content.content ?? [];
    const announced = screen.getByTestId('fondue-rich-text-editor-announcer').textContent;
    target.unmount();

    return { blocks, announced };
};

describe('the accessibility metadata fixture', () => {
    it('holds each kind of metadata', () => {
        expect(metadataOf(metadata.content.content ?? [])).toEqual(EXPECTED);
        expect(metadata.content.attrs).toEqual({ lang: 'en', dir: 'ltr' });
    });

    it('keeps all of it through decode and encode', () => {
        expect(canonicalOf(model, metadata)).toEqual(metadata);
    });

    it('keeps all of it through internal copy and paste', () => {
        const copied = copiedFixture();

        const { blocks } = pasted({ slice: JSON.parse(copied.getData(SLICE_TYPE)) as RichTextSlice });

        expect(metadataOf(blocks)).toEqual(EXPECTED);
    });

    it('keeps all of it through HTML copy and paste, but the images, whose alternative text stays as text and whose drop it announces', () => {
        const copied = copiedFixture();
        const { blocks, announced } = pasted({ html: copied.getData('text/html') });

        expect(metadataOf(blocks)).toEqual(EXPECTED.filter((entry) => !entry.startsWith('image ')));
        expect(blocks.slice(4).map(textOf)).toEqual(['Five swatches from deep blue to sand']);
        expect(announced).toContain('2');
    });

    it('writes all of it in toHTML, the document language and direction included', () => {
        const { html } = createCodecs(model).toHTML(metadata, { resolveAssetUrl: resolving });

        const root = new DOMParser().parseFromString(html, 'text/html').body.firstElementChild;
        const elements = root?.querySelectorAll('*');
        const written = [...(elements ?? [])].flatMap((element): string[] => {
            const name = element.tagName.toLowerCase();
            const lang = element.getAttribute('lang');
            const text = element.textContent ?? '';
            if (/^h[1-6]$/.test(name)) {
                return [`${name} ${text}`];
            }

            if (name === 'p' && lang !== null) {
                return [`paragraph lang ${lang}`];
            }

            if (name === 'span' && lang !== null) {
                const dir = element.getAttribute('dir') ?? '';

                return [`language ${lang} ${dir} ${text}`];
            }

            if (name === 'a') {
                const href = element.getAttribute('href') ?? '';

                return [`link ${href} ${text}`];
            }

            if (name === 'img') {
                return [`image "${element.getAttribute('alt') ?? 'no alt'}"`];
            }

            return [];
        });

        const rootLang = root?.getAttribute('lang');
        const rootDir = root?.getAttribute('dir');
        expect([rootLang, rootDir]).toEqual(['en', 'ltr']);
        expect(written).toEqual([
            ...EXPECTED.filter((entry) => !entry.startsWith('image ')),
            'image "Five swatches from deep blue to sand"',
            'image ""',
        ]);
    });

    it('writes heading levels, link text and alternative text in toMarkdown, and reports the languages, directions and intents it drops', () => {
        const { markdown, losses } = createCodecs(model).toMarkdown(metadata, { resolveAssetUrl: resolving });

        for (const part of [
            '## Brand guidelines',
            '### Colours',
            '[colour guide](https://frontify.com/guide)',
            '![Five swatches from deep blue to sand](',
        ]) {
            expect(markdown).toContain(part);
        }

        expect(losses.map(({ featureId }) => featureId)).toEqual(['core', 'marks.language', 'media.image']);
    });
});
