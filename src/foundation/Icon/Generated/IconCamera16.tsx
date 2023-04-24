import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCamera16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCamera16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4 5h5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM2 6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v1.088l2.678-1.723a.5.5 0 0 1 .77.42v4.43a.5.5 0 0 1-.77.42L11 8.912V10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm9.43 2 2.019 1.298V6.702L11.43 8Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCamera16);
