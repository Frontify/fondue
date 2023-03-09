/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LinkTree } from '@components/RichTextEditor/Plugins/types';
import { IconColorFan, IconDocumentText } from '@foundation/Icon';
import React from 'react';

export const linkTreeExample: LinkTree = {
    nodes: [
        {
            id: 'doc-1',
            title: 'Document 1',
            url: '/r/wbunKrdESpopX0KGJGcBjKxvMxcOBUpc8ll6FiJmZmw',
            label: 'Document',
            icon: <IconColorFan />,
            subNodes: [
                {
                    id: 'uncategorized-pages',
                    parentId: 'doc-1',
                    title: 'Uncategorized Pages',
                    url: '/r/wbunKrdESpopX0KGJGcBjKxvMxcOBUpc8ll6FiJmZmw',
                    label: 'Page',
                    subNodes: [
                        {
                            id: 'uncategorized-section-1',
                            parentId: 'uncategorized-pages',
                            title: 'Section 1',
                            url: '/r/nQ30Cr5eHms0OLR5t918qkUBGsyBqF1vdGodZ91WucU#section-1',
                            label: 'Section',
                            icon: <IconDocumentText />,
                        },
                        {
                            id: 'uncategorized-section-2',
                            parentId: 'uncategorized-pages',
                            title: 'Section 2',
                            url: '/r/nQ30Cr5eHms0OLR5t918qkUBGsyBqF1vdGodZ91WucU#section-2',
                            label: 'Section',
                            icon: <IconDocumentText />,
                        },
                    ],
                },
            ],
        },
        {
            id: 'doc-2',
            title: 'Document 2',
            url: '/r/abunKrdESpopX0KGJGcBjKxvMxcOBUpc8ll6FiJmZmw',
            label: 'Document',
            icon: <IconColorFan />,
            subNodes: [
                {
                    id: 'categorized-pages',
                    parentId: 'doc-2',
                    title: 'Categorized Pages',
                    url: '/r/abunKrdESpopX0KGJGcBjKxvMxcOBUpc8ll6FiJmZmw',
                    label: 'Page',
                    subNodes: [
                        {
                            id: 'categorized-section-1',
                            parentId: 'categorized-pages',
                            title: 'Section 1',
                            url: '/r/aQ30Cr5eHms0OLR5t918qkUBGsyBqF1vdGodZ91WucU#section-1',
                            label: 'Section',
                            icon: <IconDocumentText />,
                        },
                        {
                            id: 'categorized-section-2',
                            parentId: 'categorized-pages',
                            title: 'Section 2',
                            url: '/r/aQ30Cr5eHms0OLR5t918qkUBGsyBqF1vdGodZ91WucU#section-2',
                            label: 'Section',
                            icon: <IconDocumentText />,
                        },
                    ],
                },
            ],
        },
    ],
};
