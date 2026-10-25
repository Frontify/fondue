/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorPort } from './port';
import { type EditorRuntime } from './runtime';

/** The full runtime behind a port, for `bridge` and `runtime` only. */
// The port is the runtime object itself, narrowed for the React layers.
export const engineOf = (port: EditorPort): EditorRuntime => port as EditorRuntime;

// Fails to compile when the runtime stops satisfying the port's members.
export const asPort = (runtime: EditorRuntime): EditorPort => runtime;
