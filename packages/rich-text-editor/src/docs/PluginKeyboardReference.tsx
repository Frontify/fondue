/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type RtePlugin } from '#/core';
import { readableShortcut } from '#/ui/ToolbarButton/ToolbarButton';

import { type KeyboardGroupOwner, keyboardReference } from './keyboardReference';
import styles from './keyboardReference.module.scss';

// Storybook's docs pages restyle tables; this class opts the reference out so the tokens decide its colours.
const STORYBOOK_UNSTYLED = 'sb-unstyled';

const FOR_APPLE = true;
const FOR_OTHER_PLATFORMS = false;

const ownerKeyOf = (owner: KeyboardGroupOwner): string => {
    switch (owner.kind) {
        case 'editor':
            return 'editor';
        case 'plugin':
            return `plugin ${owner.pluginId}`;
    }
};

const ownerHeadingOf = (owner: KeyboardGroupOwner): ReactNode => {
    switch (owner.kind) {
        case 'editor':
            return 'Editor';
        case 'plugin':
            return <code>{owner.pluginId}</code>;
    }
};

type PluginKeyboardReferenceProps = {
    /**
     * The plugins whose keys are listed, as an editor would mount them
     */
    plugins: readonly RtePlugin[];
};

/**
 * Every key the plugins bind, a table per plugin with the keys as Apple and other systems write them
 */
export const PluginKeyboardReference = ({ plugins }: PluginKeyboardReferenceProps): ReactNode => (
    <div className={`${STORYBOOK_UNSTYLED} ${styles.reference}`}>
        {keyboardReference(plugins).map(({ owner, rows }) => (
            <table key={ownerKeyOf(owner)}>
                <caption>{ownerHeadingOf(owner)}</caption>
                <thead>
                    <tr>
                        <th scope="col">Action</th>
                        <th scope="col">Apple</th>
                        <th scope="col">Windows and Linux</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(({ key, label }) => (
                        <tr key={`${key} ${label}`}>
                            <th scope="row">{label}</th>
                            <td>{readableShortcut(key, FOR_APPLE)}</td>
                            <td>{readableShortcut(key, FOR_OTHER_PLATFORMS)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ))}
    </div>
);
