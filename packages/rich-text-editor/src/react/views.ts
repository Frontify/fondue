/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type NodeViewDeclaration } from '#/bridge/define';
import { taskItemView } from '#/features/lists-task/view';

/** The node views of the shipped features by feature ID; a feature's own `defineNodeView` replaces them. */
export const SHIPPED_VIEWS: Readonly<Record<string, readonly NodeViewDeclaration[]>> = { 'lists.task': [taskItemView] };
