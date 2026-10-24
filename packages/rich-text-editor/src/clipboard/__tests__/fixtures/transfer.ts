/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextSlice } from '#/model';
import { type paste } from '#/testing';

import { SLICE_TYPE } from '../../slice';

export const transfer = (data: Readonly<Record<string, string>>, files: readonly File[] = []) => {
    const dataTransfer = new DataTransfer();
    for (const [type, value] of Object.entries(data)) {
        dataTransfer.setData(type, value);
    }
    for (const file of files) {
        dataTransfer.items.add(file);
    }
    return dataTransfer;
};

/** What `data` hands the paste order, as the `paste` helper takes it. */
export const inputOf = (
    data: Readonly<Record<string, string>>,
    files: readonly File[],
): Parameters<typeof paste>[1] => {
    const html = data['text/html'] ?? '';
    const text = data['text/plain'] ?? '';
    const input = { html, text, files };
    const slice = data[SLICE_TYPE];
    if (slice === undefined) {
        return input;
    }
    return { ...input, slice: JSON.parse(slice) as RichTextSlice };
};
