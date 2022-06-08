import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconTriangle16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconTriangle16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 1.5a.5.5 0 0 1 .435.254l6.5 11.5A.5.5 0 0 1 14.5 14h-13a.5.5 0 0 1-.435-.746l6.5-11.5A.5.5 0 0 1 8 1.5ZM2.357 13h11.286L8 3.016 2.357 13Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTriangle16);
export default Memo;
