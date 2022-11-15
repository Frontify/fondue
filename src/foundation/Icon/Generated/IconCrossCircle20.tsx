import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCrossCircle20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCrossCircle20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm0 1.5a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM6.464 6.465a.75.75 0 0 1 1.061 0L10 8.939l2.475-2.474a.75.75 0 1 1 1.06 1.06L11.062 10l2.475 2.475a.75.75 0 1 1-1.061 1.06L10 11.062l-2.475 2.475a.75.75 0 1 1-1.06-1.061L8.938 10 6.464 7.525a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCrossCircle20);
