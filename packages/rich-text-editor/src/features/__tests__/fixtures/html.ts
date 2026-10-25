/* (c) Copyright Frontify Ltd., all rights reserved. */

import { align } from '#/features/blocksAlign/feature';
import { heading } from '#/features/blocksHeading/feature';
import { quote } from '#/features/blocksQuote/feature';
import { core } from '#/features/core/feature';
import { bold } from '#/features/marksBold/feature';
import { code } from '#/features/marksCode/feature';
import { fontColor } from '#/features/marksFontColor/feature';
import { italic } from '#/features/marksItalic/feature';
import { language } from '#/features/marksLanguage/feature';
import { strike } from '#/features/marksStrike/feature';
import { subscript } from '#/features/marksSubscript/feature';
import { superscript } from '#/features/marksSuperscript/feature';
import { underline } from '#/features/marksUnderline/feature';
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

/** The shipped text features and `marks.font-color` with `literalColors` on, with the stand-ins above. */
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
        align(),
        htmlLists(),
        language(),
        fontColor({ literalColors: true }),
        htmlLink(),
    ] as const;

export const htmlModel = () => compileContentModel(htmlFeatures(), { id: 'fixture.html', version: 1 });
