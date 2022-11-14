import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTriangle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTriangle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16 6a1 1 0 0 1 .876.518l11 20A1 1 0 0 1 27 28H5a1 1 0 0 1-.876-1.482l11-20A1 1 0 0 1 16 6ZM6.691 26H25.31L16 9.075 6.691 26Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTriangle32);
