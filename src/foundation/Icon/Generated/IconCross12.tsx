import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCross12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCross12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.171 2.465a.5.5 0 0 0-.707.707L5.293 6 2.465 8.83a.5.5 0 0 0 .707.707L6 6.708l2.828 2.828a.5.5 0 0 0 .707-.707L6.707 6l2.829-2.828a.5.5 0 0 0-.707-.707l-2.83 2.828-2.828-2.828Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCross12);
