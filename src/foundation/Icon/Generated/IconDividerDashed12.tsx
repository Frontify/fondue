import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconDividerDashed12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconDividerDashed12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M2.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 2.5 0h7A1.5 1.5 0 0 1 11 1.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 0-.5-.5h-7Zm0 10a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 2.5 12h7a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2a.5.5 0 0 1-.5.5h-7Zm-1-5.5a.5.5 0 0 0 0 1H3a.5.5 0 0 0 0-1H1.5Zm3.25.5a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1h-1.5a.5.5 0 0 1-.5-.5ZM9 5.5a.5.5 0 0 0 0 1h1.5a.5.5 0 0 0 0-1H9Z"
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
export default memo(IconDividerDashed12);
