import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconBookmark12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconBookmark12Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M1 1.5A1.5 1.5 0 0 1 2.5 0h7A1.5 1.5 0 0 1 11 1.5v9.452a1 1 0 0 1-1.615.788L6 9.1l-3.385 2.64A1 1 0 0 1 1 10.952V1.5Z"
            />
        </svg>
    );
}
export default memo(IconBookmark12Filled);
