/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type ReactNode, useContext } from 'react';

import { type PanelComponentProps } from '#/bridge/pluginApi/define';
import { defineEditorPart } from '#/bridge/pluginApi/plugin';
import { SessionContext } from '#/bridge/session/helpers/sessionContext';
import { type EditorHandle } from '#/index';
import { defineFeature } from '#/model';

const FindPanel = () => (
    <div role="search" aria-label="Find">
        Find
    </div>
);

const PickerPanel = () => {
    const runtime = useContext(SessionContext);

    return (
        <div role="search" aria-label="Find">
            <button
                type="button"
                onClick={(event) => {
                    event.currentTarget.focus();
                    runtime?.handle.execute('emoji.picker.open');
                }}
            >
                Pick an emoji
            </button>
        </div>
    );
};

const SearchPanel = () => (
    <div role="search" aria-label="Find">
        <input aria-label="Search" />
        <button type="button">Previous</button>
    </div>
);

const ThrowingFindPanel = (): ReactNode => {
    throw new Error('find panel failed');
};

/** A feature and its editor part, whose `find.open` opens `component` as the `find` panel. */
const findPanel = (id: string, component: ComponentType<PanelComponentProps>) => {
    const feature = defineFeature({ id, version: 1, requires: [{ id: 'core', version: 1 }] });
    const plugin = defineEditorPart(feature, {
        needs: ['panels'],
        commands: {
            'find.open': {
                readOnly: true,
                run: (api) => {
                    api.panels.open('find');

                    return true;
                },
                active: (api) => api.panels.isOpen('find'),
            },
        },
        panels: [{ control: 'find', component }],
    });

    return { feature: feature(), plugin };
};

/** Runs `find.open`, which only the fixture's editor part installs, so the handle's own commands do not name it. */
export const openFind = (handle: object) => (handle as EditorHandle<{ 'find.open': undefined }>).execute('find.open');

/** Queries `find.open`, which is active while the `find` panel is open. */
export const queryFind = (handle: object) => (handle as EditorHandle<{ 'find.open': undefined }>).query('find.open');

/** A find panel that only tests use, standing in for the find feature. */
export const fixtureFindPanel = findPanel('fixture.find', FindPanel);

/** A find panel whose render throws, so the panel boundary can replace it. */
export const fixtureThrowingFindPanel = findPanel('fixture.find-throwing', ThrowingFindPanel);

/** A find panel whose button opens the emoji picker, a control that a panel can open. */
export const fixturePickerPanel = findPanel('fixture.find-picker', PickerPanel);

/** A find panel whose search field is its first focusable control. */
export const fixtureSearchPanel = findPanel('fixture.find-search', SearchPanel);
