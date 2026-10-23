/* (c) Copyright Frontify Ltd., all rights reserved. */

import { heading } from '#/features/blocks-heading/feature';
import { quote } from '#/features/blocks-quote/feature';
import { core } from '#/features/core/feature';
import { fontColor } from '#/features/marks-font-color/feature';
import { brandStyles } from '#/features/styles-brand/feature';
import {
    type ColorToken,
    compileContentModel,
    type ContentModel,
    type ContentNodeJSON,
    type PresentationStyle,
    type RichTextDocument,
} from '#/model';

import { fixtureHighlight } from './highlight';

/** The style map the brand style tests share: a heading, a paragraph and two link styles, a default link and a deprecated style. */
export const STYLE_MAP: readonly PresentationStyle[] = [
    {
        id: 'brand.title',
        label: 'Title',
        appliesTo: ['heading'],
        deprecated: false,
        recipe: { fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 700, color: '#1d4ed8' },
    },
    {
        id: 'brand.lead',
        label: 'Lead',
        appliesTo: ['paragraph'],
        deprecated: false,
        recipe: { fontFamily: 'Arial, sans-serif', fontSize: 20, fontWeight: 300, lineHeight: 1.5 },
    },
    {
        id: 'brand.caption',
        label: 'Caption',
        appliesTo: ['paragraph', 'heading'],
        deprecated: false,
        recipe: { fontSize: 12, fontWeight: 600, textTransform: 'uppercase' },
    },
    {
        id: 'brand.legacy',
        label: 'Legacy',
        appliesTo: ['paragraph'],
        deprecated: true,
        recipe: { fontSize: 18 },
    },
    { id: 'link', label: 'Link', appliesTo: ['link'], deprecated: false, recipe: { textDecoration: 'none' } },
    {
        id: 'brand.button',
        label: 'Button',
        appliesTo: ['link'],
        deprecated: false,
        recipe: {
            textDecoration: 'none',
            color: '#ffffff',
            backgroundColor: '#1d4ed8',
            padding: '2px 8px',
            borderRadius: 4,
            fontWeight: 700,
            hover: { backgroundColor: '#1e3a8a' },
        },
    },
];

export const COLOR_TOKENS: readonly ColorToken[] = [
    { id: 'brand.red', label: 'Brand red', value: '#c0392b', usage: ['font_color'] },
    { id: 'brand.blue', label: 'Brand blue', value: '#1d4ed8', usage: ['font_color'] },
    { id: 'brand.sun', label: 'Sun', value: '#fde68a', usage: ['highlight'] },
];

/** Brand styles and colours with their block types and the highlight stand-in. */
export const styleFeatures = (literalColors = false) =>
    [
        core(),
        heading(),
        quote(),
        brandStyles(),
        fontColor({ literalColors }),
        fixtureHighlight({ literalColors }),
    ] as const;

export const styleModel = (literalColors = false): ContentModel<ReturnType<typeof styleFeatures>> =>
    compileContentModel(styleFeatures(literalColors), { id: 'test.styles', version: 1 });

export const styled = (styleId: string | null, ...content: readonly ContentNodeJSON[]): ContentNodeJSON => ({
    type: 'paragraph',
    attrs: { lang: null, styleId },
    content: [...content],
});
export const styledHeading = (
    styleId: string | null,
    level: number,
    ...content: readonly ContentNodeJSON[]
): ContentNodeJSON => ({
    type: 'heading',
    attrs: { nodeId: `heading-${level}`, level, lang: null, styleId },
    content: [...content],
});
export const plain = (text: string): ContentNodeJSON => ({ type: 'text', text });
export const marked = (text: string, type: string, attrs: Readonly<Record<string, unknown>>): ContentNodeJSON =>
    ({ type: 'text', text, marks: [{ type, attrs }] }) as ContentNodeJSON;

/** A stored document of `blocks` in `model`. */
export const styledDocument = (model: ContentModel, blocks: readonly ContentNodeJSON[]): RichTextDocument =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities: model.capabilities,
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as unknown as RichTextDocument;
