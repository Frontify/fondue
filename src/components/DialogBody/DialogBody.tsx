/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { DialogBodyProps } from '../../types/dialog';
import { ScrollWrapper } from '@components/ScrollWrapper';
import { ScrollWrapperDirection } from '@components/ScrollWrapper/types';

export const DialogBody = ({
    children,
    maxHeight = 'auto',
    'data-test-id': dataTestId = 'fondue-dialog-body',
}: DialogBodyProps): ReactElement => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        if (contentRef.current && containerRef.current) {
            setIsOverflowing(containerRef.current?.clientHeight > contentRef.current?.clientHeight);
        }
    }, []);

    return (
        <div ref={containerRef} data-test-id={dataTestId} className={isOverflowing ? 'tw-pr-2' : ''}>
            <ScrollWrapper direction={ScrollWrapperDirection.Vertical}>
                <div ref={contentRef} style={{ maxHeight }}>
                    {children}
                </div>
            </ScrollWrapper>
        </div>
    );
};

DialogBody.displayName = 'FondueDialogBody';
