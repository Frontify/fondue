import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDividerSolidInset24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconDividerSolidInset24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18 20.25a.25.25 0 0 0 .25-.25v-4a.75.75 0 0 1 1.5 0v4A1.75 1.75 0 0 1 18 21.75H6A1.75 1.75 0 0 1 4.25 20v-4a.75.75 0 0 1 1.5 0v4c0 .138.112.25.25.25h12Zm0-16.5a.25.25 0 0 1 .25.25v4a.75.75 0 0 0 1.5 0V4A1.75 1.75 0 0 0 18 2.25H6A1.75 1.75 0 0 0 4.25 4v4a.75.75 0 0 0 1.5 0V4A.25.25 0 0 1 6 3.75h12Zm2 8.233a.75.75 0 0 1-.75.75H4.75a.75.75 0 0 1 0-1.5h14.5a.75.75 0 0 1 .75.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconDividerSolidInset24);
