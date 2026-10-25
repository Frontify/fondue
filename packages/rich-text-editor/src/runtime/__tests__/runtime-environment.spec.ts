/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, it } from 'vitest';

import { NETWORK } from '#/testing/__tests__/fixtures/network';
import { STORAGE } from '#/testing/__tests__/fixtures/storage';

import { installRuntimeHooks } from './fixtures/start';

const suite = installRuntimeHooks();

it('runs the runtime suite with every browser storage API failing', () => {
    for (const name of STORAGE) {
        expect(() => {
            Reflect.get(Reflect.get(globalThis, name) as object, 'open');
        }).toThrow(name);
    }
    // The probe above is the only access this suite may make.
    expect(suite.storage().accessed.splice(0)).toEqual([...STORAGE]);
});

it('runs the runtime suite with fetch, XMLHttpRequest, WebSocket and sendBeacon failing', () => {
    expect(() => fetch('/probe')).toThrow('fetch');
    expect(() => new XMLHttpRequest()).toThrow('XMLHttpRequest');
    expect(() => new WebSocket('wss://probe.test')).toThrow('WebSocket');
    expect(() => navigator.sendBeacon('/probe')).toThrow('navigator.sendBeacon');
    // The probe above is the only use this suite may make.
    expect(suite.network.attempts.splice(0)).toEqual([...NETWORK]);
});
