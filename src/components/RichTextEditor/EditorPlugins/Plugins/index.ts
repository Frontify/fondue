/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugins } from '../types';
import { BoldPlugin } from './BoldPlugin';
import { ItalicPlugin } from './ItalicPlugin';
import { UnderlinePlugin } from './UnderlinePlugin';
import { StrikethroughPlugin } from './StrikethroughPlugin';

export const defaultPlugins: Plugins = [
    new BoldPlugin(),
    new ItalicPlugin(),
    new UnderlinePlugin(),
    new StrikethroughPlugin(),
];

export default {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    StrikethroughPlugin,
};
