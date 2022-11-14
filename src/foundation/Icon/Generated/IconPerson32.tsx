import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPerson32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPerson32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M19.5 10.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm.03 4.218a5.5 5.5 0 1 0-7.059 0A9.002 9.002 0 0 0 7 23v4h18v-4a9.002 9.002 0 0 0-5.47-8.282ZM16 16a7 7 0 0 0-7 7v2h14v-2a7 7 0 0 0-7-7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPerson32);
