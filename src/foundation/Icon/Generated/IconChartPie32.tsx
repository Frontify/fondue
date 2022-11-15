import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconChartPie32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconChartPie32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M25.95 17c-.501 5.053-4.765 9-9.95 9-5.523 0-10-4.477-10-10 0-5.181 3.94-9.442 8.988-9.95V17h10.963Zm0-2h-8.962V6.048A10.003 10.003 0 0 1 25.951 15ZM28 16c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconChartPie32);
