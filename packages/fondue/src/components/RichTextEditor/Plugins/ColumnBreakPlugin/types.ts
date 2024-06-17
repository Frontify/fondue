/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginProps } from '@components/RichTextEditor/Plugins/Plugin';

export type BreakAfterPluginProps = PluginProps & {
    columns?: number;
    gap?: string | number;
    /**
     * If provided the `columns` and `gap` properties will be ignored
     */
    customClass?: string;
};
