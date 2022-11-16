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
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="m6 .023.456 1.023L7.788 4.03l3.027.396 1.034.135-.753.722-2.285 2.19.572 3.19.194 1.08-.942-.563L6 9.605 3.365 11.18l-.942.563.193-1.08.573-3.19-2.285-2.19L.15 4.56l1.034-.135 3.027-.396 1.331-2.983L6 .023Zm0 2.454-.99 2.216-.113.255-.278.037-2.27.296 1.725 1.654.194.185-.048.264-.426 2.374 1.95-1.164L6 8.44l.256.154 1.95 1.164-.427-2.374-.047-.264.194-.185L9.65 5.28l-2.27-.296-.278-.037-.114-.255-.99-2.216Z"
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
export default memo(IconStar12);
