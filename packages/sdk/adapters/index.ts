/* (c) Copyright Frontify Ltd., all rights reserved. */

import { claudeSkill } from './claude-skill';
import { type Adapter } from './types';

/**
 * Registry of every adapter the `fondue` CLI can install. Add a new entry
 * here when you build a new adapter (MCP server, REST endpoint, …) and the
 * CLI surfaces it automatically under `fondue adapter …`.
 */
export const ADAPTERS: readonly Adapter[] = [claudeSkill];
