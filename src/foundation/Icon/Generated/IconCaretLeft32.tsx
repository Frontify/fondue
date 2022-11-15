import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCaretLeft32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCaretLeft32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M21.442 25.784a1 1 0 0 1-1.414 0l-9.07-9.07-.707-.707.707-.707 9.084-9.084a1 1 0 1 1 1.414 1.414l-8.377 8.377 8.363 8.363a1 1 0 0 1 0 1.414Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCaretLeft32);
