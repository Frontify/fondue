import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLightbulb12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLightbulb12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M7.54 6.643a1 1 0 0 0-.504.868v1.551H4.964v-1.55a1 1 0 0 0-.504-.869 3.084 3.084 0 0 1-.384-.26 3 3 0 0 1-1.148-2.358C2.928 2.365 4.292 1 6 1s3.072 1.365 3.072 3.025a3 3 0 0 1-1.148 2.358c-.12.096-.25.183-.384.26ZM3.964 9.062v-1.55a4.083 4.083 0 0 1-.51-.345 4 4 0 0 1-1.526-3.142C1.928 1.802 3.75 0 6 0s4.072 1.802 4.072 4.025a4 4 0 0 1-1.527 3.142c-.16.127-.33.242-.509.344v1.551a1 1 0 0 1-1 1H4.964a1 1 0 0 1-1-1Zm.764 2.01a.5.5 0 0 0 0 1h2.545a.5.5 0 1 0 0-1H4.728Z"
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
export default memo(IconLightbulb12);
