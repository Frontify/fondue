import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconEye20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconEye20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.432 10.472c-1.06 1.937-3.484 5.257-7.407 5.257-3.924 0-6.348-3.32-7.407-5.257a.73.73 0 0 1 0-.715C3.677 7.82 6.1 4.5 10.025 4.5c3.923 0 6.348 3.32 7.407 5.257a.73.73 0 0 1 0 .715Zm-16.13.719a2.23 2.23 0 0 1 0-2.153C2.387 7.049 5.193 3 10.024 3c4.83 0 7.636 4.05 8.723 6.038a2.23 2.23 0 0 1 0 2.153c-1.087 1.989-3.893 6.038-8.723 6.038-4.83 0-7.637-4.05-8.724-6.038Zm8.088 1.291A2.451 2.451 0 0 1 7.657 9.48a.75.75 0 1 0-1.449-.388 3.952 3.952 0 1 0 2.794-2.795.75.75 0 0 0 .389 1.449 2.451 2.451 0 1 1 0 4.737Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconEye20);
