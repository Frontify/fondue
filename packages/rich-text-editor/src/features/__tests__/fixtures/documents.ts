/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonObject, type JsonValue } from '#/model';

/** Stored documents of the vocabulary stand-ins in canonical form: every declared attribute written. */
export type Json = JsonValue;
type Node = { readonly [key: string]: JsonValue };

export const VOCABULARY_ID = 'fixture.vocabulary';

export const envelope = (content: JsonValue, capabilities: readonly string[] = ['core'], version = 1): Node => ({
    format: 'frontify.rich-text',
    formatVersion: 1,
    model: { id: VOCABULARY_ID, version },
    requiredCapabilities: [...capabilities].sort().map((id) => ({ id, version: 1 })),
    content,
});

const withChildren = (node: Node, children: readonly JsonValue[]): Node =>
    children.length === 0 ? node : { ...node, content: [...children] };

export const doc = (...children: readonly JsonValue[]): Node =>
    withChildren({ type: 'doc', attrs: { lang: null, dir: 'auto' } }, children);

export const paragraph = (...children: readonly JsonValue[]): Node =>
    withChildren({ type: 'paragraph', attrs: { lang: null, styleId: null, align: null, indent: 0 } }, children);

export const text = (value: string, ...marks: readonly JsonValue[]): Node =>
    marks.length === 0 ? { type: 'text', text: value } : { type: 'text', text: value, marks: [...marks] };

export const mark = (type: string, attrs?: JsonObject): Node => (attrs === undefined ? { type } : { type, attrs });

export const link = (href: string): Node => mark('link', { href, openInNewWindow: false, styleId: null });

export const node = (type: string, attrs?: JsonObject, ...children: readonly JsonValue[]): Node =>
    withChildren(attrs === undefined ? { type } : { type, attrs }, children);

export const heading = (nodeId: string, ...children: readonly JsonValue[]): Node =>
    node('heading', { nodeId, level: 2, lang: null, styleId: null, align: null, indent: 0 }, ...children);

export const blockquote = (...children: readonly JsonValue[]): Node =>
    node('blockquote', { styleId: null }, ...children);

export const bulletList = (...items: readonly JsonValue[]): Node => node('bullet_list', { marker: null }, ...items);

export const listItem = (...children: readonly JsonValue[]): Node => node('list_item', undefined, ...children);

export const taskList = (...items: readonly JsonValue[]): Node => node('task_list', undefined, ...items);

export const taskItem = (nodeId: string, ...children: readonly JsonValue[]): Node =>
    node('task_item', { nodeId, checked: false }, ...children);

export const cell = (attrs: JsonObject = {}, ...children: readonly JsonValue[]): Node =>
    node('table_cell', { colspan: 1, rowspan: 1, colwidth: null, ...attrs }, ...children);

export const row = (...cells: readonly JsonValue[]): Node => node('table_row', undefined, ...cells);

export const table = (nodeId: string, ...rows: readonly JsonValue[]): Node => node('table', { nodeId }, ...rows);

export const mention = (nodeId: string, extra: JsonObject = {}): Node =>
    node('mention', { nodeId, resourceType: 'user', resourceId: 'u-1', labelSnapshot: 'Ada', ...extra });

export const rule = (): Node => node('horizontal_rule');

export const codeBlock = (...children: readonly JsonValue[]): Node =>
    node('code_block', { languageId: null }, ...children);
