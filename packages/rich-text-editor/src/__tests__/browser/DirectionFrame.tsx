/* (c) Copyright Frontify Ltd., all rights reserved. */

// Mounted by direction.ct.tsx: a component test mounts imported components, so the two directions share one frame.

import { ThemeProvider } from '@frontify/fondue-components';

import { RichTextEditor } from '../../index';
import { alignPlugin } from '../../plugins';

import { EDITOR_WIDTH, END_ALIGNED_DOCUMENT } from './directionValues';

const PLUGINS = [alignPlugin()];

/** The same document in a left to right and a right to left editor, side by side. */
export const DirectionFrame = () => (
    <div style={{ display: 'flex', gap: '24px' }}>
        <div data-test-id="ltr" style={{ width: EDITOR_WIDTH }}>
            <ThemeProvider dir="ltr">
                <RichTextEditor value={END_ALIGNED_DOCUMENT} plugins={PLUGINS} toolbarPlacement="top" />
            </ThemeProvider>
        </div>
        <div data-test-id="rtl" style={{ width: EDITOR_WIDTH }}>
            <ThemeProvider dir="rtl">
                <RichTextEditor value={END_ALIGNED_DOCUMENT} plugins={PLUGINS} toolbarPlacement="top" />
            </ThemeProvider>
        </div>
    </div>
);
