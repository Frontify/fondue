/* (c) Copyright Frontify Ltd., all rights reserved. */

import { heading } from '#/features/blocks-heading/feature';
import { quote } from '#/features/blocks-quote/feature';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marks-bold/feature';
import { code } from '#/features/marks-code/feature';
import { italic } from '#/features/marks-italic/feature';
import { strike } from '#/features/marks-strike/feature';
import { subscript } from '#/features/marks-subscript/feature';
import { superscript } from '#/features/marks-superscript/feature';
import { underline } from '#/features/marks-underline/feature';
import { compileContentModel, defineFeature } from '#/model';

/**
 * Stand-ins with the parse rules of features that are not shipped yet, so pasted HTML and `fromHTML` run against
 * them. Never in the registry or a profile.
 */
const requires = [{ id: 'core', version: 1 }];

/** Stands in for `links`: `href` after `checkHref`, and `target="_blank"` as `openInNewWindow`. */
export const htmlLink = defineFeature({
    id: 'fixture.html-link',
    version: 1,
    requires,
    marks: {
        link: {
            attrs: {
                href: { type: 'url', required: true },
                openInNewWindow: { type: 'boolean', default: false },
                styleId: { type: 'id', nullable: true, default: null },
            },
            html: ['a', { href: { attr: 'href' } }, 0],
            parse: [
                {
                    tag: 'a[href]',
                    attrs: { href: { from: 'href' }, openInNewWindow: { from: 'target', equals: '_blank' } },
                },
            ],
            rank: -2,
            inclusive: false,
        },
    },
});

/** Stands in for `lists.bullet`, `lists.ordered` and `lists.item`, with `start` on `ol`. */
export const htmlLists = defineFeature({
    id: 'fixture.html-lists',
    version: 1,
    requires,
    nodes: {
        bullet_list: { group: 'block', content: 'list_item+', attrs: {}, html: ['ul', 0], parse: [{ tag: 'ul' }] },
        ordered_list: {
            group: 'block',
            content: 'list_item+',
            attrs: { start: { type: 'integer', min: 0, max: 1_000_000, default: 1 } },
            html: ['ol', { start: { attr: 'start' } }, 0],
            parse: [{ tag: 'ol', attrs: { start: { from: 'start' } } }],
        },
        list_item: { content: 'paragraph block*', attrs: {}, html: ['li', 0], parse: [{ tag: 'li' }] },
    },
});

/** Stands in for `marks.language`: `lang` and `dir` on a span. */
export const htmlLanguage = defineFeature({
    id: 'fixture.html-language',
    version: 1,
    requires,
    marks: {
        language: {
            attrs: {
                lang: { type: 'language', required: true },
                dir: { type: 'enum', values: ['ltr', 'rtl', 'auto'], nullable: true, default: null },
            },
            html: ['span', { lang: { attr: 'lang' }, dir: { attr: 'dir' } }, 0],
            parse: [{ tag: 'span[lang]', attrs: { lang: { from: 'lang' }, dir: { from: 'dir' } } }],
        },
    },
});

/** Stands in for `marks.font-color` with `literalColors` on: a literal CSS `color`. */
export const htmlColor = defineFeature({
    id: 'fixture.html-color',
    version: 1,
    requires,
    marks: {
        font_color: {
            attrs: { value: { type: 'color', required: true } },
            html: ['span', { 'data-color': { attr: 'value' } }, 0],
            parse: [{ tag: 'span', attrs: { value: { fromStyle: 'color' } } }],
            rank: -1,
        },
    },
});

/** Stands in for `blocks.align` with `justify`: a shared `align` read from `text-align`. */
export const htmlAlign = defineFeature({
    id: 'fixture.html-align',
    version: 1,
    requires: [...requires, { id: 'blocks.heading', version: 1 }],
    attributes: {
        align: {
            on: ['paragraph', 'heading'],
            value: { type: 'enum', values: ['left', 'center', 'right', 'justify'], nullable: true, default: null },
            html: { style: 'text-align' },
            parse: { style: 'text-align' },
        },
    },
});

/** The shipped text features with the stand-ins above. */
export const htmlFeatures = () =>
    [
        core(),
        heading(),
        quote(),
        bold(),
        italic(),
        underline(),
        strike(),
        code(),
        subscript(),
        superscript(),
        htmlAlign(),
        htmlLists(),
        htmlLanguage(),
        htmlColor(),
        htmlLink(),
    ] as const;

export const htmlModel = () => compileContentModel(htmlFeatures(), { id: 'fixture.html', version: 1 });
