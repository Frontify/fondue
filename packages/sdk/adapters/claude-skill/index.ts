/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Adapter } from '../types';

import { install } from './install';
import { status } from './status';
import { uninstall } from './uninstall';

export const claudeSkill: Adapter = {
    name: 'claude-skill',
    description: 'Claude Code skill — teaches Claude to query the Fondue SDK directly',
    install,
    uninstall,
    status,
};
