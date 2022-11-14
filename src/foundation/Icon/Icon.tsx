/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { IconProps } from './IconProps';
import { iconsMap } from './IconsMap';

export const Icon: FC<IconProps> = ({ size, icon }) => React.cloneElement(iconsMap[icon], { size });
