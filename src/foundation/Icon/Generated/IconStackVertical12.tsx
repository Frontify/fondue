import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconStackVertical12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-inline-flex tw-justify-center tw-items-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconStackVertical12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 2h8v1H2V2ZM1 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2Zm9 4H2v1h8V6ZM2 5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2Zm8 5H2v1h8v-1ZM2 9a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H2Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStackVertical12);
export default Memo;
