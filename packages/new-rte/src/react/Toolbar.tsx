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
                gap: 8,
                padding: 8,
                borderBottom: '1px solid #ddd',
                background: '#fafafa',
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
