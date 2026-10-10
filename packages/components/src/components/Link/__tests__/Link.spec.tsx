/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RouterProvider } from '../../RouterProvider/RouterProvider';
import { Link } from '../Link';

describe('Link Component', () => {
    it('should render with correct href', () => {
        const navigateStub = () => {};
        const useHrefStub = (path: string) => `/resolved${path}`;

        render(
            <RouterProvider navigate={navigateStub} useHref={useHrefStub}>
                <Link href="/foo">Link Text</Link>
            </RouterProvider>,
        );

        const link = screen.getByText('Link Text');
        expect(link).toHaveAttribute('href', '/resolved/foo');
    });

    it('should navigate client-side on a plain click', () => {
        const navigate = vi.fn();

        render(
            <RouterProvider navigate={navigate} useHref={(path) => path}>
                <Link href="/foo">Link Text</Link>
            </RouterProvider>,
        );

        fireEvent.click(screen.getByText('Link Text'));
        expect(navigate).toHaveBeenCalledWith('/foo');
    });

    it('should let the browser handle links with target="_blank"', () => {
        const navigate = vi.fn();

        render(
            <RouterProvider navigate={navigate} useHref={(path) => path}>
                <Link href="https://example.com" target="_blank">
                    Link Text
                </Link>
            </RouterProvider>,
        );

        const link = screen.getByText('Link Text');
        expect(link).toHaveAttribute('target', '_blank');
        expect(fireEvent.click(link)).toBe(true);
        expect(navigate).not.toHaveBeenCalled();
    });

    it('should let the browser handle modifier clicks', () => {
        const navigate = vi.fn();

        render(
            <RouterProvider navigate={navigate} useHref={(path) => path}>
                <Link href="/foo">Link Text</Link>
            </RouterProvider>,
        );

        expect(fireEvent.click(screen.getByText('Link Text'), { metaKey: true })).toBe(true);
        expect(navigate).not.toHaveBeenCalled();
    });
});
