import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCardLayoutMedium24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconCardLayoutMedium24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 6.5h3v5H3.5V8A1.5 1.5 0 0 1 5 6.5Zm4.5 5v-5h5v5h-5Zm6.5 0h4.5V8A1.5 1.5 0 0 0 19 6.5h-3v5ZM3.5 13v3A1.5 1.5 0 0 0 5 17.5h14a1.5 1.5 0 0 0 1.5-1.5v-3h-17ZM22 13v3a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCardLayoutMedium24);
