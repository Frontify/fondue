import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLabel12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLabel12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M1 5.028V1h4.028a.5.5 0 0 1 .353.146l5.562 5.562a.5.5 0 0 1 0 .707l-3.528 3.528a.5.5 0 0 1-.707 0L1.146 5.38A.5.5 0 0 1 1 5.028Zm-.56 1.06A1.5 1.5 0 0 1 0 5.028V1a1 1 0 0 1 1-1h4.028a1.5 1.5 0 0 1 1.06.44L11.65 6a1.5 1.5 0 0 1 0 2.122L8.122 11.65a1.5 1.5 0 0 1-2.121 0L.439 6.088Zm3.503-2.643a.498.498 0 1 1-.996 0 .498.498 0 0 1 .996 0Zm1 0a1.498 1.498 0 1 1-2.996 0 1.498 1.498 0 0 1 2.996 0Z"
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
export default memo(IconLabel12);
