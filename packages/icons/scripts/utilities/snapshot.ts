/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

import { SNAPSHOT_FILE_PATH } from '../config';

import type * as Figma from 'figma-api';

const savedSnapshot = readFileSync(SNAPSHOT_FILE_PATH, {
    encoding: 'utf8',
});

const sha256Checksum = (value: string) => {
    return createHash('sha256').update(value, 'utf8').digest('hex');
};

export const saveSnapshot = (content: Figma.Node<keyof Figma.NodeTypes>[]): void => {
    const fileContent = JSON.stringify(content);
    writeFileSync(SNAPSHOT_FILE_PATH, fileContent);
};

export const didComponentChange = (componentSetNode: Figma.Node<keyof Figma.NodeTypes>): boolean => {
    if (!savedSnapshot) {
        return false;
    }

    const parsedSnapshot: unknown = JSON.parse(savedSnapshot);

    if (!Array.isArray(parsedSnapshot)) {
        throw new TypeError('Snapshot is not an array');
    }

    const previousNode: unknown = parsedSnapshot.find(
        (node: unknown) => node && typeof node === 'object' && 'id' in node && node.id === componentSetNode.id,
    );

    const newNodeChecksum = sha256Checksum(JSON.stringify(componentSetNode));
    const previousNodeChecksum = previousNode ? sha256Checksum(JSON.stringify(previousNode)) : '';

    return newNodeChecksum !== previousNodeChecksum;
};
