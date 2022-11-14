import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArchive32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconArchive32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2H7Zm20 2h-1v10a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V12H5v-2a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v2ZM8 12h16v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V12Zm5 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconArchive32);
