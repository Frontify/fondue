/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HrefPolicy, type JsonObject } from '#/model';

const SCHEMES = new Set(['https', 'http', 'mailto', 'tel']);

const listOf = (value: unknown): readonly string[] | undefined => {
    if (!Array.isArray(value)) {
        return undefined;
    }
    return value.filter((item): item is string => typeof item === 'string');
};

/**
 * The URL policy of a feature's `allowedSchemes` and `allowedHosts` options, or `undefined` when it sets neither, so
 * only the default check applies. A null option sets nothing.
 */
export const hrefPolicyOf = (options: JsonObject): HrefPolicy | undefined => {
    const schemes = listOf(options.allowedSchemes);
    const hosts = listOf(options.allowedHosts);
    if (schemes === undefined && hosts === undefined) {
        return undefined;
    }
    let policy: HrefPolicy = {};
    if (schemes !== undefined) {
        policy = {
            allowedSchemes: schemes.filter((scheme): scheme is 'https' | 'http' | 'mailto' | 'tel' =>
                SCHEMES.has(scheme),
            ),
        };
    }
    if (hosts !== undefined) {
        policy = { ...policy, allowedHosts: hosts.map((host) => host.toLowerCase()) };
    }
    return policy;
};
