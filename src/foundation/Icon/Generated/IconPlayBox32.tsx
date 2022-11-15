import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPlayBox32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPlayBox32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 8h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Zm-4 2a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V10Zm10.544.683a1 1 0 0 0-1.495.869v9.084a1 1 0 0 0 1.502.866l7.905-4.583a1 1 0 0 0-.006-1.734l-7.906-4.502Zm5.404 5.379L14.049 18.9v-5.629l4.899 2.79Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPlayBox32);
