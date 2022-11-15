import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconArrowMove20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconArrowMove20"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M6.995 5.03a.75.75 0 0 1 0-1.06L9.47 1.495l.53-.53.53.53 2.475 2.475a.75.75 0 0 1-1.06 1.06L10.75 3.837V9.25h5.414l-1.195-1.194a.75.75 0 1 1 1.061-1.06l2.475 2.474.53.53-.53.53-2.475 2.476a.75.75 0 0 1-1.06-1.061l1.194-1.195H10.75v5.415l1.194-1.195a.75.75 0 0 1 1.061 1.06l-2.475 2.476-.53.53-.53-.53-2.475-2.475a.75.75 0 1 1 1.06-1.06l1.195 1.194V10.75H3.836l1.194 1.195a.75.75 0 0 1-1.06 1.06l-2.475-2.474-.53-.53.53-.53L3.97 6.994a.75.75 0 0 1 1.06 1.06L3.836 9.25H9.25V3.836L8.055 5.031a.75.75 0 0 1-1.06 0Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="prefix__a">
                        <path fill="#fff" d="M0 0h20v20H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconArrowMove20);
