/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorState } from 'prosemirror-state';
import { describe, expect, it, vi } from 'vitest';

import { compileDefinition } from '#/definition';
import { core, mediaImage } from '#/features';
import { compileContentModel, type Feature, type ResourceLimits } from '#/model';

import { DEFAULT_ACCEPT_TYPES, type UploadEvent, type UploadServiceLike } from '../../capabilities/media/uploads';
import { createIdentity } from '../../session/identity';
import { createLifecycle } from '../../session/lifecycle';
import { createUploadService } from '../../session/uploads-wiring';
import { type AuthoringPolicy, type SelectionHandle } from '../../types';

const build = (features: readonly Feature[]) => {
    const definition = compileDefinition(compileContentModel(features, { id: 'test.uploads', version: 1 }));
    const doc = definition.schema.node('doc', null, [definition.schema.node('paragraph')]);
    return { definition, state: EditorState.create({ doc }) };
};

const setup = (
    options: {
        features?: readonly Feature[];
        service?: UploadServiceLike | undefined;
        allowed?: boolean;
        captured?: boolean;
    } = {},
) => {
    const { definition, state } = build(options.features ?? [core(), mediaImage()]);
    const lifecycle = createLifecycle();
    lifecycle.to('ready');
    const events: UploadEvent[] = [];
    const picks: (string | undefined)[] = [];
    const released: SelectionHandle[] = [];
    const changed = vi.fn();
    const handle = { id: 'target' } as unknown as SelectionHandle;
    const service = createUploadService({
        definition,
        limits: { maxAssetBytes: 1024 } as ResourceLimits,
        identity: createIdentity({ documentId: 'doc', generate: () => 'id' }),
        lifecycle,
        policy: {
            current: () =>
                ({
                    features: { 'media.image': { create: options.allowed !== false, edit: true, paste: true } },
                }) as unknown as AuthoringPolicy,
        },
        generate: () => 'id',
        host: {
            uploads: () => options.service,
            pick: (nodeId) => picks.push(nodeId),
            uploadEvent: (event) => events.push(event),
        },
        state: () => state,
        commit: () => () => undefined,
        commands: () => ({ runOn: () => ({ status: 'rejected', code: 'not-applicable' }) }),
        targets: () => ({
            coordinator: undefined as never,
            captureRange: () =>
                options.captured === false
                    ? { status: 'rejected', code: 'not-ready' }
                    : { status: 'captured', target: handle },
            releaseTarget: (target) => released.push(target),
            baseOf: () => state,
        }),
        report: () => undefined,
        changed,
    });
    return { service, lifecycle, events, picks, released, changed };
};

const files = [new File(['x'], 'photo.png', { type: 'image/png' })];
const insert = { kind: 'insert', origin: 'command' } as const;
const host: UploadServiceLike = { upload: () => new Promise(() => undefined) } as never;

describe('createUploadService', () => {
    it('accepts the default media types when media.image sets none, and none without media.image', () => {
        expect(setup().service.accepts).toEqual(DEFAULT_ACCEPT_TYPES);
        expect(setup({ features: [core()] }).service.accepts).toBeUndefined();
    });

    it('takes the media types the feature option lists', () => {
        const { service } = setup({ features: [core(), mediaImage({ acceptTypes: ['image/png'] })] });
        expect(service.accepts).toEqual(['image/png']);
    });

    it('is available only with media.image, a host service and a policy that allows the place', () => {
        expect(setup({ service: host }).service.available(insert)).toBe(true);
        expect(setup({ service: undefined }).service.available(insert)).toBe(false);
        expect(setup({ service: host, allowed: false }).service.available(insert)).toBe(false);
        expect(setup({ features: [core()], service: host }).service.available(insert)).toBe(false);
    });

    it('opens the host picker with the node it is given', () => {
        const { service, picks } = setup();
        service.pick('a');
        service.pick(undefined);
        expect(picks).toEqual(['a', undefined]);
    });

    it('starts nothing without a host service, and reports each file failed when no target is captured', async () => {
        const without = setup({ service: undefined });
        await without.service.begin(files, insert);
        expect(without.events).toEqual([]);
        const refused = setup({ service: host, captured: false });
        await refused.service.begin(files, insert);
        expect(refused.events).toEqual([{ kind: 'failed', name: 'photo.png' }]);
    });

    it('hands upload events to the host until the session is disposed', async () => {
        const live = setup({ service: host, captured: false });
        await live.service.begin(files, insert);
        expect(live.events).toHaveLength(1);
        live.lifecycle.to('disposed');
        await live.service.begin(files, insert);
        expect(live.events).toHaveLength(1);
    });

    it('has no status for a slot it does not hold', () => {
        expect(setup().service.statusOf('missing')).toBeUndefined();
    });
});
