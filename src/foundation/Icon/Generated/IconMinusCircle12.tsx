import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMinusCircle12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMinusCircle12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#MinusCircle12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0Zm1 0A6 6 0 1 1 0 6a6 6 0 0 1 12 0ZM2.75 6a.5.5 0 0 0 .5.5h5.5a.5.5 0 0 0 0-1h-5.5a.5.5 0 0 0-.5.5Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="MinusCircle12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconMinusCircle12);
