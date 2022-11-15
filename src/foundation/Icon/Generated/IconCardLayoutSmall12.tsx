import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCardLayoutSmall12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCardLayoutSmall12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.75 4h5.75a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H4.75V4Zm-1-1h6.75A1.5 1.5 0 0 1 12 4.5v3A1.5 1.5 0 0 1 10.5 9h-9A1.5 1.5 0 0 1 0 7.5v-3A1.5 1.5 0 0 1 1.5 3h2.25Zm0 1v4H1.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h2.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCardLayoutSmall12);
