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

vi.mock('./hooks/usePositions', async () => ({
    usePositions: vi.fn(),
}));

describe('Tooltip', () => {
    it('should render the value info by series', () => {
        vi.mocked(useContext).mockReturnValue({
            tooltipData: {
                datumByKey: {
                    test1: {
                        datum: {
                            label: 'test1',
                            value: 10,
                        },
                        index: 1,
                        key: 'test1',
                    },

                    test2: {
                        datum: {
                            label: 'test2',
                            value: 20,
                        },
                        index: 2,
                        key: 'test2',
                    },

                    test3: {
                        datum: {
                            label: 'test3',
                            value: 30,
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
        const { getByText } = render(
            <Tooltip crossHairStyle="line" colorAccessor={(str) => str} valueInfoBySeries={['%', 'ºC', 'F']} />,
        );

        expect(getByText(/10 %/i)).toBeDefined();
        expect(getByText(/20 ºc/i)).toBeDefined();
        expect(getByText(/30 f/i)).toBeDefined();
    });
});
