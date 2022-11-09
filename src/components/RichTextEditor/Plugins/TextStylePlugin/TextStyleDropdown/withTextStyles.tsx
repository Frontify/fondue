/* eslint-disable react/display-name */
/* (c) Copyright Frontify Ltd., all rights reserved. */
import React, { ComponentType } from 'react';
import { OptionalTextStyles } from '../TextStyles';

export const withTextStyles =
    <T extends Record<string, unknown>>(Component: ComponentType<T>, textStyles: OptionalTextStyles[]) =>
    (props: T) =>
        <Component {...props} textStyles={textStyles} />;
