/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type ReactNode } from 'react';

import { type EditorControlApi } from '#/core/editor-api';
import { type FondueRtePlugin, type ToolbarPosition } from '#/core/plugin';

export type ToolbarProps = {
    api: EditorControlApi;
    plugins: FondueRtePlugin[];
    position?: ToolbarPosition;
};

export const Toolbar = ({ api, plugins, position = 'top' }: ToolbarProps): ReactNode => {
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
            {plugins.map((plugin) => {
                if (!plugin.toolbar || !plugin.toolbar.positions.includes(position)) {
                    return null;
                }
                return <Fragment key={plugin.id}>{plugin.toolbar.render(api)}</Fragment>;
            })}
        </div>
    );
};
