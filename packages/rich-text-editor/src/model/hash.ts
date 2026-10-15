/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonValue } from './declarations';

const codePoint = (characters: readonly string[], index: number) => {
    const character = characters[index];
    return character === undefined ? 0 : (character.codePointAt(0) ?? 0);
};

const compareCodePoints = (a: string, b: string) => {
    const left = [...a];
    const right = [...b];
    for (let index = 0; index < Math.min(left.length, right.length); index += 1) {
        const difference = codePoint(left, index) - codePoint(right, index);
        if (difference !== 0) {
            return difference;
        }
    }
    return left.length - right.length;
};

/** JSON text with object keys sorted by code point and no whitespace; an `undefined` member is absent, as in `JSON.stringify`. */
export const canonicalJson = (value: JsonValue): string => {
    if (Array.isArray(value)) {
        return `[${value.map((item: JsonValue) => canonicalJson(item)).join(',')}]`;
    }
    if (typeof value === 'object' && value !== null) {
        const record = value as Readonly<Record<string, JsonValue | undefined>>;
        const members = Object.keys(record)
            .filter((key) => record[key] !== undefined)
            .sort(compareCodePoints)
            .map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key] as JsonValue)}`);
        return `{${members.join(',')}}`;
    }
    return JSON.stringify(value);
};

const ROUND = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98,
    0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8,
    0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
    0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
    0xc67178f2,
]);
const INITIAL = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];

const rotate = (value: number, bits: number) => (value >>> bits) | (value << (32 - bits));
const word = (words: Uint32Array, index: number) => words[index] ?? 0;

/** Lowercase hex SHA-256 of the UTF-8 bytes of `text`, in pure JavaScript, so it runs the same on a server. */
export const sha256 = (text: string): string => {
    const bytes = new TextEncoder().encode(text);
    const padded = new Uint8Array(Math.ceil((bytes.length + 9) / 64) * 64);
    padded.set(bytes);
    padded[bytes.length] = 0x80;
    const view = new DataView(padded.buffer);
    view.setUint32(padded.length - 8, Math.floor(bytes.length / 0x20000000));
    view.setUint32(padded.length - 4, (bytes.length * 8) >>> 0);
    const state = new Uint32Array(INITIAL);
    const words = new Uint32Array(64);
    for (let offset = 0; offset < padded.length; offset += 64) {
        for (let index = 0; index < 64; index += 1) {
            if (index < 16) {
                words[index] = view.getUint32(offset + index * 4);
            } else {
                const low = word(words, index - 15);
                const high = word(words, index - 2);
                const s0 = rotate(low, 7) ^ rotate(low, 18) ^ (low >>> 3);
                const s1 = rotate(high, 17) ^ rotate(high, 19) ^ (high >>> 10);
                words[index] = word(words, index - 16) + s0 + word(words, index - 7) + s1;
            }
        }
        let [a, b, c, d, e, f, g, h] = [...state] as [number, number, number, number, number, number, number, number];
        for (let index = 0; index < 64; index += 1) {
            const t1 =
                h +
                (rotate(e, 6) ^ rotate(e, 11) ^ rotate(e, 25)) +
                ((e & f) ^ (~e & g)) +
                word(ROUND, index) +
                word(words, index);
            const t2 = (rotate(a, 2) ^ rotate(a, 13) ^ rotate(a, 22)) + ((a & b) ^ (a & c) ^ (b & c));
            [h, g, f, e, d, c, b, a] = [g, f, e, (d + t1) | 0, c, b, a, (t1 + t2) | 0];
        }
        for (const [index, value] of [a, b, c, d, e, f, g, h].entries()) {
            state[index] = word(state, index) + value;
        }
    }
    return [...state].map((value) => value.toString(16).padStart(8, '0')).join('');
};
