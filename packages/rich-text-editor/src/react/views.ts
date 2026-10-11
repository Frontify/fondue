/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type NodeViewDeclaration } from '#/bridge/define';
import { codeBlockView } from '#/features/blocks-code/view';
import { taskItemView } from '#/features/lists-task/view';
import { imageView } from '#/features/media-image/view';
import { mentionView } from '#/features/mentions/view';

/** The node views of the shipped features by feature ID; a feature's own `defineNodeView` replaces them. */
export const SHIPPED_VIEWS: Readonly<Record<string, readonly NodeViewDeclaration[]>> = {
    'blocks.code': [codeBlockView],
    'lists.task': [taskItemView],
    'media.image': [imageView],
    mentions: [mentionView],
};
