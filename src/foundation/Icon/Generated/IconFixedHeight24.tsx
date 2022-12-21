import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFixedHeight24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconFixedHeight24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.752 3.75a.75.75 0 0 1-.75.75H6A.75.75 0 1 1 6 3h12.002a.75.75 0 0 1 .75.75ZM12.002 17a.75.75 0 0 1-.75-.75v-8.5a.75.75 0 0 1 1.5 0v8.5a.75.75 0 0 1-.75.75Zm6 4.003a.75.75 0 1 0 0-1.5H6a.75.75 0 0 0 0 1.5h12.002Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFixedHeight24);
