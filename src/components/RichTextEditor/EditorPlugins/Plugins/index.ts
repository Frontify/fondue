/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AllPluginsType, BOLD, ITALIC, Plugins, STRIKETHROUGH, UNDERLINE } from '../types';
import { BoldPlugin } from './BoldPlugin';
import { ItalicPlugin } from './ItalicPlugin';
import { UnderlinePlugin } from './UnderlinePlugin';
import { StrikethroughPlugin } from './StrikethroughPlugin';

export const defaultPlugins: Plugins[] = [BOLD, ITALIC, UNDERLINE, STRIKETHROUGH];

export const AllPlugins: AllPluginsType = {
    [BOLD]: new BoldPlugin(),
    [ITALIC]: new ItalicPlugin(),
    [UNDERLINE]: new UnderlinePlugin(),
    [STRIKETHROUGH]: new StrikethroughPlugin(),
};
