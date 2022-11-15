import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowDown16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconArrowDown16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.01 9.25a.5.5 0 1 0-.707-.707L8.5 12.347V2.24a.5.5 0 0 0-1 0v10.107L4.836 9.683l-.857-.858-.212-.212-.053-.052-.013-.013-.003-.004h-.001l-.354.353.354-.354a.5.5 0 0 0-.707.707l.353-.353-.353.353v.001l.004.004.013.013.053.052.211.212.858.858 3.517 3.517.354.354.353-.354L13.01 9.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowDown16);
