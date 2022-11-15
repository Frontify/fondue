import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconChartPie20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconChartPie20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M17.463 10.75a7.501 7.501 0 1 1-8.225-8.212v8.212h8.225Zm0-1.5h-6.725V2.536a7.502 7.502 0 0 1 6.725 6.714ZM19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconChartPie20);
