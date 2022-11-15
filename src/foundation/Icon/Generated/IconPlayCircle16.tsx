import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlayCircle16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconPlayCircle16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Zm1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM7.182 4.85a1 1 0 0 0-1.554.833v4.657a1 1 0 0 0 1.536.845l3.582-2.275a1 1 0 0 0 .018-1.677L7.182 4.85Zm-.554 5.49V5.683l3.582 2.383-3.582 2.274Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlayCircle16);
