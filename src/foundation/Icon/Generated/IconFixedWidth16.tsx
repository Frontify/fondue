import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFixedWidth16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFixedWidth16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14 4a.5.5 0 0 0-1 0v8a.5.5 0 0 0 1 0V4Zm-3 4a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5ZM2.5 3.5A.5.5 0 0 1 3 4v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFixedWidth16);
