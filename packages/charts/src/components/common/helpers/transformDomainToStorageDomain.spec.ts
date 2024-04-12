/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { transformDomainToStorageDomain } from './transformDomainToStorageDomain';

describe('transformDomainToStorageDomain', () => {
    it('should not round values under 1000 or over 100000', () => {
        const mockDomain1: [number, number] = [0, 1];
        const mockDomain2: [number, number] = [0, 10];
        const mockDomain3: [number, number] = [0, 100];
        const mockDomain4: [number, number] = [0, 999];

        const result1 = transformDomainToStorageDomain(mockDomain1);
        expect(result1).toEqual([0, 1]);
        const result2 = transformDomainToStorageDomain(mockDomain2);
        expect(result2).toEqual([0, 10]);
        const result3 = transformDomainToStorageDomain(mockDomain3);
        expect(result3).toEqual([0, 100]);
        const result4 = transformDomainToStorageDomain(mockDomain4);
        expect(result4).toEqual([0, 999]);
    });

    it('should round to nearest storage value an amount between 1000 and 100000', () => {
        const mockDomain1: [number, number] = [0, 1001];
        const mockDomain2: [number, number] = [0, 7000];
        const mockDomain3: [number, number] = [0, 12000];
        const mockDomain4: [number, number] = [0, 25000];
        const mockDomain5: [number, number] = [0, 58000];
        const mockDomain6: [number, number] = [0, 99000];

        const result1 = transformDomainToStorageDomain(mockDomain1);
        expect(result1).toEqual([0, 1024]);
        const result2 = transformDomainToStorageDomain(mockDomain2);
        expect(result2).toEqual([0, 7168]);
        const result3 = transformDomainToStorageDomain(mockDomain3);
        expect(result3).toEqual([0, 12288]);
        const result4 = transformDomainToStorageDomain(mockDomain4);
        expect(result4).toEqual([0, 25600]);
        const result5 = transformDomainToStorageDomain(mockDomain5);
        expect(result5).toEqual([0, 58368]);
        const result6 = transformDomainToStorageDomain(mockDomain6);
        expect(result6).toEqual([0, 99328]);
    });

    it('should round to nearest big storage value an amount greater than 100000', () => {
        const mockDomain1: [number, number] = [0, 100001];
        const mockDomain2: [number, number] = [0, 200000];
        const mockDomain3: [number, number] = [0, 530000];
        const mockDomain4: [number, number] = [0, 700000];

        const result1 = transformDomainToStorageDomain(mockDomain1);
        expect(result1).toEqual([0, 102400]);
        const result2 = transformDomainToStorageDomain(mockDomain2);
        expect(result2).toEqual([0, 204800]);
        const result3 = transformDomainToStorageDomain(mockDomain3);
        expect(result3).toEqual([0, 614400]);
        const result4 = transformDomainToStorageDomain(mockDomain4);
        expect(result4).toEqual([0, 716800]);
    });
});
