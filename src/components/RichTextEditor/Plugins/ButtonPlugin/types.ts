import { TLinkElement } from '@udecode/plate';

export type TButtonElement = TLinkElement & {
    chosenLink?: {
        searchResult?: {
            link?: string;
        };
    };
};

export type ButtonStyle = 'primary' | 'secondary' | 'tertiary';
