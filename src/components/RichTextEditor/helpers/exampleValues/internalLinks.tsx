/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InternalLinkNode } from '@components/RichTextEditor/Plugins/types';
import { IconColorFan, IconDocumentText } from '@foundation/Icon';
import React from 'react';

export const internalDocumentLinksExample: InternalLinkNode = {
    id: 'blocks',
    title: 'blocks',
    url: '/r/wbunKrdESpopX0KGJGcBjKxvMxcOBUpc8ll6FiJmZmw',
    label: 'Document',
    icon: <IconColorFan />,
    subNodes: [
        {
            id: 'uncategorized-pages',
            parentId: 'blocks',
            title: 'Uncategorized Pages',
            url: '/r/wbunKrdESpopX0KGJGcBjKxvMxcOBUpc8ll6FiJmZmw',
            label: 'Page',
            subNodes: [
                {
                    id: 'section-1',
                    parentId: 'company-update',
                    title: 'Section 1',
                    url: '/r/nQ30Cr5eHms0OLR5t918qkUBGsyBqF1vdGodZ91WucU#section-1',
                    label: 'Section',
                    icon: <IconDocumentText />,
                },
                {
                    id: 'section-2',
                    parentId: 'company-update',
                    title: 'Section 2',
                    url: '/r/nQ30Cr5eHms0OLR5t918qkUBGsyBqF1vdGodZ91WucU#section-2',
                    label: 'Section',
                    icon: <IconDocumentText />,
                },
            ],
        },
    ],
};
