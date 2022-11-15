import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTrashBin32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTrashBin32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13 6h6v2h-6V6Zm-2 2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h5a1 1 0 1 1 0 2h-1v14a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V10H6a1 1 0 0 1 0-2h5Zm10 2H9v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10h-2Zm-8 3a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0v-8a1 1 0 0 1 1-1Zm7 1a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTrashBin32);
