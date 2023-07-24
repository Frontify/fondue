import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconExclamationMarkTriangle12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconExclamationMarkTriangle12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#ExclamationMarkTriangle12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M7.759 1.697C7.002.3 4.998.3 4.24 1.697L.26 9.047C-.462 10.38.503 12 2.018 12h7.964c1.515 0 2.48-1.62 1.758-2.953l-3.98-7.35Zm-2.638.476a1 1 0 0 1 1.758 0l3.982 7.35A1 1 0 0 1 9.98 11H2.019a1 1 0 0 1-.879-1.476l3.982-7.35ZM6 3.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5ZM6.75 9a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="ExclamationMarkTriangle12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconExclamationMarkTriangle12);
