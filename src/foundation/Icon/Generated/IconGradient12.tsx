import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconGradient12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconGradient12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1 6v1.586l4.768-4.768a.5.5 0 0 1 .707.707L1.147 8.854A.499.499 0 0 1 1 8.955V9.5a.5.5 0 0 0 .5.5h.086l4.182-4.182a.5.5 0 1 1 .707.707L3 10h1.595a.504.504 0 0 1 .051-.06l1.122-1.122a.5.5 0 0 1 .707.707L6 10h4.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5H5L1 6Zm.5 5h9A1.5 1.5 0 0 0 12 9.5v-7A1.5 1.5 0 0 0 10.5 1h-9A1.5 1.5 0 0 0 0 2.5v7A1.5 1.5 0 0 0 1.5 11Zm2.086-9L1 4.586V2.5a.5.5 0 0 1 .5-.5h2.086Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconGradient12);
