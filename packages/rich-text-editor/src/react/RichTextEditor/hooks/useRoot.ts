/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useContext, useMemo, useState } from 'react';

import { type MountCoordinator } from '#/bridge/session/helpers/mount';

import { RootContext } from '../helpers/rootContext';
import { type Chrome, type Mounted, PART_KEYS, type PartProps, type Props, type RootContextValue } from '../types';

export const useRoot = (part: string): RootContextValue => {
    const context = useContext(RootContext);
    if (context === null) {
        throw new Error(`RichTextEditor.${part} must be rendered inside RichTextEditor.Root.`);
    }

    return context;
};

/** Memoized on the values the parts read, and the callbacks are stable, so inline host callbacks rebuild nothing. */
export const useRootContext = (
    props: Props,
    latestRef: MutableRefObject<Props>,
    mounted: Mounted,
    coordinator: MountCoordinator,
    chrome: Chrome,
) => {
    const picked: PartProps = Object.fromEntries(PART_KEYS.map((key) => [key, props[key]]));
    const [held, setHeld] = useState(picked);
    let partProps = held;
    if (!PART_KEYS.every((key) => Object.is(held[key], picked[key]))) {
        partProps = picked;
        setHeld(picked);
    }

    const submits = props.onSubmit !== undefined;

    return useMemo<RootContextValue>(
        () => ({
            props: partProps,
            onFocus: (event) => latestRef.current.onFocus?.(event),
            onBlur: (event) => latestRef.current.onBlur?.(event),
            submits,
            mounted,
            coordinator,
            chrome,
        }),
        [partProps, submits, latestRef, mounted, coordinator, chrome],
    );
};
