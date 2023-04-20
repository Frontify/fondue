import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconSquare12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconSquare12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.5 2h-7a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5Zm-7-1A1.5 1.5 0 0 0 1 2.5v7A1.5 1.5 0 0 0 2.5 11h7A1.5 1.5 0 0 0 11 9.5v-7A1.5 1.5 0 0 0 9.5 1h-7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconSquare12);
