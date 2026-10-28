/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonValue } from '../vocabulary/declarations';
import { type RichTextDocument } from '../vocabulary/format';

const codePoint = (characters: readonly string[], index: number) => {
    const character = characters[index];
    if (character === undefined) {
        return 0;
    }

    return character.codePointAt(0) ?? 0;
};

const compareCodePoints = (left: string, right: string) => {
    const leftCharacters = [...left];
    const rightCharacters = [...right];
    for (let index = 0; index < Math.min(leftCharacters.length, rightCharacters.length); index += 1) {
        const difference = codePoint(leftCharacters, index) - codePoint(rightCharacters, index);
        if (difference !== 0) {
            return difference;
        }
    }

    return leftCharacters.length - rightCharacters.length;
};

/** JSON text with object keys sorted by code point and no whitespace; an `undefined` member is absent, as in `JSON.stringify`. */
export const canonicalJson = (value: JsonValue): string => {
    if (Array.isArray(value)) {
        return `[${value.map((item: JsonValue) => canonicalJson(item)).join(',')}]`;
    }

    if (typeof value === 'object' && value !== null) {
        const record = value as Readonly<Record<string, JsonValue | undefined>>;
        const definedKeys = Object.keys(record).filter((key) => record[key] !== undefined);
        definedKeys.sort(compareCodePoints);
        const members = definedKeys.map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key] as JsonValue)}`);

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
const word = (words: ArrayLike<number>, index: number) => words[index] ?? 0;
const choose = (selector: number, preferred: number, alternate: number) =>
    (selector & preferred) ^ (~selector & alternate);
const majority = (first: number, second: number, third: number) =>
    (first & second) ^ (first & third) ^ (second & third);
const upperSigmaZero = (value: number) => rotate(value, 2) ^ rotate(value, 13) ^ rotate(value, 22);
const upperSigmaOne = (value: number) => rotate(value, 6) ^ rotate(value, 11) ^ rotate(value, 25);
const lowerSigmaZero = (value: number) => rotate(value, 7) ^ rotate(value, 18) ^ (value >>> 3);
const lowerSigmaOne = (value: number) => rotate(value, 17) ^ rotate(value, 19) ^ (value >>> 10);

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
                words[index] =
                    word(words, index - 16) + lowerSigmaZero(low) + word(words, index - 7) + lowerSigmaOne(high);
            }
        }

        const registers = [...state];
        for (let index = 0; index < 64; index += 1) {
            const first = word(registers, 0);
            const second = word(registers, 1);
            const third = word(registers, 2);
            const fourth = word(registers, 3);
            const fifth = word(registers, 4);
            const sixth = word(registers, 5);
            const seventh = word(registers, 6);
            const eighth = word(registers, 7);
            const roundSum =
                eighth + upperSigmaOne(fifth) + choose(fifth, sixth, seventh) + word(ROUND, index) + word(words, index);
            const mixSum = upperSigmaZero(first) + majority(first, second, third);
            registers.pop();
            registers[3] = (fourth + roundSum) | 0;
            registers.unshift((roundSum + mixSum) | 0);
        }

        for (let index = 0; index < registers.length; index += 1) {
            state[index] = word(state, index) + word(registers, index);
        }
    }

    return [...state].map((value) => value.toString(16).padStart(8, '0')).join('');
};

/** Lowercase hex SHA-256 over canonical JSON with keys sorted by code point, computed synchronously in JavaScript. */
export const hashDocument = (document: RichTextDocument): string => sha256(documentJson(document));

/** Whether two documents have the same canonical JSON, without hashing either. */
export const sameDocument = (left: RichTextDocument, right: RichTextDocument): boolean =>
    documentJson(left) === documentJson(right);

// A document is plain JSON by construction, but its readonly types do not satisfy JsonValue.
const documentJson = (document: RichTextDocument): string => canonicalJson(document as unknown as JsonValue);
