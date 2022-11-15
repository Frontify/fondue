import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconTypographyMultiple12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTypographyMultiple12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M0 2h9v1.5a.5.5 0 0 1-1 0V3H5v6h1.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1H4V3H1v.5a.5.5 0 0 1-1 0V2Zm9 3h3v1h-2v4H9V6H7V5h2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconTypographyMultiple12);
