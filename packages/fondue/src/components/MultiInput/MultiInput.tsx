/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, type ReactElement, type ReactNode } from 'react';

export enum MultiInputLayout {
    Columns = 'Columns',
    Spider = 'Spider',
}

export type MultiInputProps = {
    layout: MultiInputLayout;
    spanLastItem?: boolean;
    children: ReactNode;
    'data-test-id'?: string;
};

export const MultiInput = ({
    layout,
    spanLastItem,
    children,
    'data-test-id': dataTestId = 'multi-input',
}: MultiInputProps): ReactElement => {
    const childrenArray = Children.toArray(children);

    return (
        <div data-test-id={dataTestId} className="tw-flex tw-gap-2 tw-w-full tw-flex-col">
            {layout === MultiInputLayout.Columns && (
                <div data-test-id={`${dataTestId}-grid-columns`} className="tw-grid tw-grid-cols-2 tw-gap-2">
                    {childrenArray.map((child, index) => (
                        <div
                            className={spanLastItem && index === childrenArray.length - 1 ? 'tw-col-span-2' : ''}
                            key={index}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            )}
            {layout === MultiInputLayout.Spider && (
                <div data-test-id={`${dataTestId}-grid-spider`} className="tw-grid tw-grid-cols-4 tw-gap-2">
                    {childrenArray[0] && <div className="tw-col-start-2 tw-col-span-2">{childrenArray[0]}</div>}
                    {childrenArray[1] && <div className="tw-col-start-1 tw-col-span-2">{childrenArray[1]}</div>}
                    {childrenArray[2] && <div className="tw-col-start-3 tw-col-span-2">{childrenArray[2]}</div>}
                    {childrenArray[3] && <div className="tw-col-start-2 tw-col-span-2">{childrenArray[3]}</div>}
                </div>
            )}
        </div>
    );
};
MultiInput.displayName = 'FondueMultiInput';
