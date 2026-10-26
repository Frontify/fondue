/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/bridge/pluginApi/definePlugin';

import { quoteEditor } from './editor';
import { quote } from './feature';

/** Quotations as `blockquote`, toggled from `>` at a line start or the toolbar. */
export const quotePlugin = definePlugin({ feature: quote, editor: quoteEditor });
