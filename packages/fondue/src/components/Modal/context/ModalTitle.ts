/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HTMLAttributes, createContext } from 'react';

export const ModalTitleContext = createContext<HTMLAttributes<HTMLElement>>({ id: undefined });
ModalTitleContext.displayName = 'ModalTitleContext';
