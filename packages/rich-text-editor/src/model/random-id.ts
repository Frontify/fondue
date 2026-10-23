/* (c) Copyright Frontify Ltd., all rights reserved. */

const version4Uuid = (): string => {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    const version = bytes[6] ?? 0;
    const variant = bytes[8] ?? 0;
    bytes[6] = (version & 0x0f) | 0x40;
    bytes[8] = (variant & 0x3f) | 0x80;
    const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

/** The `generateId` default: a random UUID, also on pages that are not secure contexts, which lack `randomUUID`. */
export const randomId = (): string => (typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : version4Uuid());
