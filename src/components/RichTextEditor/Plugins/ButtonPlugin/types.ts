/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TLinkElement } from '@udecode/plate';

export type TButtonElement = TLinkElement & {
    chosenLink?: {
        searchResult?: {
            link?: string;
        };
    };
};

export type RichTextButtonStyle = 'primary' | 'secondary' | 'tertiary';
