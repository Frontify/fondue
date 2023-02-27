/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getHotkeyByPlatform } from './getHotkeyByPlatform';

describe('getHotkeyByPlatform', () => {
    it('converts ctrl to ⌘ on Mac', () => {
        const conversion = getHotkeyByPlatform('ctrl + b', 'MacIntel');
        expect(conversion).to.equal('⌘ + b');
    });

    it('converts Ctrl to ⌘ on Mac', () => {
        const conversion = getHotkeyByPlatform('Ctrl + b', 'MacIntel');
        expect(conversion).to.equal('⌘ + b');
    });

    it('does not convert ctrl to ⌘ on Windows', () => {
        const conversion = getHotkeyByPlatform('ctrl + b', 'Win32');
        expect(conversion).to.equal('ctrl + b');
    });

    it('does not convert Ctrl to ⌘ on Windows', () => {
        const conversion = getHotkeyByPlatform('Ctrl + b', 'Win32');
        expect(conversion).to.equal('Ctrl + b');
    });
});
