/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Guide, type GuideFilter } from '../types/guides';
import { textIncludes } from '../utils/filters';

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
    const byId = new Map(raws.map((g) => [g.id, g]));

    return {
        list: () => raws,
        get: (id) => byId.get(id),
        has: (id) => byId.has(id),
        where: (f) => raws.filter((g) => matches(g, f)),
        get size() {
            return raws.length;
        },
    };
};
