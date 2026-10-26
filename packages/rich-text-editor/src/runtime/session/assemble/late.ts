/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorRuntime } from '../../runtime';
import { type Actions } from '../editing/actions';
import { type Commands } from '../editing/commands';
import { type Commit } from '../editing/commit';
import { type ViewService } from '../editing/view';
import { type Queue } from '../lifecycle/queue';
import { type TargetsService } from '../lifecycle/targets';

/** What an earlier phase reads lazily from a later one; the root fills it once every phase is built. */
export type Late = {
    views: ViewService;
    commit: Commit;
    settleInput: () => void;
    targets: TargetsService;
    commands: Commands;
    queue: Queue;
    actions: Actions;
    runtime: EditorRuntime;
};
