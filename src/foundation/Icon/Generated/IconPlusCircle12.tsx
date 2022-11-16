import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlusCircle12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPlusCircle12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10Zm0 1A6 6 0 1 0 6 0a6 6 0 0 0 0 12ZM3.25 6.5a.5.5 0 0 1 0-1H5.5V3.25a.5.5 0 0 1 1 0V5.5h2.25a.5.5 0 0 1 0 1H6.5v2.25a.5.5 0 0 1-1 0V6.5H3.25Z"
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
export default memo(IconPlusCircle12);
