/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject } from 'react';

import { type EditorApi, useClientLayoutEffect } from '#/bridge/pluginApi/plugin';

const SUMMARY_KEY = 'content-checks-summary';

/** Announces the summary when a later run changes it, unless focus on the heading already read it out. */
export const useSummaryAnnouncement = ({
    api,
    runs,
    summary,
    shownRef,
    openedRunRef,
    headingSpokeRef,
}: {
    api: EditorApi | undefined;
    runs: number;
    summary: string;
    shownRef: MutableRefObject<{ runs: number; summary: string } | undefined>;
    openedRunRef: MutableRefObject<number>;
    headingSpokeRef: MutableRefObject<boolean>;
}) => {
    useClientLayoutEffect(() => {
        const shown = shownRef.current;
        shownRef.current = { runs, summary };
        const spoken = headingSpokeRef.current;
        headingSpokeRef.current = false;
        // The counts of the run the panel opened on, or that focus moved to, are read with the focused heading.
        if (shown === undefined || spoken || runs <= openedRunRef.current || runs === shown.runs) {
            return;
        }

        // A key holds the summary back until runs pause, so it never lands in the frame of a message the change set off.
        if (summary !== shown.summary) {
            api?.announce(summary, SUMMARY_KEY);
        }
    }, [runs, summary, api]);
};
