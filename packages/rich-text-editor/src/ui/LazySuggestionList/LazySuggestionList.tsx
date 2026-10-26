/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentProps } from 'react';

import { useSessionValue } from '#/bridge/session';
import { lazyPart } from '#/bridge/session/helpers/lazyPart';
import { activeSuggestionOf } from '#/runtime/port';

const SuggestionList = lazyPart(() => import('../suggestions/SuggestionList').then((loaded) => loaded.SuggestionList));

const hasActive = (runtime: Parameters<typeof activeSuggestionOf>[0] | undefined) =>
    runtime !== undefined && activeSuggestionOf(runtime) !== null;

/** The suggestion list, whose code loads when the first trigger opens a list, not with the editor. */
export const LazySuggestionList = (props: ComponentProps<typeof SuggestionList>) => {
    const active = useSessionValue(hasActive, Object.is);
    if (!active) {
        return null;
    }

    return <SuggestionList {...props} />;
};
