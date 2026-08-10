/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type ReactNode } from 'react';

import { type EditorControlApi } from '../core/editor-api';
import { type FondueRtePlugin } from '../core/plugin';

export type ToolbarProps = {
    api: EditorControlApi;
    plugins: FondueRtePlugin[];
};

export const Toolbar = ({ api, plugins }: ToolbarProps): ReactNode => {
    return (
        <div
            role="toolbar"
            style={{
                display: 'flex',
                gap: 4,
                padding: '6px 8px',
                borderBottom: '1px solid #e5e7eb',
                background: '#f9fafb',
                alignItems: 'center',
            }}
        >
            {plugins.map((plugin) =>
                plugin.toolbar ? <Fragment key={plugin.id}>{plugin.toolbar(api)}</Fragment> : null,
            )}
        </div>
    );
};
