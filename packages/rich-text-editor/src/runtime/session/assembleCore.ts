/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic } from '#/model';
import { randomId } from '#/model/internal';

import { UPLOAD_FEATURE } from '../capabilities/media/uploads';
import { ONE_COLUMN } from '../columns';
import { createEventBus } from '../events';
import { type EditorRuntimeOptions } from '../runtime';

import { createBusy } from './busy';
import { createColumns } from './columns';
import { createEncoder } from './encode';
import { createIdentity } from './identity';
import { type Late } from './late';
import { createLifecycle } from './lifecycle';
import { createMetrics } from './metrics';
import { createMode } from './mode';
import { createPolicy } from './policy';
import { createSaving } from './saving';

export type Core = ReturnType<typeof assembleCore>;

/** The leaf services, which need nothing built later except through `late`. */
export const assembleCore = (options: EditorRuntimeOptions, late: Late) => {
    const { definition, limits } = options;
    const generate = options.generateId ?? randomId;
    const identity = createIdentity({ documentId: options.documentId, generate });
    const suggestionListId = `rte-suggestions-${identity.session().sessionId}`;
    const createdAt = Date.now();
    const encoder = createEncoder(definition.model, options.capabilities);
    const lifecycle = createLifecycle();
    // Commits and notifications in progress, during which `execute` is busy and `enqueue` waits.
    const busy = createBusy();
    const { emit, notify, subscribe, watch, clear } = createEventBus({
        isDisposed: lifecycle.isDisposed,
        around: busy.run,
    });
    const report = (diagnostic: Diagnostic) => emit('diagnostic', diagnostic);
    const metrics = createMetrics({ model: definition.model, session: identity.session, emit });
    const policy = createPolicy({
        model: definition.model,
        limits,
        initial: options.policy,
        capabilities: encoder.capabilities,
        onUpdate: (next) => {
            // An operation whose result the new policy forbids ends now.
            late.targets.coordinator.abortWhere((operation) => {
                const rules = next.features[operation.featureId];
                return rules === undefined || !rules[operation.action];
            });
            busy.run(notify);
        },
    });
    const mode = createMode({
        initial: options.mode,
        isDisposed: lifecycle.isDisposed,
        onModeChange: (next) => {
            // A read-only session takes no upload's result, so none runs or waits.
            if (next === 'readonly') {
                late.targets.coordinator.abortWhere(
                    (operation) => operation.service === 'uploads' && operation.featureId === UPLOAD_FEATURE,
                );
            }
            late.views.refresh();
        },
        onDisabledChange: () => late.views.repaint(),
    });
    const columns = createColumns({
        initial: options.columns ?? ONE_COLUMN,
        onChange: () => late.views.refresh(),
    });
    const saving = createSaving({ revision: options.revision ?? null, sequence: identity.sequence, lifecycle });
    return {
        generate,
        identity,
        suggestionListId,
        createdAt,
        encoder,
        lifecycle,
        busy,
        emit,
        notify,
        subscribe,
        watch,
        clear,
        report,
        metrics,
        policy,
        mode,
        columns,
        saving,
    };
};
