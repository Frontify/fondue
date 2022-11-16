import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPolygon20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPolygon20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m10 1.9.45.338 7.207 5.406.415.31-.145.5-2.62 9.008-.158.54H4.85l-.158-.54-2.62-9.009-.145-.498.415-.311L9.55 2.238l.45-.337ZM3.658 8.533l2.318 7.97h8.047l2.319-7.97L10 3.776 3.658 8.532Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPolygon20);
