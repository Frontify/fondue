import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCaretRight12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCaretRight12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.321 1.204a.5.5 0 0 1 .707 0l4.444 4.444.353.353-.353.354-4.442 4.441a.5.5 0 1 1-.707-.707L7.41 6.001l-4.09-4.09a.5.5 0 0 1 0-.707Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCaretRight12);
