import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMasonry32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMasonry32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 8h5v7H5v-5a2 2 0 0 1 2-2Zm7 7V8h11a2 2 0 0 1 2 2v5H14Zm-9 2v5a2 2 0 0 0 2 2h11v-7H5Zm15 0v7h5a2 2 0 0 0 2-2v-5h-7ZM3 10a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V10Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMasonry32);
