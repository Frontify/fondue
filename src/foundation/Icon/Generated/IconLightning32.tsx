import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLightning32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLightning32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.757 20c-1.779-.006-2.666-2.157-1.408-3.415L18.066 3.868c1.499-1.499 3.993.057 3.307 2.062l-1.965 5.738h5.83c1.78 0 2.673 2.154 1.413 3.414l-13.05 13.05C12.1 29.635 9.6 28.066 10.3 26.059l2.108-6.043L6.757 20ZM19.481 5.282 6.763 18l7.054.02 1.403.004-.462 1.326-2.57 7.367 13.05-13.049h-8.629l.454-1.324 2.418-7.062Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconLightning32);
