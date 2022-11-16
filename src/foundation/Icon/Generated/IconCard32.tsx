import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCard32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCard32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 5h12a2 2 0 0 1 2 2v4H8V7a2 2 0 0 1 2-2Zm-2 8v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V13H8ZM6 7a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V7Zm5 10a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCard32);
