/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Guide, type GuideFilter } from '../types/guides';
import { textIncludes } from '../utils/filters';
import { deepFreeze } from '../utils/freeze';

export interface GuidesApi {
    list(): readonly Guide[];
    get(id: string): Guide | undefined;
    has(id: string): boolean;
    where(filter: GuideFilter): readonly Guide[];
    readonly size: number;
}

const matches = (guide: Guide, filter: GuideFilter): boolean => {
    if (filter.text && !textIncludes(filter.text, [guide.id, guide.title, guide.content])) {
        return false;
    }
    return true;
};

export const buildGuidesApi = (raws: readonly Guide[]): GuidesApi => {
    deepFreeze(raws);
    const byId = new Map(raws.map((g) => [g.id, g]));

    return Object.freeze({
        list: () => raws,
        get: (id: string) => byId.get(id),
        has: (id: string) => byId.has(id),
        where: (f: GuideFilter) => raws.filter((g) => matches(g, f)),
        get size() {
            return raws.length;
        },
    });
};
