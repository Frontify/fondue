import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCheckMarkCircle16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCheckMarkCircle16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.42-8.502a.5.5 0 0 0-.707-.707L6.878 9.626l-1.591-1.59a.5.5 0 0 0-.707.707l1.944 1.944.354.354.353-.354 4.19-4.189Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCheckMarkCircle16Filled);
