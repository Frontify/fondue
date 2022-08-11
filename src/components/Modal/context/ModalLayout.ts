/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

export const MODAL_PADDING = {
    default: {
        top: 'tw-pt-14',
        horizontal: 'tw-px-14',
        bottom: 'tw-pb-14',
    },
    compact: {
        top: 'tw-pt-6',
        horizontal: 'tw-px-6',
        bottom: 'tw-pb-6',
    },
};

export const ModalLayout = createContext({ compact: false, padding: MODAL_PADDING.default });
