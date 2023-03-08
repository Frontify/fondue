/* (c) Copyright Frontify Ltd., all rights reserved. */

import { InternalLinkNode } from '@components/RichTextEditor/Plugins/types';

export const internalDocumentLinksExample: InternalLinkNode = {
    id: 'blocks',
    title: 'blocks',
    url: '/r/wbunKrdESpopX0KGJGcBjKxvMxcOBUpc8ll6FiJmZmw',
    subNodes: [
        {
            id: 'uncategorized-pages',
            parentId: 'blocks',
            title: 'Uncategorized Pages',
            url: '/r/wbunKrdESpopX0KGJGcBjKxvMxcOBUpc8ll6FiJmZmw',
            subNodes: [
                {
                    id: 'company-update',
                    parentId: 'uncategorized-pages',
                    title: 'Company Update',
                    url: '/r/nQ30Cr5eHms0OLR5t918qkUBGsyBqF1vdGodZ91WucU',
                    subNodes: [
                        {
                            id: 'section-1',
                            parentId: 'company-update',
                            title: 'Section 1',
                            url: '/r/nQ30Cr5eHms0OLR5t918qkUBGsyBqF1vdGodZ91WucU#section-1',
                        },
                        {
                            id: 'section-2',
                            parentId: 'company-update',
                            title: 'Section 2',
                            url: '/r/nQ30Cr5eHms0OLR5t918qkUBGsyBqF1vdGodZ91WucU#section-2',
                        },
                    ],
                },
            ],
        },
    ],
};
