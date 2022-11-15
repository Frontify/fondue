import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCaretLeft12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCaretLeft12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8.68 10.796a.5.5 0 0 1-.708 0L3.53 6.353l-.354-.354.354-.353 4.44-4.442a.5.5 0 1 1 .707.707L4.589 6l4.09 4.09a.5.5 0 0 1 0 .707Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCaretLeft12);
