/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorRuntime } from '../runtime';

import { type Actions } from './actions';
import { type Commands } from './commands';
import { type Commit } from './commit';
import { type Queue } from './queue';
import { type TargetsService } from './targets';
import { type ViewService } from './view';

/** What an earlier phase reads lazily from a later one; the root fills it once every phase is built. */
export interface Late {
    views: ViewService;
    commit: Commit;
    settleInput: () => void;
    targets: TargetsService;
    commands: Commands;
    queue: Queue;
    actions: Actions;
    runtime: EditorRuntime;
}
