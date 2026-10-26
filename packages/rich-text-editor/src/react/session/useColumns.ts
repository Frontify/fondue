/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef, useState } from 'react';

import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';
import { type readerContext } from '#/reader/helpers/context';
import { type ReaderPresentation } from '#/reader/ReaderWith/ReaderWith';
import { type EditorPort, isComposing } from '#/runtime/port';

import { type ColumnsLayout, showColumns } from '../columns';

import { layoutOf, surfaceOf } from './helpers';

// A composition that outlasts this wait is measured again, which waits again while it runs.
const COMPOSITION_WAIT_MS = 1000;

/** The surface shows the presentation's columns while it has room for them, and the session reads both. */
export const useColumns = (
    live: EditorPort | undefined,
    presentation: ReaderPresentation | undefined,
    t: ReturnType<typeof readerContext>['t'],
) => {
    const columns = layoutOf(presentation);
    let columnCount = 1;
    let columnGap: string | undefined;
    if (columns !== undefined) {
        columnCount = columns.count;
        columnGap = columns.length;
    }

    const [columnsFit, setColumnsFit] = useState(false);
    const breakLabel = t('RichTextEditor_columnBreak');
    const inactiveBreakLabel = t('RichTextEditor_columnBreakInactive');
    useClientLayoutEffect(() => {
        live?.setColumns({
            count: columnCount,
            fits: columnsFit,
            label: breakLabel,
            inactiveLabel: inactiveBreakLabel,
        });
    }, [live, columnCount, columnsFit, breakLabel, inactiveBreakLabel]);
    const columnsLayoutRef = useRef<ColumnsLayout | undefined>(undefined);
    useClientLayoutEffect(() => {
        const surface = surfaceOf(live);
        if (live === undefined || surface === undefined) {
            return undefined;
        }

        const holds = (write: () => void) => {
            if (!isComposing(live)) {
                return false;
            }

            live.afterInput((outcome) => {
                if (outcome !== 'disposed') {
                    write();
                }
            }, COMPOSITION_WAIT_MS);

            return true;
        };

        const layout = showColumns(surface, setColumnsFit, holds);
        columnsLayoutRef.current = layout;

        return () => {
            columnsLayoutRef.current = undefined;
            layout.dispose();
        };
    }, [live]);
    useClientLayoutEffect(() => {
        columnsLayoutRef.current?.update(columnCount, columnGap);
    }, [live, columnCount, columnGap]);
};
