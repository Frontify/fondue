/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, type ReactElement } from 'react';

import { core } from '#/features/core/feature';
import {
    compileContentModel,
    defineFeature,
    type ContentModel,
    type Feature,
    type HtmlSpec,
    type MarkDeclaration,
    type NodeDeclaration,
} from '#/model';
import { defineReaderFeature, type ReaderNodeProps } from '#/reader/define';

/**
 * The vocabulary stand-ins of `src/features/__tests__/fixtures/vocabulary.ts` with the semantic `html` specs and the format
 * support the shipped features will carry, under the same feature IDs, so every document of
 * `src/model/__tests__/fixtures/model/valid` renders as the semantic elements the reader uses. Test-only; never in the
 * registry or a profile.
 */
const requires = [{ id: 'core', version: 1 }];
const nodeId = { type: 'string', required: true } as const;
const lang = { type: 'language', nullable: true, default: null } as const;
const styleId = { type: 'id', nullable: true, default: null } as const;
const block = (content?: string) => ({
    group: 'block' as const,
    ...(content === undefined ? {} : { content }),
});
const mark = (html: HtmlSpec, rank?: number): Pick<MarkDeclaration, 'html' | 'parse' | 'rank'> => ({
    html,
    parse: [],
    ...(rank === undefined ? {} : { rank }),
});
const color = (tag: string): MarkDeclaration => ({
    attrs: { tokenId: styleId, value: { type: 'color', nullable: true, default: null } },
    exactlyOne: ['tokenId', 'value'],
    html: [tag, { 'data-rte-color': { attr: 'tokenId' } }, 0],
    parse: [],
    rank: -1,
});
const span = { type: 'integer', min: 1, max: 50, default: 1 } as const;
const cell = (tag: 'td' | 'th'): NodeDeclaration => ({
    content: 'block+',
    attrs: {
        colspan: span,
        rowspan: span,
        colwidth: { type: 'list', items: { type: 'integer', min: 1 }, nullable: true, default: null },
    },
    html: [tag, { colspan: { attr: 'colspan' }, rowspan: { attr: 'rowspan' } }, 0],
    parse: [],
});

