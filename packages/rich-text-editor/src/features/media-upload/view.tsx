/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LoadingBar } from '@frontify/fondue-components';
import { type CSSProperties, useContext, useEffect, useState } from 'react';

import { NodeChromeButton } from '#/bridge/define';
import { SessionContext, useSessionValue } from '#/bridge/hooks';
import { type CodecContext } from '#/model';
import { type UploadStatus } from '#/runtime/uploads';

import styles from './styles/upload.module.scss';

const CANCEL = 'media.upload.cancel';
const RETRY = 'media.upload.retry';
// An indeterminate animation stops after this long, leaving its text.
const MOTION_MS = 5000;

const sameStatus = (a: UploadStatus | undefined, b: UploadStatus | undefined) =>
    a === b || (a !== undefined && b !== undefined && a.state === b.state && a.progress === b.progress);

/** The upload of slot `nodeId` as the session reports it, or `undefined` when none runs, failed or stopped. */
export const useUploadStatus = (nodeId: string): UploadStatus | undefined =>
    useSessionValue((runtime) => runtime?.uploads.statusOf(nodeId), sameStatus);

/**
 * The progress bar, named by the file; an indeterminate one, which mounts anew each time it starts, stops moving after
 * its time.
 */
const ProgressBar = ({ name, value }: { readonly name: string; readonly value: number | null }) => {
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

/** The text that says how the upload of a slot stands. */
const statusText = (status: UploadStatus, t: CodecContext['t']) => {
    if (status.state === 'running') {
        if (status.progress === null) {
            return t('RichTextEditor_uploadRunning');
        }
        return t('RichTextEditor_uploadPercent', { percent: status.progress });
    }
    if (status.state === 'failed') {
        return t('RichTextEditor_uploadError');
    }
    if (status.state === 'stopped') {
        return t('RichTextEditor_uploadStopped');
    }
    return t('RichTextEditor_uploadWaiting');
};

const isRunning = (status: UploadStatus) => status.state === 'running' || status.state === 'queued';

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
    readonly status: UploadStatus;
    readonly width: number | null;
    readonly height: number | null;
    readonly t: CodecContext['t'];
    /** Selects the image, since node chrome keeps its own mouse events from the editor. */
    readonly onMouseDown: () => void;
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
            <span className={styles.text}>{statusText(status, t)}</span>
        </span>
    );
};

/**
 * The upload's buttons in the image chrome toolbar: Cancel while it runs or waits, then Retry and Remove once it
 * failed or stopped. Cancel and Retry show where `media.upload` is installed.
 */
export const UploadControls = ({
    nodeId,
    status,
    t,
    onRemove,
}: {
    readonly nodeId: string;
    readonly status: UploadStatus;
    readonly t: CodecContext['t'];
    readonly onRemove: () => void;
}) => {
    const runtime = useContext(SessionContext);
    const installed = (id: string) => runtime?.handle.query(id, { nodeId }).disabledReason !== 'unknown-command';
    if (isRunning(status)) {
        if (!installed(CANCEL)) {
            return null;
        }
        return (
            <NodeChromeButton
                label={t('RichTextEditor_uploadCancel')}
                onClick={() => {
                    // The slot and this button leave, so focus goes to the surface where the slot was.
                    runtime?.handle.execute(CANCEL, { nodeId });
                    runtime?.view?.focus();
                }}
            />
        );
    }
    return (
        <>
            {installed(RETRY) && (
                <NodeChromeButton
                    label={t('RichTextEditor_uploadRetry')}
                    onClick={() => runtime?.handle.execute(RETRY, { nodeId })}
                />
            )}
            <NodeChromeButton label={t('RichTextEditor_uploadRemove')} onClick={onRemove} />
        </>
    );
};
