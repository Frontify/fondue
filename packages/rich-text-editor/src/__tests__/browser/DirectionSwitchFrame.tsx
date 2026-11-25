/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by direction.ct.tsx: a component test mounts imported components, so the switch lives in the frame.

import { ThemeProvider } from '@frontify/fondue-components';
import { useState } from 'react';

import { RichTextEditor } from '../../index';
import { alignPlugin } from '../../plugins';

import { END_ALIGNED_DOCUMENT } from './directionValues';

const PLUGINS = [alignPlugin()];

/** One editor whose host switches its reading direction after mount, from a button outside the editor. */
export const DirectionSwitchFrame = () => {
    const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

    return (
        <div>
            <button type="button" onClick={() => setDir('rtl')}>
                Switch to right to left
            </button>
            <ThemeProvider dir={dir}>
                <RichTextEditor value={END_ALIGNED_DOCUMENT} plugins={PLUGINS} toolbarPlacement="top" />
            </ThemeProvider>
        </div>
    );
};
