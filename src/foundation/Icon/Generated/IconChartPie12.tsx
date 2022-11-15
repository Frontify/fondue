import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconChartPie12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconChartPie12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M10.975 6.5a5 5 0 1 1-5.487-5.474V6.5h5.487Zm0-1H6.488V1.024A5.002 5.002 0 0 1 10.975 5.5ZM12 6A6 6 0 1 1 0 6a6 6 0 0 1 12 0Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="prefix__a">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconChartPie12);
