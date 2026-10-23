/* (c) Copyright Frontify Ltd., all rights reserved. */

import { codeBlock } from '#/features/blocks-code/feature';
import { quote } from '#/features/blocks-quote/feature';
import { emoji } from '#/features/emoji/feature';
import { bulletList } from '#/features/lists-bullet/feature';
import { listItem } from '#/features/lists-item/feature';
import { orderedList } from '#/features/lists-ordered/feature';
import { taskList } from '#/features/lists-task/feature';
import { code } from '#/features/marks-code/feature';
import { strike } from '#/features/marks-strike/feature';
import { mentions } from '#/features/mentions/feature';
import { compileContentModel } from '#/model';

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
