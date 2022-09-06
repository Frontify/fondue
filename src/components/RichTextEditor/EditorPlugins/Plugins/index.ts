/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugins } from './types';
import { BoldPlugin } from './BoldPlugin';
import { ItalicPlugin } from './ItalicPlugin';
import { UnderlinePlugin } from './UnderlinePlugin';
import { StrikethroughPlugin } from './StrikethroughPlugin';
import { CodePlugin } from './CodePlugin';
import { UnorderedListPlugin } from './UnorderedListPlugin';
import { OrderedListPlugin } from './OrderedListPlugin';
import { CheckboxListPlugin } from './CheckboxListPlugin';
import { AlignPlugin } from './AlignPlugin';

export const defaultPlugins: Plugins = [
    new BoldPlugin(),
    new ItalicPlugin(),
    [new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin(), new CodePlugin()],
    [new AlignPlugin()],
    [new UnorderedListPlugin(), new CheckboxListPlugin(), new OrderedListPlugin()],
];

export default {
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    StrikethroughPlugin,
    CodePlugin,
    UnorderedListPlugin,
    OrderedListPlugin,
    CheckboxListPlugin,
    AlignPlugin,
};

export * from './types';
