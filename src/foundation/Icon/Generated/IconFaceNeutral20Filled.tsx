import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFaceNeutral20Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFaceNeutral20Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM7.075 9.1a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Zm6.975-1.125a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM6.204 12.5a.75.75 0 0 0 0 1.5h7.606a.75.75 0 0 0 0-1.5H6.204Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFaceNeutral20Filled);
