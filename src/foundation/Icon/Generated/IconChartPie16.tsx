import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconChartPie16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconChartPie16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.98 8.5a6 6 0 1 1-6.492-6.478V8.5h6.491Zm0-1H8.488V2.02A6.001 6.001 0 0 1 13.98 7.5ZM15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconChartPie16);
