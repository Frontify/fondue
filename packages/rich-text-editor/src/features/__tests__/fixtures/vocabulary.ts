/* (c) Copyright Frontify Ltd., all rights reserved. */

import { core } from '#/features/core/feature';
import { compileContentModel, defineFeature } from '#/model';

/**
 * Stand-ins with the node shapes and attributes of the Vocabulary table for the features
 * that later packets ship, so decode runs against the whole vocabulary. Never in the registry or a profile.
 */
const requires = [{ id: 'core', version: 1 }];
const nodeId = { type: 'string', required: true } as const;
const lang = { type: 'language', nullable: true, default: null } as const;
const styleId = { type: 'id', nullable: true, default: null } as const;
const block = (content?: string) => ({
    group: 'block' as const,
    ...(content === undefined ? {} : { content }),
    html: ['div', 0] as const,
    parse: [],
});
const mark = (rank?: number) => ({ html: ['span', 0] as const, parse: [], ...(rank === undefined ? {} : { rank }) });
const color = {
    attrs: { tokenId: styleId, value: { type: 'color', nullable: true, default: null } },
    exactlyOne: ['tokenId', 'value'],
    html: ['span', 0],
    parse: [],
    rank: -1,
} as const;
const span = { type: 'integer', min: 1, max: 50, default: 1 } as const;
const cell = {
    content: 'block+',
    attrs: {
        colspan: span,
        rowspan: span,
        colwidth: { type: 'list', items: { type: 'integer', min: 1 }, nullable: true, default: null },
    },
    html: ['td', 0],
    parse: [],
} as const;

