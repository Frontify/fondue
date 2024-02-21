/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TLinkElement as TPlateLinkElement } from '@udecode/plate-link';

export type TLinkElement = TPlateLinkElement & {
    chosenLink?: {
        searchResult?: {
            link?: string;
        };
        openInNewTab?: boolean;
    };
};
