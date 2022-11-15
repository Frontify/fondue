import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowMinimize32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArrowMinimize32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18 15h8.5a1 1 0 1 0 0-2h-6.086l6.793-6.793a1 1 0 0 0-1.414-1.414L19 11.586V5.5h-1 1a1 1 0 1 0-2 0h1-1V15h1ZM4.793 27.207a1 1 0 0 1 0-1.414L11.586 19H5.5a1 1 0 1 1 0-2H15v9.5h-2v-6.087l-6.793 6.793a1 1 0 0 1-1.414 0ZM14 26.5h1a1 1 0 1 1-2 0h1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArrowMinimize32);