export const vocabularyStyles = defineFeature({
    id: 'fixture.styles',
    version: 1,
    requires,
    attributes: { styleId: { on: ['paragraph', 'heading', 'blockquote'], value: styleId } },
});
export const vocabularyAlign = defineFeature({
    id: 'fixture.align',
    version: 1,
    requires,
    attributes: {
        align: {
            on: ['paragraph', 'heading'],
            value: { type: 'enum', values: ['left', 'center', 'right', 'justify'], nullable: true, default: null },
        },
    },
});
export const vocabularyIndent = defineFeature({
    id: 'fixture.indent',
    version: 1,
    requires,
    attributes: { indent: { on: ['paragraph', 'heading'], value: { type: 'integer', min: 0, max: 6, default: 0 } } },
});
export const vocabularyBlocks = defineFeature({
    id: 'fixture.blocks',
    version: 1,
    requires,
    nodes: {
        heading: {
            ...block('inline*'),
            attrs: { nodeId, level: { type: 'integer', min: 1, max: 6, required: true }, lang },
        },
        blockquote: { ...block('block+'), attrs: {} },
        code_block: {
            ...block('text*'),
            marks: [],
            whitespace: 'pre',
            attrs: { languageId: styleId },
        },
        horizontal_rule: { ...block(), attrs: {} },
        column_break: { group: 'section', attrs: {}, html: ['hr'], parse: [] },
        bold_only: { ...block('inline*'), marks: ['bold'], attrs: {} },
        link_only: { ...block('inline*'), marks: ['link'], attrs: {} },
    },
});
export const vocabularyLists = defineFeature({
    id: 'fixture.lists',
    version: 1,
    requires,
    nodes: {
        bullet_list: {
            ...block('list_item+'),
            attrs: { marker: { type: 'enum', values: ['disc', 'circle', 'square'], nullable: true, default: null } },
        },
        ordered_list: {
            ...block('list_item+'),
            attrs: {
                start: { type: 'integer', min: 0, max: 1_000_000, default: 1 },
                marker: {
                    type: 'enum',
                    values: ['decimal', 'lower-alpha', 'upper-alpha', 'lower-roman', 'upper-roman'],
                    nullable: true,
                    default: null,
                },
            },
        },
        list_item: { content: 'paragraph block*', attrs: {}, html: ['li', 0], parse: [] },
        task_list: { ...block('task_item+'), attrs: {} },
        task_item: {
            content: 'paragraph block*',
            attrs: { nodeId, checked: { type: 'boolean', default: false } },
            html: ['li', 0],
            parse: [],
        },
    },
});
export const vocabularyTables = defineFeature({
    id: 'fixture.tables',
    version: 1,
    requires,
    nodes: {
        table: { ...block('table_row+'), attrs: { nodeId } },
        table_row: { content: '(table_cell | table_header)+', attrs: {}, html: ['tr', 0], parse: [] },
        table_cell: cell,
        table_header: {
            ...cell,
            attrs: {
                ...cell.attrs,
                scope: { type: 'enum', values: ['col', 'row', 'colgroup', 'rowgroup'], nullable: true, default: null },
            },
        },
    },
});
export const vocabularyMedia = defineFeature({
    id: 'fixture.media',
    version: 1,
    requires,
    nodes: {
        figure: {
            ...block('asset_image'),
            attrs: { nodeId, align: { type: 'enum', values: ['left', 'center', 'right'], default: 'center' } },
        },
        asset_image: {
            attrs: {
                nodeId,
                assetId: { type: 'string', nullable: true, required: true },
                labelSnapshot: { type: 'string', required: true },
                altIntent: { type: 'enum', values: ['missing', 'decorative', 'meaningful'], default: 'missing' },
                altText: { type: 'string', default: '' },
                width: { type: 'integer', min: 1, max: 65_535, nullable: true, default: null },
                height: { type: 'integer', min: 1, max: 65_535, nullable: true, default: null },
                displayWidth: { type: 'integer', min: 10, max: 100, nullable: true, default: null },
                mediaType: { type: 'string', nullable: true, default: null },
            },
            html: ['img'],
            parse: [],
        },
        embed: {
            ...block(),
            attrs: {
                nodeId,
                url: { type: 'url', required: true },
                provider: { type: 'id', required: true },
                title: { type: 'string', nullable: true, default: null },
            },
        },
    },
});
export const vocabularyMention = defineFeature({
    id: 'fixture.mention',
    version: 1,
    requires,
    nodes: {
        mention: {
            group: 'inline',
            atom: true,
            marks: [],
            attrs: {
                nodeId,
                resourceType: { type: 'id', required: true },
                resourceId: { type: 'string', required: true },
                labelSnapshot: { type: 'string', required: true },
            },
            html: ['span'],
            parse: [],
        },
    },
});
export const vocabularyMarks = defineFeature({
    id: 'fixture.marks',
    version: 1,
    requires,
    marks: {
        bold: { attrs: {}, ...mark() },
        italic: { attrs: {}, ...mark() },
        underline: { attrs: {}, ...mark() },
        strike: { attrs: {}, ...mark() },
        code: { attrs: {}, ...mark() },
        subscript: { attrs: {}, excludes: ['superscript'], ...mark() },
        superscript: { attrs: {}, excludes: ['subscript'], ...mark() },
        language: {
            attrs: {
                lang: { type: 'language', required: true },
                dir: { type: 'enum', values: ['ltr', 'rtl', 'auto'], nullable: true, default: null },
            },
            ...mark(),
        },
    },
});
export const vocabularyLink = defineFeature({
    id: 'fixture.link',
    version: 1,
    requires,
    marks: {
        link: {
            attrs: {
                href: { type: 'url', required: true },
                openInNewWindow: { type: 'boolean', default: false },
                styleId,
            },
            ...mark(-2),
        },
    },
});
export const vocabularyColors = defineFeature({
    id: 'fixture.colors',
    version: 1,
    requires,
    marks: {
        font_color: color,
        highlight: color,
    },
});

/** Every stand-in on top of `core`, in an order that keeps marks in the table's declared order. */
export const vocabularyFeatures = () =>
    [
        core(),
        vocabularyStyles(),
        vocabularyAlign(),
        vocabularyIndent(),
        vocabularyBlocks(),
        vocabularyLists(),
        vocabularyTables(),
        vocabularyMedia(),
        vocabularyMention(),
        vocabularyMarks(),
        vocabularyLink(),
        vocabularyColors(),
    ] as const;

export const vocabularyModel = (version = 1) =>
    compileContentModel(vocabularyFeatures(), { id: 'fixture.vocabulary', version });
