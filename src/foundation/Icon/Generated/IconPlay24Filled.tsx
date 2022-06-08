import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconPlay24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPlay24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M4.64 19.152V4.77a1 1 0 0 1 1.497-.868l12.626 7.226a1 1 0 0 1-.004 1.738L6.133 20.022a1 1 0 0 1-1.493-.87Z"
            />
        </svg>
    );
}

const Memo = memo(IconPlay24Filled);
export default Memo;
