import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconRuler32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconRuler32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 16V5h5v3h-2a1 1 0 1 0 0 2h2v2h-2a1 1 0 1 0 0 2h2v2H9Zm-2 0V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v11h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H16v2a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-2H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h2Zm2 9h5v2H9v-2Zm18-2H5v-5h2v2a1 1 0 1 0 2 0v-2h2v2a1 1 0 1 0 2 0v-2h2v2a1 1 0 1 0 2 0v-2h2v2a1 1 0 1 0 2 0v-2h2v2a1 1 0 1 0 2 0v-2h2v5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconRuler32);
