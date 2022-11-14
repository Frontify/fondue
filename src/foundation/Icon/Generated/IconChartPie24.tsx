import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconChartPie24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconChartPie24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.467 12.75a8.5 8.5 0 1 1-9.229-9.216v9.216h9.23Zm0-1.5h-7.729V3.532a8.502 8.502 0 0 1 7.73 7.718ZM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconChartPie24);
