import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconGrabHandle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconGrabHandle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM10 16a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm10-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM10 25a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm10-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconGrabHandle32);
