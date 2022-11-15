import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCrossCircle16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCrossCircle16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm-2.828-4.172a.5.5 0 0 1 0-.707L7.292 8l-2.12-2.121a.5.5 0 0 1 .707-.707L8 7.292l2.121-2.12a.5.5 0 1 1 .707.707L8.708 8l2.12 2.121a.5.5 0 1 1-.707.707L8 8.708l-2.121 2.12a.5.5 0 0 1-.707 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCrossCircle16Filled);
