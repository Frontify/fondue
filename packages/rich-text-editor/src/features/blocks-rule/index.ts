/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/define-plugin';

import { ruleEditor } from './editor';
import { rule } from './feature';

/** Horizontal rules, from `---`, `***` or `___` at a line start, or the toolbar. */
export const rulePlugin = definePlugin({ feature: rule, editor: ruleEditor });
