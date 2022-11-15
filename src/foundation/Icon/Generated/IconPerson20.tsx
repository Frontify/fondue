import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPerson20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPerson20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.353 6.265a2.265 2.265 0 1 1-4.53 0 2.265 2.265 0 0 1 4.53 0Zm.236 2.814a3.765 3.765 0 1 0-5 0A6.59 6.59 0 0 0 3.5 15.177V18h13.177v-2.823a6.59 6.59 0 0 0-4.088-6.098Zm2.588 6.098V16.5H5v-1.323a5.088 5.088 0 1 1 10.177 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPerson20);
