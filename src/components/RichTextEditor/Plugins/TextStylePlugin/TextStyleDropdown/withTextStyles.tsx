/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable react/display-name */

import React, { ComponentType } from 'react';
import { SelectableTextStyles } from '../TextStyles';

export const withTextStyles =
    <T extends Record<string, unknown>>(Component: ComponentType<T>, textStyles: SelectableTextStyles[]) =>
    (props: T) =>
        <Component {...props} textStyles={textStyles} />;
