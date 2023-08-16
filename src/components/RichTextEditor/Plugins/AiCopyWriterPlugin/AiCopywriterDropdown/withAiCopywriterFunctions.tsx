/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable react/display-name */

import React, { ComponentType } from 'react';
import { AiCopywriter } from '../../types';

export const withAiCopywriterFunctions =
    <T extends Record<string, unknown>>(
        Component: ComponentType<T>,
        aiCopywriters: AiCopywriter[],
        isLoading: boolean,
    ) =>
    (props: T) =>
        <Component {...props} aiCopywriters={aiCopywriters} isLoading={isLoading} />;
