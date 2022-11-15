import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconButton24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconButton24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 6.5h14A1.5 1.5 0 0 1 20.5 8v4a1.5 1.5 0 0 1-1.312 1.488l1.469 1.013A2.997 2.997 0 0 0 22 12V8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h4v-1.5H5A1.5 1.5 0 0 1 3.5 12V8A1.5 1.5 0 0 1 5 6.5Zm6.717 3.67a.75.75 0 0 0-1.175.618l-.01 8.588a.75.75 0 0 0 1.321.488l2.603-3.048 3.987-.412a.75.75 0 0 0 .348-1.364l-7.074-4.87Zm1.793 5.444-1.475 1.727.005-5.127 4.223 2.907-2.26.234a.75.75 0 0 0-.493.259Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconButton24);
