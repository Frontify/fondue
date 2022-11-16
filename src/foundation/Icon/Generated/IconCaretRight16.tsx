import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCaretRight16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCaretRight16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.785 2.132a.5.5 0 0 1 .707 0l5.516 5.515.353.354-.353.353-5.514 5.514a.5.5 0 1 1-.707-.707L9.947 8 4.785 2.839a.5.5 0 0 1 0-.707Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCaretRight16);
