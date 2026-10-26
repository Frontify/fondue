/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compileContentModel } from '#/model';
import { bulletList } from '#/plugins/BulletList/feature';
import { taskList } from '#/plugins/CheckList/feature';
import { code } from '#/plugins/Code/feature';
import { codeBlock } from '#/plugins/CodeBlock/feature';
import { emoji } from '#/plugins/Emoji/feature';
import { listItem } from '#/plugins/ListItem/feature';
import { mentions } from '#/plugins/Mention/feature';
import { orderedList } from '#/plugins/OrderedList/feature';
import { quote } from '#/plugins/Quote/feature';
import { strike } from '#/plugins/Strikethrough/feature';

import { inlineFeatures } from './inline';

/** The Comment profile's features: Inline's, with quotes, code, lists, mentions and emoji. */
export const commentFeatures = [
    ...inlineFeatures,
    strike(),
    code(),
    quote(),
    codeBlock(),
    listItem(),
    bulletList(),
    orderedList(),
    taskList(),
    mentions(),
    emoji(),
] as const;

/** The compiled content model of the Comment profile. */
export const commentModel = compileContentModel(commentFeatures, { id: 'frontify.comment', version: 1 });
