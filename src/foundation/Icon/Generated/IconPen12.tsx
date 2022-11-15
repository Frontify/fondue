import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPen12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPen12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M10.703 2.708 9.409 1.414l-.955.955 1.294 1.293.955-.954ZM2.288 8.536l5.46-5.46L9.04 4.37 3.58 9.83l-1.658.364.365-1.658Zm1.793 2.207 7.329-7.328a1 1 0 0 0 0-1.415L10.116.707a1 1 0 0 0-1.414 0L1.374 8.035.946 9.98a1 1 0 0 0 1.192 1.192l1.943-.428Zm3.573-.664a.5.5 0 0 0 0 1h2.965a.5.5 0 1 0 0-1H7.654Z"
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
export default memo(IconPen12);
