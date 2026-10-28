/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineEditorPart } from '#/bridge/pluginApi/plugin';
import { type EditorHandle } from '#/index';
import { defineFeature } from '#/model';
import { core } from '#/plugins/Core/feature';
import { mountText, para, text, textModel } from '#/react/__tests__/fixtures/text';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

const testIdProbe = defineFeature({ id: 'fixture.test-id-probe', version: 1, requires: [{ id: 'core', version: 1 }] });
const testIdProbePart = defineEditorPart(testIdProbe, {
    commands: {
        'test-id.probe': { readOnly: true, run: () => true, active: (api) => api.testId() === 'renamed' },
    },
});

const queryProbe = (handle: object) => (handle as EditorHandle<{ 'test-id.probe': undefined }>).query('test-id.probe');

describe('host inputs a plugin command reads', () => {
    it('answers a query again after a host input changes with no new editor state', () => {
        const model = textModel([core(), testIdProbe()]);
        const { handle, rerenderTestId, unmount } = mountText({
            model,
            plugins: [testIdProbePart],
            blocks: [para(text('Hello'))],
        });
        expect(queryProbe(handle).active).toBe(false);

        act(() => {
            rerenderTestId('renamed');
        });

        expect(queryProbe(handle).active).toBe(true);
        unmount();
    });
});
