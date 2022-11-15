import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCardLayoutMedium16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconCardLayoutMedium16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 5h2v3H2V6a1 1 0 0 1 1-1Zm3-1H3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6Zm4 1H6v3h4V5Zm1 3h3V6a1 1 0 0 0-1-1h-2v3ZM2 9v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9H2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCardLayoutMedium16);
