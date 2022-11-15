import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconButton16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconButton16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3 5h10a1 1 0 0 1 1 1v3a.997.997 0 0 1-.291.705l.83.573C14.827 9.93 15 9.486 15 9V6a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3v-1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm4.79 1.715a.5.5 0 0 0-.784.41L7 13.568a.5.5 0 0 0 .88.325l1.968-2.304 3.015-.312a.5.5 0 0 0 .233-.91L7.79 6.716Zm1.428 4.071L8 12.211l.004-4.134 3.405 2.344-1.863.192a.5.5 0 0 0-.33.173Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconButton16);
