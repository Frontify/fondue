import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCaretUp12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCaretUp12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.204 8.68a.5.5 0 0 1 0-.708L5.648 3.53 6 3.175l.354.354 4.441 4.442a.5.5 0 1 1-.707.707L6.001 4.589l-4.09 4.09a.5.5 0 0 1-.707 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCaretUp12);
