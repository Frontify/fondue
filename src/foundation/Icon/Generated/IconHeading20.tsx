import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconHeading20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconHeading20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.024 5.012v7.875h1.485V9.614h2.925v3.273h1.485V5.012H7.434v3.252H4.509V5.012H3.024ZM13.129 6.07v6.817h1.44V5.012H11.97l-1.609 3.555h1.508l1.058-2.497h.202ZM2.779 14.5a.75.75 0 0 0 0 1.5h14.467a.75.75 0 0 0 0-1.5H2.78Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconHeading20);
