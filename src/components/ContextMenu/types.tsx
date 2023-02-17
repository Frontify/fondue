/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconArrowMove24, IconClipboard24, IconLinkBox24, IconTrashBin24 } from '@foundation/Icon';
import React, { ReactChild } from 'react';

export type ContextMenuProps = {
    isOpen: boolean;
    title: string;
    blockType: string;
    tooltip: string;
    contextMenuType: ContextMenuType;
    blockTypeIcon: ReactChild;
    actionButtons: ReactChild;
};

export enum ContextMenuType {
    Copy = 'Copy',
    Move = 'Move',
    Reference = 'Reference',
    Delete = 'Delete',
}

export const ContextMenuTypeIconMap = {
    [ContextMenuType.Copy]: <IconClipboard24 />,
    [ContextMenuType.Move]: <IconArrowMove24 />,
    [ContextMenuType.Reference]: <IconLinkBox24 />,
    [ContextMenuType.Delete]: <IconTrashBin24 />,
};
