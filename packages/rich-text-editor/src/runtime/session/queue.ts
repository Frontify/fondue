/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic } from '#/model';
import { diagnostic } from '#/model/internal';

import { type CommandResult } from '../types';

import { type Busy } from './busy';
import { type Commands, rejected } from './commands';
import { type Composition } from './composition';
import { type Lifecycle } from './lifecycle';
import { type Intent, type RejectedCode } from './types';

// Queued intents whose listeners keep enqueuing stop past this depth.
const MAX_ENQUEUE_DEPTH = 32;

export interface Queue {
    enqueue(id: string, payload?: unknown, options?: unknown): Promise<CommandResult>;
    /** Runs queued intents in call order once no commit or notification is in progress and input has settled. */
    drain(): void;
    settle(code: RejectedCode): void;
}

export const createQueue = (a: {
    lifecycle: Pick<Lifecycle, 'is'>;
    busy: Pick<Busy, 'isBusy'>;
    composition: Pick<Composition, 'active'>;
    run: Commands['run'];
    report: (diagnostic: Diagnostic) => void;
    resources: { intents: number };
}): Queue => {
    const { lifecycle, busy, composition, run, report, resources } = a;
    let draining = false;
    let depth = 0;
    const queue: Intent[] = [];
    const settle = (code: RejectedCode) => {
        for (const intent of queue.splice(0)) {
            resources.intents -= 1;
            intent.resolve(rejected(code));
        }
    };
    const drain = () => {
        if (draining || busy.isBusy() || !lifecycle.is('ready') || composition.active()) {
            return;
        }
        draining = true;
        let warned = false;
        try {
            let intent = queue.shift();
            while (intent !== undefined) {
                resources.intents -= 1;
                // The intent's depth holds while it runs or is reported, so what its listeners enqueue sits deeper.
                depth = intent.depth;
                if (intent.depth <= MAX_ENQUEUE_DEPTH) {
                    intent.resolve(run(intent.id, intent.payload, intent.options, 'queue'));
                } else {
                    if (!warned) {
                        warned = true;
                        report(diagnostic('runtime.enqueue-loop', undefined, undefined, 'warning'));
                    }
                    intent.resolve(rejected('busy'));
                }
                depth = 0;
                intent = queue.shift();
            }
        } finally {
            draining = false;
        }
    };
    const enqueue = (id: string, payload?: unknown, options?: unknown): Promise<CommandResult> =>
        new Promise((resolve) => {
            if (lifecycle.is('faulted', 'disposed')) {
                resolve(rejected('not-ready'));
                return;
            }
            // An intent that a queued intent's events enqueue sits one level deeper.
            queue.push({ id, payload, options, depth: depth + 1, resolve });
            resources.intents += 1;
            drain();
        });
    return { enqueue, drain, settle };
};
