import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMasonry24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMasonry24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5 5.5h4v6H3.5V7A1.5 1.5 0 0 1 5 5.5Zm5.5 6v-6H19A1.5 1.5 0 0 1 20.5 7v4.5h-10Zm-7 1.5v4A1.5 1.5 0 0 0 5 18.5h8.5V13h-10ZM15 13v5.5h4a1.5 1.5 0 0 0 1.5-1.5v-4H15ZM2 7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMasonry24);