const styles = defineFeature({
    id: 'fixture.styles',
    version: 1,
    requires,
    formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
    attributes: { styleId: { on: ['paragraph', 'heading', 'blockquote'], value: styleId } },
});
const align = defineFeature({
    id: 'fixture.align',
    version: 1,
    requires,
    formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
    attributes: {
        align: {
            on: ['paragraph', 'heading'],
            value: { type: 'enum', values: ['left', 'center', 'right', 'justify'], nullable: true, default: null },
        },
    },
});
const indent = defineFeature({
    id: 'fixture.indent',
    version: 1,
    requires,
    formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
    attributes: { indent: { on: ['paragraph', 'heading'], value: { type: 'integer', min: 0, max: 6, default: 0 } } },
});
const blocks = defineFeature({
    id: 'fixture.blocks',
    version: 1,
    requires,
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
    nodes: {
        heading: {
            ...block('inline*'),
            attrs: { nodeId, level: { type: 'integer', min: 1, max: 6, required: true }, lang },
            html: [
                { attr: 'level', tags: { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } },
                { lang: { attr: 'lang' } },
                0,
            ],
            parse: [],
        },
        blockquote: { ...block('block+'), attrs: {}, html: ['blockquote', 0], parse: [] },
        code_block: {
            ...block('text*'),
            marks: [],
            whitespace: 'pre',
            attrs: { languageId: styleId },
            html: ['pre', ['code', 0]],
            parse: [],
        },
        horizontal_rule: { ...block(), attrs: {}, html: ['hr'], parse: [] },
        column_break: { group: 'section', attrs: {}, html: ['div', { 'data-rte-column-break': '' }], parse: [] },
        bold_only: { ...block('inline*'), marks: ['bold'], attrs: {}, html: ['p', 0], parse: [] },
        link_only: { ...block('inline*'), marks: ['link'], attrs: {}, html: ['p', 0], parse: [] },
    },
});
const lists = defineFeature({
    id: 'fixture.lists',
    version: 1,
    requires,
    formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
    nodes: {
        bullet_list: {
            ...block('list_item+'),
            attrs: { marker: { type: 'enum', values: ['disc', 'circle', 'square'], nullable: true, default: null } },
            html: ['ul', 0],
            parse: [],
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
            html: ['ol', { start: { attr: 'start' } }, 0],
            parse: [],
        },
        list_item: { content: 'paragraph block*', attrs: {}, html: ['li', 0], parse: [] },
        task_list: { ...block('task_item+'), attrs: {}, html: ['ul', 0], parse: [] },
        task_item: {
            content: 'paragraph block*',
            attrs: { nodeId, checked: { type: 'boolean', default: false } },
            html: ['li', 0],
            parse: [],
        },
    },
});
const tables = defineFeature({
    id: 'fixture.tables',
    version: 1,
    requires,
    formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
    nodes: {
        table: { ...block('table_row+'), attrs: { nodeId }, html: ['table', 0], parse: [] },
        table_row: { content: '(table_cell | table_header)+', attrs: {}, html: ['tr', 0], parse: [] },
        table_cell: cell('td'),
        table_header: {
            ...cell('th'),
            attrs: {
                ...cell('th').attrs,
                scope: { type: 'enum', values: ['col', 'row', 'colgroup', 'rowgroup'], nullable: true, default: null },
            },
            html: ['th', { colspan: { attr: 'colspan' }, rowspan: { attr: 'rowspan' }, scope: { attr: 'scope' } }, 0],
        },
    },
});
const media = defineFeature({
    id: 'fixture.media',
    version: 1,
    requires,
    formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
    nodes: {
        figure: {
            ...block('asset_image'),
            attrs: { nodeId, align: { type: 'enum', values: ['left', 'center', 'right'], default: 'center' } },
            html: ['figure', 0],
            parse: [],
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
            html: ['img', { alt: { attr: 'altText' } }],
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
            html: ['div', { 'data-rte-provider': { attr: 'provider' } }],
            parse: [],
        },
    },
});
const mention = defineFeature({
    id: 'fixture.mention',
    version: 1,
    requires,
    formats: { html: 'lossy', text: 'lossless', markdown: 'lossy' },
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
            html: ['span', { 'data-rte-mention': { attr: 'resourceId' } }],
            parse: [],
        },
    },
});
const marks = defineFeature({
    id: 'fixture.marks',
    version: 1,
    requires,
    formats: { html: 'lossless', text: 'lossy', markdown: 'lossy' },
    marks: {
        bold: { attrs: {}, ...mark(['strong', 0]) },
        italic: { attrs: {}, ...mark(['em', 0]) },
        underline: { attrs: {}, ...mark(['u', 0]) },
        strike: { attrs: {}, ...mark(['s', 0]) },
        code: { attrs: {}, ...mark(['code', 0]) },
        subscript: { attrs: {}, excludes: ['superscript'], ...mark(['sub', 0]) },
        superscript: { attrs: {}, excludes: ['subscript'], ...mark(['sup', 0]) },
        language: {
            attrs: {
                lang: { type: 'language', required: true },
                dir: { type: 'enum', values: ['ltr', 'rtl', 'auto'], nullable: true, default: null },
            },
            ...mark(['span', { lang: { attr: 'lang' }, dir: { attr: 'dir' } }, 0]),
        },
    },
});
const link = defineFeature({
    id: 'fixture.link',
    version: 1,
    requires,
    formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
    marks: {
        link: {
            attrs: {
                href: { type: 'url', required: true },
                openInNewWindow: { type: 'boolean', default: false },
                styleId,
            },
            ...mark(['a', { href: { attr: 'href' } }, 0], -2),
        },
    },
});
const colors = defineFeature({
    id: 'fixture.colors',
    version: 1,
    requires,
    formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
    marks: { font_color: color('span'), highlight: color('mark') },
});

/** A mention as `@label`: the reader override of the mentions feature, from the snapshot alone. */
const Mention = ({ attrs }: ReaderNodeProps): ReactElement => {
    const label = attrs.labelSnapshot;
    return <span data-rte-mention="">@{typeof label === 'string' ? label : ''}</span>;
};

/** Splits the leading header rows of a table into a `thead`: a table is one node, so only an override can. */
const Table = ({ children }: ReaderNodeProps): ReactElement => {
    const rows = Children.toArray((children as ReactElement<{ children: ReactElement[] }>).props.children);
    const isHeader = (row: unknown) =>
        Children.toArray((row as ReactElement<{ children: ReactElement | ReactElement[] }>).props.children).every(
            (cell) => (cell as ReactElement).type === 'th',
        );
    const head = rows.findIndex((row) => !isHeader(row));
    const split = head === -1 ? rows.length : head;
    return (
        <table>
            {split > 0 && <thead>{rows.slice(0, split)}</thead>}
            <tbody>{rows.slice(split)}</tbody>
        </table>
    );
};

/** Every stand-in on top of `core`, in an order that keeps marks in the Vocabulary table's declared order. */
export const semanticFeatures = (): readonly Feature[] => [
    core(),
    styles(),
    align(),
    indent(),
    blocks(),
    lists(),
    defineReaderFeature(tables(), { table: Table }),
    media(),
    defineReaderFeature(mention(), { mention: Mention }),
    marks(),
    link(),
    colors(),
];

export const semanticModel = (): ContentModel =>
    compileContentModel(semanticFeatures(), { id: 'fixture.vocabulary', version: 1 });
