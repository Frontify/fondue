/* eslint-disable react/display-name */
/* (c) Copyright Frontify Ltd., all rights reserved. */
import React, { ComponentType } from 'react';
import { OptionalTextStyles } from '../TextStyles';

export const withSelectableStyles =
    <T extends Record<string, unknown>>(Component: ComponentType<T>, selectableStyles?: OptionalTextStyles[]) =>
    (props: T) =>
        <Component {...props} selectableStyles={selectableStyles} />;
