/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { buildSchema } from '#/definition/schema';
import { featuresById } from '#/features';
import { registry } from '#/features/registry';
import { compileContentModel } from '#/model';

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
});
