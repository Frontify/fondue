/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type UploadStatus } from '#/bridge/plugin';

export const isRunning = (status: UploadStatus) => status.state === 'running' || status.state === 'queued';
