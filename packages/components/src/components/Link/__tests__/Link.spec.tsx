/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

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
});
