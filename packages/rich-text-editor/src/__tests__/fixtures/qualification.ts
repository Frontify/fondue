/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Each result of a qualification record that still names the CI job in `pendingIn`, as `<path>: <job>`. */
export const pendingResults = (value: unknown, path = ''): string[] => {
    if (typeof value !== 'object' || value === null) {
        return [];
    }
    const entries = Object.entries(value as Readonly<Record<string, unknown>>);
    const job = entries.find(([key]) => key === 'pendingIn')?.[1];
    const nested = entries.flatMap(([key, child]) => pendingResults(child, `${path}/${key}`));
    if (typeof job !== 'string') {
        return nested;
    }
    return [`${path}: ${job}`, ...nested];
};
