import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLink20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconLink20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1 10a4.25 4.25 0 0 1 4.25-4.25h2a.75.75 0 0 1 0 1.5h-2a2.75 2.75 0 0 0 0 5.5h2a.75.75 0 0 1 0 1.5h-2A4.25 4.25 0 0 1 1 10Zm18 0a4.25 4.25 0 0 1-4.25 4.25h-2a.75.75 0 0 1 0-1.5h2a2.75 2.75 0 1 0 0-5.5h-2a.75.75 0 0 1 0-1.5h2A4.25 4.25 0 0 1 19 10ZM7.25 9.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLink20);
