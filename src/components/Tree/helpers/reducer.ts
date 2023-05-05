import { ReactElement } from 'react';

export const findIndexById = (nodes: ReactElement[], id: string) => {
    return nodes.findIndex((node) => node.props.id === id);
};

export const findLastIndexByParentId = (nodes: ReactElement[], parentId: string) => {
    return nodes.findLastIndex((node) => node.props.parentId === parentId);
};

export const getNodeChildrenIds = (nodes: ReactElement[], nodeIndex: number, id: string) => {
    const lastChildIndex = findLastIndexByParentId(nodes, id);

    return nodes.slice(nodeIndex + 1, lastChildIndex - nodeIndex).map((node) => node.props.id as string);
};

export const updateNodesWithNewChildren = (
    nodes: ReactElement[],
    index: number,
    children: ReactElement[],
    offset: number,
) => {
    return [...nodes.slice(0, index + 1), ...children, ...nodes.slice(offset)];
};
