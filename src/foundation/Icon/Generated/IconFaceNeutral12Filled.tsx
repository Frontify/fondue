import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFaceNeutral12Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconFaceNeutral12Filled"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#FaceNeutral12Filled)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12ZM3.75 5.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM9 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM4 8a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H4Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="FaceNeutral12Filled">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconFaceNeutral12Filled);
