import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlay32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlay32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.002 7.658c0-1.506 1.601-2.472 2.933-1.77l15.825 8.343c1.423.75 1.423 2.788 0 3.538L8.935 26.112c-1.332.702-2.933-.264-2.933-1.77V7.658ZM23.827 16 8.002 7.658v16.684L23.827 16Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlay32);
