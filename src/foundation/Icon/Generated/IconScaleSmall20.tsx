import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScaleSmall20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconScaleSmall20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.5 6.5h-4v7h4v-7Zm1.5 0v7h1.5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H15Zm-11.5 0H8v7H3.5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Zm0-1.5A2.5 2.5 0 0 0 1 7.5v5A2.5 2.5 0 0 0 3.5 15h13a2.5 2.5 0 0 0 2.5-2.5v-5A2.5 2.5 0 0 0 16.5 5h-13Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScaleSmall20);
