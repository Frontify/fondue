import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBell24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconBell24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 2a2 2 0 0 1 2 2v1.314a6.503 6.503 0 0 1 4.5 6.186v6h.25a.75.75 0 0 1 0 1.5H14v1a2 2 0 1 1-4 0v-1H5.25a.75.75 0 0 1 0-1.5h.25v-6A6.503 6.503 0 0 1 10 5.314V4a2 2 0 0 1 2-2ZM7 17.5h10v-6a5 5 0 0 0-10 0v6Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconBell24);
