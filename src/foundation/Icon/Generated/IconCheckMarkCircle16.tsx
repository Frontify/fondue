import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckMarkCircle16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCheckMarkCircle16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Zm1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-3.58-1.756a.5.5 0 0 0-.707-.707L6.878 9.372l-1.591-1.59a.5.5 0 1 0-.707.707l1.944 1.944.354.354.353-.354 4.19-4.189Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckMarkCircle16);
