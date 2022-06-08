import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconRocket24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconRocket24"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M18.483 10.806c-1.958 1.958-4.046 3.31-5.65 4.174a22.72 22.72 0 0 1-1.791.87l-2.784-2.784a22.74 22.74 0 0 1 .87-1.792C9.99 9.67 11.344 7.582 13.3 5.625c.829-.829 1.959-1.256 3.188-1.427 1.228-.17 2.439-.068 3.272.06a.103.103 0 0 1 .061.028c.01.009.022.026.027.06.128.834.232 2.045.06 3.273-.17 1.229-.598 2.359-1.426 3.187Zm1.06 1.06a24.677 24.677 0 0 1-2.379 2.089v3.128a.75.75 0 0 1-.344.63l-5.242 3.38c-.964.622-2.187-.276-1.882-1.382l.667-2.42-3.546-3.546-2.42.667c-1.107.305-2.005-.918-1.383-1.882l3.38-5.242a.75.75 0 0 1 .63-.344h3.129a24.677 24.677 0 0 1 2.088-2.38c2.273-2.273 5.922-2.07 7.749-1.788a1.59 1.59 0 0 1 1.342 1.342c.281 1.827.485 5.476-1.789 7.749Zm-7.595 5.224a26.1 26.1 0 0 0 3.716-2.06v1.644l-4.348 2.804.605-2.196a.753.753 0 0 0 .027-.192Zm-4.93-4.93a.754.754 0 0 0-.193.027l-2.195.605 2.803-4.348h1.645a26.094 26.094 0 0 0-2.06 3.716Zm8.353-3.423a1.475 1.475 0 1 0 2.086-2.086 1.475 1.475 0 0 0-2.086 2.086Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="prefix__a">
                        <path fill="#fff" d="M0 0h24v24H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}

const Memo = memo(IconRocket24);
export default Memo;
