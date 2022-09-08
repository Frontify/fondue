/* (c) Copyright Frontify Ltd., all rights reserved. */
import React, { FC } from 'react';
import { IconProps } from './IconProps';
import { iconsMap } from './IconsMap';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Icon: FC<IconProps> = ({ size, icon }) => React.cloneElement(iconsMap['Johanna'], { size });
