/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compileContentModel } from '#/model';
import { bulletList } from '#/plugins/BulletList/feature';
import { checkList } from '#/plugins/CheckList/feature';
import { code } from '#/plugins/Code/feature';
import { codeBlock } from '#/plugins/CodeBlock/feature';
import { emoji } from '#/plugins/Emoji/feature';
import { listItem } from '#/plugins/ListItem/feature';
import { mention } from '#/plugins/Mention/feature';
import { orderedList } from '#/plugins/OrderedList/feature';
import { quote } from '#/plugins/Quote/feature';
import { strikethrough } from '#/plugins/Strikethrough/feature';

import { inlineFeatures } from './inline';

/** The Comment profile's features: Inline's, with quotes, code, lists, mentions and emoji. */
export const commentFeatures = [
    ...inlineFeatures,
    strikethrough(),
    code(),
    quote(),
    codeBlock(),
    listItem(),
    bulletList(),
    orderedList(),
    checkList(),
    mention(),
    emoji(),
] as const;

/** The compiled content model of the Comment profile. */
export const commentModel = compileContentModel(commentFeatures, { id: 'frontify.comment', version: 1 });
