/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, PropsWithChildren, cloneElement, isValidElement, useEffect, useState } from 'react';
import { Button } from '@components/Button';

export type ComponentThatMayCrashProps = PropsWithChildren<{ title: string }>;

export const ComponentThatMayCrash = ({ title, children }: ComponentThatMayCrashProps) => {
    const [count, setNewCount] = useState(1);
    const increaseCount = () => {
        setNewCount(count + 1);
    };

    useEffect(() => {
        return () => {
            if (count !== 0) {
                throw new Error('I crashed!');
            }
        };
    }, [count]);

    return (
        <div data-test-id="error-handling" className="tw-p-4 tw-border tw-border-line">
            <div>{title}</div>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) {
                    throw new Error('I crashed');
                }

                return cloneElement(child);
            })}
            <Button onClick={() => increaseCount()}>I create an error in useEffect</Button>
        </div>
    );
};
