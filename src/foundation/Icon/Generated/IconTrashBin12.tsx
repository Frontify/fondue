import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTrashBin12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTrashBin12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M5 1h2v1H5V1ZM4 2V1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h2.515a.5.5 0 0 1 0 1H10v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3h-.504a.5.5 0 1 1 0-1H4ZM3 3v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3H3Zm1 5.5v-4a.5.5 0 0 1 1 0v4a.5.5 0 0 1-1 0Zm3-4v4a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-1 0Z"
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
export default memo(IconTrashBin12);
