import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDroplet12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDroplet12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M9.5 7.846C9.5 9.514 8.01 11 6 11S2.5 9.514 2.5 7.846c0-1.975.97-3.717 2.026-5.018a13.082 13.082 0 0 1 1.436-1.503L6 1.292l.038.033c.392.35.914.86 1.436 1.503C8.529 4.128 9.5 5.87 9.5 7.846ZM6.586.81Zm-1.172 0ZM10.5 7.846C10.5 10.14 8.485 12 6 12s-4.5-1.86-4.5-4.154C1.5 3.244 6 0 6 0s4.5 3.244 4.5 7.846ZM5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
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
export default memo(IconDroplet12);
