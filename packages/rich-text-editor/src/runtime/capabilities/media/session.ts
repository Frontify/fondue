/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type UploadPlace } from '../../portTypes';
import { type CommandResult, type SelectionHandle, type UploadStatus } from '../../types';

/** What a session that installs `media.image` adds to its runtime, found with `mediaOf`. */
export type MediaSession = {
    /**
     * Applies a host asset picker's result, checked as untrusted input, as one undo step: a figure at the insert
     * `target`, or the image `nodeId` refilled, which then asks the author to review its alternative text.
     */
    placeAsset(
        asset: unknown,
        place: { readonly target: SelectionHandle } | { readonly nodeId: string },
    ): CommandResult;
    /** The session's uploads: `accepts` holds the media types `media.image` takes. */
    readonly uploads: {
        readonly accepts: readonly string[] | undefined;
        /**
         * Whether files upload now at `place`: `media.image` is installed, the host has `services.uploads`, the cache
         * has room and the policy allows it.
         */
        available(place: UploadPlace): boolean;
        /** Checks `files` and starts their uploads at `place`, once their headers are read. */
        begin(files: readonly File[], place: UploadPlace): Promise<void>;
        /** Sends the file of the failed or stopped slot `nodeId` again, with no undo step. */
        retry(nodeId: string): void;
        /** Opens the host asset picker, else the file chooser, for new images or for the image `nodeId`. */
        pick(nodeId: string | undefined): void;
        /** What the chrome of slot `nodeId` shows of its upload. */
        statusOf(nodeId: string): UploadStatus | undefined;
    };
};
