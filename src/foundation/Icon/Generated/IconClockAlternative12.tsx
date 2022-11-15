import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconClockAlternative12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconClockAlternative12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0Zm1 0A6 6 0 1 1 0 6a6 6 0 0 1 12 0Zm-5.011-.336a1 1 0 1 1-1.915.104l-1.34-1.296a.5.5 0 0 1 .696-.719l1.331 1.288a1 1 0 0 1 .46-.026l1.915-1.852a.5.5 0 1 1 .696.72l-1.843 1.78Z"
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
export default memo(IconClockAlternative12);
