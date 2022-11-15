import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLockOpen12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLockOpen12Filled"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M4.693 1.41c.138-.161.395-.278.712-.345.303-.064.579-.066.661-.065h.013l.062.001A1.86 1.86 0 0 1 8 2.861V4H2.5A1.5 1.5 0 0 0 1 5.5v5A1.5 1.5 0 0 0 2.5 12h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 9.5 4H9V2.86A2.86 2.86 0 0 0 6.14.002h-.059c-.119-.002-.478 0-.883.086-.39.082-.913.26-1.266.675a4.804 4.804 0 0 0-.303.384 1.04 1.04 0 0 0-.098.18.528.528 0 0 0-.02.072l-.003.015-.002.008v.006c0 .001-.001.002.494.073l-.495-.07a.5.5 0 0 0 .948.282l.002-.003c.026-.038.091-.126.238-.298ZM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
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
export default memo(IconLockOpen12Filled);
