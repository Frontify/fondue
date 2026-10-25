/* (c) Copyright Frontify Ltd., all rights reserved. */

import { codeBlock } from '#/features/blocksCode/feature';
import { quote } from '#/features/blocksQuote/feature';
import { emoji } from '#/features/emoji/feature';
import { bulletList } from '#/features/listsBullet/feature';
import { listItem } from '#/features/listsItem/feature';
import { orderedList } from '#/features/listsOrdered/feature';
import { taskList } from '#/features/listsTask/feature';
import { code } from '#/features/marksCode/feature';
import { strike } from '#/features/marksStrike/feature';
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
