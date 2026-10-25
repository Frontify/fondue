/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LoadingBar } from '@frontify/fondue-components';
import { type CSSProperties, type FocusEvent, type MouseEvent, useEffect, useRef, useState } from 'react';

import { NodeChromeButton } from '#/bridge/define';
import { type UploadStatus, useClientLayoutEffect, useEditorApi } from '#/bridge/plugin';
import { type CodecContext } from '#/model';

import styles from './styles/upload.module.scss';
import { surfaceFocused, uploadStatusText } from './uploadStatus';

const CANCEL = 'media.upload.cancel';
const RETRY = 'media.upload.retry';
// An indeterminate animation stops after this long, leaving its text.
const MOTION_MS = 5000;

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
    readonly onMouseDown: (event: MouseEvent) => void;
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

/**
 * The upload's buttons in the image chrome toolbar: Cancel while it runs or waits, then Retry and Remove once it
 * failed or stopped. Cancel and Retry show where `media.upload` is installed. When the upload's change takes away
 * the button that has focus, the button that takes its place gets focus, or once the upload completes the image's
 * first button, else the surface.
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
    const api = useEditorApi();
    // These keep their identity when a locale change gives a new API, which reruns no effect.
    const focus = api?.focus;
    const surface = api?.surface;
    const wrapperRef = useRef<HTMLSpanElement>(null);
    // Whether one of these buttons had focus last, which a button that left the DOM keeps.
    const focusedRef = useRef(false);
    const running = isRunning(status);
    useClientLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        if (!focusedRef.current || wrapper === null || wrapper.contains(wrapper.ownerDocument.activeElement)) {
            return;
        }
        const next = wrapper.querySelector<HTMLElement>('button');
        if (next === null) {
            focusedRef.current = false;
            focus?.();
            return;
        }
        next.focus();
    }, [running, focus]);
    useClientLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        let toolbar: HTMLElement | null = null;
        if (wrapper !== null) {
            toolbar = wrapper.closest<HTMLElement>('[data-rte-node-chrome]');
        }
        return () => {
            if (!focusedRef.current) {
                return;
            }
            focus?.();
            // A completed upload leaves the image and its toolbar, whose first button then takes focus; a removed
            // image takes its toolbar along, which leaves focus on the surface.
            queueMicrotask(() => {
                if (toolbar === null || !toolbar.isConnected || !surfaceFocused(surface)) {
                    return;
                }
                const next = toolbar.querySelector<HTMLElement>('button');
                if (next !== null && !wrapper?.contains(next)) {
                    next.focus();
                }
            });
        };
    }, [focus, surface]);
    const onBlur = (event: FocusEvent<HTMLSpanElement>) => {
        const { target } = event;
        // A button that leaves the DOM blurs too, which is no move of the author's.
        queueMicrotask(() => {
            if (target.isConnected && !wrapperRef.current?.contains(target.ownerDocument.activeElement)) {
                focusedRef.current = false;
            }
        });
    };
    const installed = (id: string) => api?.commands.query(id, { nodeId }).disabledReason !== 'unknown-command';
    let buttons;
    if (running) {
        buttons = installed(CANCEL) && (
            <NodeChromeButton
                label={t('RichTextEditor_uploadCancel')}
                onClick={() => {
                    // The slot and this button leave, so focus goes to the surface where the slot was.
                    focusedRef.current = false;
                    api?.commands.execute(CANCEL, { nodeId });
                    api?.focus();
                }}
            />
        );
    } else {
        buttons = (
            <>
                {installed(RETRY) && (
                    <NodeChromeButton
                        label={t('RichTextEditor_uploadRetry')}
                        onClick={() => api?.commands.execute(RETRY, { nodeId })}
                    />
                )}
                <NodeChromeButton label={t('RichTextEditor_uploadRemove')} onClick={onRemove} />
            </>
        );
    }
    return (
        <span
            ref={wrapperRef}
            className={styles.controls}
            onFocus={() => {
                focusedRef.current = true;
            }}
            onBlur={onBlur}
        >
            {buttons}
        </span>
    );
};
