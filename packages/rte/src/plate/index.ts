/* (c) Copyright Frontify Ltd., all rights reserved. */

export {
    type PlatePlugin,
    type PlateEditor,
    type PlateRenderElementProps,
    type WithOverride,
    getPluginType,
    useEditorState,
    useEventPlateId,
    useEditorRef,
    getPluginOptions,
    useHotkeys,
    useEditorVersion,
    createPluginFactory,
    mockPlugin,
} from '@udecode/plate-core';
export {
    type Value,
    type TText,
    type InsertNodesOptions,
    type UnwrapNodesOptions,
    type TNode,
    type TNodeEntry,
    type WrapNodesOptions,
    type EText,
    getAboveNode,
    someNode,
    getEndPoint,
    getStartPoint,
    insertNodes,
    withoutNormalizing,
    unwrapNodes,
    splitNodes,
    isElement,
    getEditorString,
    getNodeLeaf,
    getNodeProps,
    isExpanded,
    removeNodes,
    setNodes,
    wrapNodes,
    findNode,
    isEndPoint,
    isCollapsed,
    isStartPoint,
    select,
} from '@udecode/slate';
export { focusEditor } from '@udecode/slate-react';
export {
    type RangeBeforeOptions,
    isRangeInSameBlock,
    replaceNodeChildren,
    isRangeAcrossBlocks,
    getNextNodeStartPoint,
    getPreviousNodeEndPoint,
} from '@udecode/slate-utils';
export {
    type TLinkElement,
    type LinkFloatingToolbarState,
    ELEMENT_LINK,
    useFloatingLinkEdit,
    useFloatingLinkEditState,
    useFloatingLinkInsert,
    useFloatingLinkInsertState,
    useLinkOpenButtonState,
    floatingLinkActions,
    floatingLinkSelectors,
    submitFloatingLink,
    useLinkToolbarButton,
    useLinkToolbarButtonState,
    createLinkPlugin,
} from '@udecode/plate-link';
export {
    type UseVirtualFloatingOptions,
    useVirtualFloating,
    flip,
    offset,
    getRangeBoundingClientRect,
    getDefaultBoundingClientRect,
    getSelectionBoundingClientRect,
} from '@udecode/plate-floating';
export { createStore } from '@udecode/zustood';
export { useComposedRef } from '@udecode/react-utils';
export { isDefined } from '@udecode/utils';
export { withRemoveEmptyNodes } from '@udecode/plate-normalizers';
export { createParagraphPlugin } from '@udecode/plate-paragraph';
export { Path, Point, Range } from 'slate';
export { useFocused } from 'slate-react';
