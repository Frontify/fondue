import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconLightning12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLightning12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#prefix__a)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M1.741 7.93C.86 7.929.418 6.845 1.043 6.21L6.863.302c.743-.755 1.98.029 1.64 1.039l-.868 2.573h2.622c.884 0 1.326 1.086.701 1.72L4.984 11.7c-.745.757-1.986-.034-1.638-1.045l.933-2.717-2.538-.007Zm5.823-6.916-5.82 5.91 3.234.009.697.002-.23.667-1.162 3.385 5.974-6.066h-4.01l.224-.667 1.093-3.24Z"
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
export default memo(IconLightning12);
