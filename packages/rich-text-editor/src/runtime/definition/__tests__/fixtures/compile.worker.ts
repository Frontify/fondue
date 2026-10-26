/* (c) Copyright Frontify Ltd., all rights reserved. */

import { parentPort } from 'node:worker_threads';

import { fixtureExtensionsOf } from '#/features/__tests__/fixtures/extensions';
import { fixtureProfiles } from '#/features/__tests__/fixtures/fixtureProfiles';
import { compileContentModel } from '#/model';
import { compileDefinition } from '#/runtime/definition';

// Compiles every profile stand-in in a fresh module graph and reports the schema, keymap, plugin order and manifest.
const results = Object.entries(fixtureProfiles()).map(([name, features]) => {
    const model = compileContentModel(features, { id: `fixture.${name}`, version: 1 });
    const { schema, plugins, keymap } = compileDefinition(model, {}, fixtureExtensionsOf(model));
    const specs = (types: Readonly<Record<string, { spec: object }>>) =>
        Object.entries(types).map(([type, { spec }]) => ({ type, spec: JSON.stringify(spec) }));

    return {
        name,
        schema: { nodes: specs(schema.nodes), marks: specs(schema.marks) },
        keymap,
        plugins: plugins.map((plugin) => (plugin as unknown as { key: string }).key),
        manifest: model.manifest,
        fingerprint: model.fingerprint,
    };
});

parentPort?.postMessage(results);
