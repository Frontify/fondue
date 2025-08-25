/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { useContext } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Tooltip } from './Tooltip';
import { usePositions } from './hooks';

vi.mock('react', async (importOriginal) => ({
    ...(await importOriginal<typeof Object>()),
    useContext: vi.fn(),
}));

vi.mock('./hooks/usePositions', () => ({
    usePositions: vi.fn(),
}));

describe('Tooltip', () => {
    it('should render the value context if it is present in datum', () => {
        vi.mocked(useContext).mockReturnValue({
            tooltipData: {
                nearestDatum: {
                    datum: {
                        imageUrl: '/image.png',
                    },
                },
                datumByKey: {
                    test1: {
                        datum: {
                            label: 'test1',
                            value: 10,
                            valueContext: '5%',
                        },
                        index: 1,
                        key: 'test1',
                    },

                    test2: {
                        datum: {
                            label: 'test2',
                            value: 20,
                            valueContext: '10%',
                        },
                        index: 2,
                        key: 'test2',
                    },

                    test3: {
                        datum: {
                            label: 'test3',
                            value: 30,
                            valueContext: 'CTR 20%',
                        },
                        index: 3,
                        key: 'test3',
                    },
                },
            },
            tooltipOpen: true,
        });
        vi.mocked(usePositions).mockReturnValue({
            tooltipPosition: { tooltipLeft: 20, tooltipTop: 30 },
            glyphProps: [],
        });
        const { getByText, getByRole } = render(<Tooltip crossHairStyle="line" />);

        expect(getByText(/5%/)).toBeDefined();
        expect(getByText(/10%/)).toBeDefined();
        expect(getByText(/ctr 20%/i)).toBeDefined();
        expect(getByRole('img')).toBeDefined();
    });
});
