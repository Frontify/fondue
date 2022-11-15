import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBookmark24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconBookmark24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v15.1c0 1.217-1.374 1.927-2.367 1.223L12 17.333l-5.633 3.99C5.374 22.027 4 21.317 4 20.1V5Z"
            />
        </svg>
    );
}
export default memo(IconBookmark24Filled);
