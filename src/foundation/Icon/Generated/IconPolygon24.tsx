import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPolygon24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPolygon24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m12 2.874.45.338 8.253 6.19.415.31-.145.499-3.001 10.316-.157.54H6.185l-.157-.54-3.001-10.316-.145-.498.415-.312 8.253-6.19.45-.337ZM4.612 10.29l2.699 9.277h9.378l2.699-9.277L12 4.75l-7.388 5.54Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPolygon24);
