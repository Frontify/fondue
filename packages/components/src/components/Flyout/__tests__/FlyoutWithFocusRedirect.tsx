/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef } from 'react';

import { Button } from '#/components/Button/Button';

import { Flyout } from '../Flyout';

type FlyoutWithFocusRedirectProps = {
    focusTargetTestId: string;
};

export const FlyoutWithFocusRedirect = ({ focusTargetTestId }: FlyoutWithFocusRedirectProps) => {
    const focusTargetRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <button type="button" ref={focusTargetRef} data-test-id={focusTargetTestId}>
                Focus target
            </button>
            <Flyout.Root>
                <Flyout.Trigger>
                    <Button>Flyout Trigger</Button>
                </Flyout.Trigger>
                <Flyout.Content
                    onCloseAutoFocus={(event) => {
                        event.preventDefault();
                        focusTargetRef.current?.focus();
                    }}
                >
                    <Flyout.Body>Flyout Body</Flyout.Body>
                </Flyout.Content>
            </Flyout.Root>
        </>
    );
};
