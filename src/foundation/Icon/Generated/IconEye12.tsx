import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconEye12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconEye12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#Eye12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M10.88 6.556C10.069 7.89 8.483 9.75 6.039 9.75c-2.445 0-4.031-1.86-4.843-3.194a1.055 1.055 0 0 1 0-1.112C2.007 4.11 3.593 2.25 6.038 2.25c2.444 0 4.03 1.86 4.843 3.194.21.347.21.765 0 1.112Zm-10.54.52a2.055 2.055 0 0 1 0-2.152c.854-1.401 2.7-3.674 5.698-3.674s4.843 2.273 5.697 3.674a2.055 2.055 0 0 1 0 2.152c-.854 1.401-2.7 3.674-5.697 3.674-2.998 0-4.844-2.273-5.698-3.674Zm5.268.506a1.639 1.639 0 0 1-1.18-2.007.496.496 0 0 0-.353-.61.504.504 0 0 0-.614.354c-.384 1.412.467 2.854 1.885 3.228 1.417.375 2.885-.454 3.268-1.866.384-1.412-.467-2.854-1.884-3.228a2.689 2.689 0 0 0-1.38 0 .498.498 0 1 0 .252.965 1.68 1.68 0 0 1 .865 0 1.639 1.639 0 0 1 1.18 2.007 1.666 1.666 0 0 1-2.04 1.157Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="Eye12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconEye12);
