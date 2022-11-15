import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLollipop12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLollipop12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M9 8.333V4a3 3 0 0 0-6 0v4.333c0 .369.298.667.667.667h4.666A.667.667 0 0 0 9 8.333ZM3.667 10H4.5v.5a1.5 1.5 0 0 0 3 0V10h.833C9.253 10 10 9.254 10 8.333V4a4 4 0 1 0-8 0v4.333C2 9.253 2.746 10 3.667 10Zm1.833.5V10h1v.5a.5.5 0 0 1-1 0ZM5 3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4A.5.5 0 0 1 5 3Zm2 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4A.5.5 0 0 1 7 3Z"
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
export default memo(IconLollipop12);
