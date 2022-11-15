import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconExclamationMark32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconExclamationMark32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15 6v13.5a1 1 0 1 0 2 0V6a1 1 0 1 0-2 0Zm1 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconExclamationMark32);
