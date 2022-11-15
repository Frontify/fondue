import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlay24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPlay24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.764 4.553a.25.25 0 0 0-.374.217v14.382a.25.25 0 0 0 .373.217l12.627-7.156a.25.25 0 0 0 0-.434L5.764 4.553ZM3.89 4.77c0-1.344 1.453-2.187 2.62-1.519l12.626 7.226c1.177.674 1.173 2.373-.007 3.041L6.503 20.674c-1.167.661-2.613-.181-2.613-1.522V4.77Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlay24);
