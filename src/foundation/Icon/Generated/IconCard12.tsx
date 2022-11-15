import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCard12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCard12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M2.5 1h7a.5.5 0 0 1 .5.5V4H2V1.5a.5.5 0 0 1 .5-.5ZM2 5v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V5H2ZM1 1.5A1.5 1.5 0 0 1 2.5 0h7A1.5 1.5 0 0 1 11 1.5v9A1.5 1.5 0 0 1 9.5 12h-7A1.5 1.5 0 0 1 1 10.5v-9Zm2 5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3.5 8a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z"
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
export default memo(IconCard12);
