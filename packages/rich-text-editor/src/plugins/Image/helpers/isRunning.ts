/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type UploadStatus } from '#/bridge/pluginApi/plugin';

/** Whether the upload runs or waits for its turn. */
export const isRunning = (status: UploadStatus) => status.state === 'running' || status.state === 'queued';
