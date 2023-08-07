import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconScissors12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconScissors12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#Scissors12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11.932 2.565a.506.506 0 0 1-.173.69l-7.7 4.674c.08.224.123.465.123.717a2.103 2.103 0 0 1-2.092 2.116c-1.155 0-2.092-.947-2.092-2.116 0-1.17.937-2.117 2.092-2.117.549 0 1.048.214 1.421.563L5.311 6l-1.8-1.093c-.373.35-.872.564-1.42.564-1.156 0-2.093-.948-2.093-2.117S.935 1.238 2.09 1.238c1.156 0 2.092.947 2.092 2.116 0 .252-.043.493-.123.716l2.215 1.345 4.975-3.02a.494.494 0 0 1 .683.17ZM2.09 4.471A1.104 1.104 0 0 1 .998 3.354c0-.628.5-1.116 1.092-1.116.592 0 1.092.488 1.092 1.116 0 .628-.5 1.117-1.092 1.117Zm0 5.291A1.104 1.104 0 0 1 .998 8.646c0-.628.5-1.117 1.092-1.117.592 0 1.092.489 1.092 1.117 0 .627-.5 1.116-1.092 1.116Zm6.608-2.828.039-.024 3.022 1.835a.506.506 0 0 1 .172.69.494.494 0 0 1-.682.17l-3.476-2.11.925-.56Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="Scissors12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconScissors12);
