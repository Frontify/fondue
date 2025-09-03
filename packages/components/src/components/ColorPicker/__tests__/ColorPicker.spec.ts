/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import {
    colorToCss,
    getColorWithName,
    getHexDisplayName,
    getLimitedColorChannelValue,
    hexColorToRgba,
    isValidHexColor,
    rgbColorToHex,
} from '../utils';

describe('colorToCss', () => {
    it('should css color string from color with alpha channel', () => {
        const color = colorToCss({ red: 255, green: 100, blue: 0, alpha: 1 });
        expect(color).toEqual('rgba(255, 100, 0, 1)');
    });
    it('should css color string from color without alpha channel', () => {
        const color = colorToCss({ red: 255, green: 100, blue: 0 });
        expect(color).toEqual('rgba(255, 100, 0, 1)');
    });
});

describe('isValidHexColor', () => {
    it('should return true for valid lowercase long format hex color', () => {
        expect(isValidHexColor('ffaa00')).toBe(true);
    });
    it('should return true for valid lowercase short format hex color', () => {
        expect(isValidHexColor('fa0')).toBe(true);
    });
    it('should return true for valid uppercase long format hex color', () => {
        expect(isValidHexColor('FFAA00')).toBe(true);
    });
    it('should return true for valid uppercase short format hex color', () => {
        expect(isValidHexColor('FA0')).toBe(true);
    });
    it('should return false for invalid length hex color', () => {
        expect(isValidHexColor('ff00')).toBe(false);
    });
    it('should return false for invalid length hex color', () => {
        expect(isValidHexColor('HA056A')).toBe(false);
    });
});

describe('hexColorToRgba', () => {
    it('should return rgba for lowercase valid long format hex color', () => {
        const color = hexColorToRgba('ffaa00');
        expect(color).toEqual({ red: 255, green: 170, blue: 0, alpha: 1 });
    });
    it('should return rgba for uppercase valid long format hex color', () => {
        const color = hexColorToRgba('FFAA00');
        expect(color).toEqual({ red: 255, green: 170, blue: 0, alpha: 1 });
    });
    it('should return rgba for lowercase valid short format hex color', () => {
        const color = hexColorToRgba('fa0');
        expect(color).toEqual({ red: 255, green: 170, blue: 0, alpha: 1 });
    });
    it('should return rgba for uppercase valid short format hex color', () => {
        const color = hexColorToRgba('FA0');
        expect(color).toEqual({ red: 255, green: 170, blue: 0, alpha: 1 });
    });
    it('should return rgba ith 0 values for invalid hex color', () => {
        const color = hexColorToRgba('hh0');
        expect(color).toEqual({ red: 0, green: 0, blue: 0, alpha: 0 });
    });
});

describe('rgbColorToHex', () => {
    it('should return hex for valid rgb color', () => {
        const color = rgbColorToHex({ red: 255, green: 170, blue: 0 });
        expect(color).toEqual('ffaa00');
    });
    it('should return hex for valid rgba color with all 0', () => {
        const color = rgbColorToHex({ red: 0, green: 0, blue: 0 });
        expect(color).toEqual('000000');
    });
});

describe('getHexDisplayName', () => {
    it('should return hex without alpha for full opacity', () => {
        const name = getHexDisplayName({ red: 255, green: 255, blue: 255, alpha: 1 });
        expect(name).toEqual('#ffffff');
    });
    it('should return hex without alpha when alpha is undefined', () => {
        const name = getHexDisplayName({ red: 255, green: 87, blue: 51 });
        expect(name).toEqual('#ff5733');
    });
    it('should return hex with percentage for alpha < 1', () => {
        const name = getHexDisplayName({ red: 255, green: 255, blue: 255, alpha: 0.9 });
        expect(name).toEqual('#ffffff 90%');
    });
    it('should return hex with percentage for low alpha', () => {
        const name = getHexDisplayName({ red: 255, green: 87, blue: 51, alpha: 0.84 });
        expect(name).toEqual('#ff5733 84%');
    });
    it('should return hex with 0% for zero alpha', () => {
        const name = getHexDisplayName({ red: 0, green: 0, blue: 0, alpha: 0 });
        expect(name).toEqual('#000000 0%');
    });
    it('should handle rounding for alpha values', () => {
        const name = getHexDisplayName({ red: 255, green: 255, blue: 255, alpha: 0.846 });
        expect(name).toEqual('#ffffff 85%');
    });
});

describe('getColorWithName', () => {
    it('should return the color with hex name for full opacity', () => {
        const color = getColorWithName({ red: 255, green: 0, blue: 0, alpha: 1 }, 'HEX');
        expect(color).toEqual({ red: 255, green: 0, blue: 0, alpha: 1, name: '#ff0000' });
    });
    it('should return the color with hex name and alpha percentage', () => {
        const color = getColorWithName({ red: 255, green: 0, blue: 0, alpha: 0.9 }, 'HEX');
        expect(color).toEqual({ red: 255, green: 0, blue: 0, alpha: 0.9, name: '#ff0000 90%' });
    });
    it('should return the color with rgba name', () => {
        const color = getColorWithName({ red: 255, green: 0, blue: 0, alpha: 1 }, 'RGBA');
        expect(color).toEqual({ red: 255, green: 0, blue: 0, alpha: 1, name: 'rgba(255, 0, 0, 1)' });
    });
});

describe('getLimitedColorChannelValue', () => {
    it('should return limited value for valid value', () => {
        const value = getLimitedColorChannelValue('100');
        expect(value).toEqual(100);
    });
    it('should return limited value for valid same as upper limit', () => {
        const value = getLimitedColorChannelValue('255');
        expect(value).toEqual(255);
    });
    it('should return limited value for valid same as lower limit', () => {
        const value = getLimitedColorChannelValue('0');
        expect(value).toEqual(0);
    });
    it('should return limited value for too low value', () => {
        const value = getLimitedColorChannelValue('-1');
        expect(value).toEqual(0);
    });
    it('should return limited value for too high value', () => {
        const value = getLimitedColorChannelValue('256');
        expect(value).toEqual(255);
    });
    it('should return limited value for valid value', () => {
        const value = getLimitedColorChannelValue('60', 50, 200);
        expect(value).toEqual(60);
    });
    it('should return limited value for too low value', () => {
        const value = getLimitedColorChannelValue('49', 50, 200);
        expect(value).toEqual(50);
    });
    it('should return limited value for too high value', () => {
        const value = getLimitedColorChannelValue('201', 50, 200);
        expect(value).toEqual(200);
    });
});
