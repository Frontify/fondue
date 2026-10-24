/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/define-plugin';

import { inputRulesEditor } from './editor';
import { inputRules } from './feature';

/** The typography input rules, each group on when the `typography` option lists it. */
export const inputRulesPlugin = definePlugin({ feature: inputRules, editor: inputRulesEditor });
