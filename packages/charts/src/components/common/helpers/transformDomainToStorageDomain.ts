/* (c) Copyright Frontify Ltd., all rights reserved. */

const getNearestRoundStorage = (value: number) => {
    if (value < 1000) {
        return value;
    }

    if (value > 100000) {
        return Math.ceil(value / (1024 * 100)) * (1024 * 100);
    }

    return Math.ceil(value / 1024) * 1024;
};

export const transformDomainToStorageDomain = (domain: [number, number]): [number, number] => {
    return [getNearestRoundStorage(domain[0]), getNearestRoundStorage(domain[1])];
};
