/* (c) Copyright Frontify Ltd., all rights reserved. */

import { test, expect } from '@playwright/experimental-ct-react';
import sinon from 'sinon';

import { RouterProvider } from '../../RouterProvider/RouterProvider';
import { Link } from '../Link';

test('renders link with correct text', async ({ mount }) => {
    const navigateStub = sinon.stub();
    const useHrefStub = sinon.stub();

    const component = await mount(
        <RouterProvider navigate={navigateStub} useHref={useHrefStub}>
            <Link href="/foo">Test Link</Link>
        </RouterProvider>,
    );

    await expect(component).toBeVisible();
    await expect(component).toHaveText('Test Link');
});

test('calls navigate on click', async ({ mount }) => {
    const navigateStub = sinon.stub();
    const useHrefStub = sinon.stub().returns('/resolved/bar');

    const wrapper = await mount(
        <RouterProvider navigate={navigateStub} useHref={useHrefStub}>
            <Link href="/bar" data-test-id="link-root">
                Navigate Link
            </Link>
        </RouterProvider>,
    );
    const component = wrapper.getByTestId('link-root');

    await component.click();
    expect(navigateStub.calledOnceWith('/bar')).toBeTruthy();
});

test('applies truncate class', async ({ mount }) => {
    const navigateStub = sinon.stub();
    const useHrefStub = sinon.stub().returns('/resolved/truncate');

    const component = await mount(
        <RouterProvider navigate={navigateStub} useHref={useHrefStub}>
            <div style={{ width: 100 }}>
                <Link href="/truncate" truncate>
                    Truncated Link With A Very Long Text That Should Be Truncated
                </Link>
            </div>
        </RouterProvider>,
    );

    await expect(component.locator('a')).toHaveClass(/truncate/);
});
