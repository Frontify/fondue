import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconStar12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconStar12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#Star12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="m6 .023.457 1.023L7.788 4.03l3.027.396 1.034.135-.753.722-2.284 2.19.572 3.19.194 1.08-.943-.563L6 9.605 3.365 11.18l-.942.563.194-1.08.572-3.19-2.285-2.19-.753-.722 1.035-.135 3.026-.396 1.332-2.983L6 .023Zm0 2.454-.989 2.216-.114.255-.278.037-2.27.296 1.726 1.654.193.185-.047.264-.426 2.374 1.949-1.164L6 8.44l.257.154 1.949 1.164-.426-2.374-.047-.264.193-.185L9.651 5.28l-2.27-.296-.277-.037-.115-.255L6 2.477Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="Star12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconStar12);
