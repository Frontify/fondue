/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

export type UtilityCollection = {
    [key: string]: UtilityCollection | UtilityProperty;
};

export type Utility = {
    properties: {
        [key: string]: UtilityProperty;
    };
    path: string[];
};

export type UtilityProperty = {
    name: string;
    value: string;
    type: string;
};

export type UtilityPreview = Utility & {
    getUtilityPreview: (props: Utility) => ReactNode;
    getClassName: (props: Utility) => string;
};
