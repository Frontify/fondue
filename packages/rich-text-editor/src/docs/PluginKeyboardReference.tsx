/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type RtePlugin, type RteShortcutOwner } from '#/core';
import { readableShortcut } from '#/ui/shortcut';

import { keyboardReference, ownerKeyOf } from './keyboardReference';
import styles from './keyboardReference.module.scss';

const FOR_APPLE = true;
const FOR_OTHER_PLATFORMS = false;
const KEY_SEPARATOR = ', ';

/** Every key of a row as one platform writes them */
const keysTextOf = (keys: readonly string[], apple: boolean): string =>
    keys.map((key) => readableShortcut(key, apple)).join(KEY_SEPARATOR);

const ownerHeadingOf = (owner: RteShortcutOwner): ReactNode => {
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
    <div className={styles.reference}>
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
                    {rows.map(({ keys, label }) => (
                        <tr key={label}>
                            <th scope="row">{label}</th>
                            <td>{keysTextOf(keys, FOR_APPLE)}</td>
                            <td>{keysTextOf(keys, FOR_OTHER_PLATFORMS)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ))}
    </div>
);
