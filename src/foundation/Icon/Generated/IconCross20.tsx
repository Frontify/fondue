import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconCross20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconCross20"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="m9.997 11.06 4.597 4.597a.75.75 0 1 0 1.06-1.06L11.058 10l4.596-4.596a.75.75 0 0 0-1.06-1.06L9.997 8.938 5.755 4.697a.75.75 0 0 0-1.061 1.06L8.937 10l-4.243 4.243a.75.75 0 1 0 1.06 1.06l4.243-4.242Z"
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

const Memo = memo(IconCross20);
export default Memo;
