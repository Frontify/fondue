/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject } from 'react';

import { type EditorApi, useClientLayoutEffect } from '#/bridge/pluginApi/plugin';
import { type ContentIssue } from '#/model';

import { SEVERITIES } from '../helpers/issueDisplay';

type Severity = ContentIssue['severity'];

/** Opens the checks for this panel, copies the severity icons onto the surface, and focuses the summary. */
export const useChecksSession = (
    api: EditorApi | undefined,
    iconsRef: RefObject<HTMLSpanElement | null>,
    headingRef: RefObject<HTMLHeadingElement | null>,
    openedRunRef: { current: number },
) => {
    useClientLayoutEffect(() => {
        const service = api?.services.checks();
        if (service === undefined) {
            return undefined;
        }

        const shown: Partial<Record<Severity, Element>> = {};
        for (const severity of SEVERITIES) {
            const icon = iconsRef.current?.querySelector(`[data-severity="${severity}"] svg`);
            if (icon !== null && icon !== undefined) {
                shown[severity] = icon;
            }
        }

        const close = service.open(shown, (runs) => {
            openedRunRef.current = runs;
        });
        headingRef.current?.focus();

        return close;
    }, [api]);
};
