import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCaretDown16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCaretDown16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.868 4.785a.5.5 0 0 1 0 .707l-5.515 5.516-.354.353-.353-.353-5.514-5.514a.5.5 0 0 1 .707-.707L8 9.947l5.162-5.162a.5.5 0 0 1 .707 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCaretDown16);
