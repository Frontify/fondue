/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { RouterProvider, useFondueRouter } from '../RouterProvider';

const TestComponent = () => {
    const { navigate, useHref } = useFondueRouter();

    return (
        <div>
            <button onClick={() => navigate('/foo')}>Navigate</button>
            <span data-test-id="href">{useHref('/bar')}</span>
        </div>
    );
};

describe('RouterProvider', () => {
    it('should call navigate when button is clicked', () => {
        const navigateStub = vi.fn();
        const useHrefStub = vi.fn().mockReturnValue('/resolved/bar');

        render(
            <RouterProvider navigate={navigateStub} useHref={useHrefStub}>
                <TestComponent />
            </RouterProvider>,
        );

        fireEvent.click(screen.getByText('Navigate'));
        expect(navigateStub).toHaveBeenCalledOnce();
        expect(navigateStub).toHaveBeenCalledWith('/foo');
    });

    it('should render resolved href', () => {
        const navigateStub = vi.fn();
        const useHrefStub = vi.fn().mockReturnValue('/resolved/bar');

        render(
            <RouterProvider navigate={navigateStub} useHref={useHrefStub}>
                <TestComponent />
            </RouterProvider>,
        );

        expect(screen.getByTestId('href').textContent).toBe('/resolved/bar');
    });
});
