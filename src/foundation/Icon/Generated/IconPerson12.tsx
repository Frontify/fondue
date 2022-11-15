import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPerson12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPerson12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.475 3.391c0 .737-.628 1.392-1.475 1.392-.847 0-1.475-.655-1.475-1.392C4.525 2.655 5.153 2 6 2c.847 0 1.475.655 1.475 1.391Zm.027 1.9a2.36 2.36 0 0 0 .973-1.9C8.475 2.071 7.367 1 6 1S3.525 2.07 3.525 3.391c0 .775.381 1.464.972 1.9A4.001 4.001 0 0 0 2 9v2h8V9a4.001 4.001 0 0 0-2.498-3.708ZM9 9v1H3V9a3 3 0 0 1 6 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPerson12);
