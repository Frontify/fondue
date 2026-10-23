/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { buildSchema } from '#/definition/schema';
import { featuresById } from '#/features';
import { storedIn } from '#/features/__tests__/fixtures/documents';
import { registry } from '#/features/registry';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import { decodeToTree } from '#/model/decode';
import { PROFILE_MODELS } from '#/react/examples/records';

const ADDRESSED = ['heading', 'task_item', 'mention', 'figure', 'asset_image', 'embed', 'table'];

describe('the nodes that carry a nodeId', () => {
    it('are heading, task_item, mention, figure, asset_image, embed and table, of every shipped feature', () => {
        const model = compileContentModel(featuresById(Object.keys(registry)), { id: 'node-ids', version: 1 });
        const { nodes } = buildSchema(model);
        const carrying = Object.values(nodes).filter(({ spec }) => Object.hasOwn(spec.attrs ?? {}, 'nodeId'));

        expect(carrying.map(({ name }) => name).filter((name) => !ADDRESSED.includes(name))).toEqual([]);
        expect(carrying.map(({ name }) => name).sort()).toEqual(
            ADDRESSED.filter((name) => nodes[name] !== undefined).sort(),
        );
    });

    it('decodes a nodeId on a paragraph into unknownAttributes with a warning, never as an occurrence ID', () => {
        const model = PROFILE_MODELS.document;
        const heading = { type: 'heading', attrs: { nodeId: 'p1', level: 2 }, content: [{ type: 'text', text: 'H' }] };
        const paragraph = { type: 'paragraph', attrs: { nodeId: 'p1' }, content: [{ type: 'text', text: 'P' }] };
        const { result, tree } = decodeToTree(storedIn(model, [paragraph, heading] as ContentNodeJSON[]), model);

        expect(result.diagnostics.map(({ code, severity, path }) => [code, severity, path])).toEqual([
            ['format.unknown-attribute', 'warning', '/content/content/0/attrs/nodeId'],
        ]);
        const children = tree?.content;
        const first = children?.[0];
        const second = children?.[1];
        const firstAttrs = first?.attrs;
        const secondAttrs = second?.attrs;
        expect(firstAttrs).toMatchObject({ unknownAttributes: { nodeId: 'p1' } });
        expect(Object.hasOwn(firstAttrs ?? {}, 'nodeId')).toBe(false);
        expect(secondAttrs).toMatchObject({ nodeId: 'p1' });
    });
});
