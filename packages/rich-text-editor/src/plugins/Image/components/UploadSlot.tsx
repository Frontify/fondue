/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LoadingBar } from '@frontify/fondue-components';
import { type CSSProperties, type MouseEvent, useEffect, useState } from 'react';

import { type UploadStatus } from '#/bridge/pluginApi/plugin';
import { type CodecContext } from '#/model';

import { isRunning } from '../helpers/isRunning';
import { uploadStatusText } from '../hooks/useUploadStatus';
import styles from '../styles/upload.module.scss';

// An indeterminate animation stops after this long, leaving its text.
const MOTION_MS = 5000;

/**
 * The progress bar, named by the file; an indeterminate one, which mounts anew each time it starts, stops moving after
 * its time.
 */
const ProgressBar = ({ name, value }: { name: string; value: number | null }) => {
    const [still, setStill] = useState(false);
    const indeterminate = value === null;
    useEffect(() => {
        if (!indeterminate) {
            return undefined;
        }

        const timer = setTimeout(() => setStill(true), MOTION_MS);

        return () => clearTimeout(timer);
    }, [indeterminate]);

    return (
        <span className={styles.bar} data-still={still && indeterminate ? '' : undefined}>
            <LoadingBar value={value} aria-label={name} size="small" />
        </span>
    );
};

/**
 * An upload into an image slot as its chrome shows it, never a document attribute: a progress bar named by the file,
 * whose indeterminate animation stops after 5 seconds and never runs under reduced motion, and its text, or why the
 * upload failed or stopped. The slot keeps the file's aspect ratio, so the image takes its place unmoved.
 */
export const UploadSlot = ({
    status,
    width,
    height,
    t,
    onMouseDown,
}: {
    status: UploadStatus;
    width: number | null;
    height: number | null;
    t: CodecContext['t'];
    /** Selects the image, since node chrome keeps its own mouse events from the editor. */
    onMouseDown: (event: MouseEvent) => void;
}) => {
    let shape: CSSProperties | undefined;
    if (width !== null && height !== null) {
        shape = { aspectRatio: `${width} / ${height}`, inlineSize: `min(100%, ${width}px)` };
    }

    return (
        // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- a press selects the node as on any atom; the keyboard selects it with the arrows.
        <span className={styles.slot} style={shape} data-rte-upload={status.state} onMouseDown={onMouseDown}>
            {/* A waiting upload shows no progress yet, and a bar that becomes indeterminate again mounts anew. */}
            {isRunning(status) && (
                <ProgressBar
                    key={status.progress === null ? 'indeterminate' : 'known'}
                    name={status.name}
                    value={status.state === 'queued' ? 0 : status.progress}
                />
            )}
            <span className={styles.text}>{uploadStatusText(status, t)}</span>
        </span>
    );
};

UploadSlot.displayName = 'UploadSlot';
