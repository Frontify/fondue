import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScaleLarge24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconScaleLarge24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.5 5.5H9v13H6.5v-13Zm4 13v-13H14v13h-3.5Zm5 0H19a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 19 5.5h-3.5v13ZM5 5.5A1.5 1.5 0 0 0 3.5 7v10A1.5 1.5 0 0 0 5 18.5v-13ZM2 7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconScaleLarge24);
