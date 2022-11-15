import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconHeading12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconHeading12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.013 2.002v5.46h1.03v-2.27H4.07v2.27H5.1v-5.46H4.07v2.254H2.043V2.002h-1.03Zm6.773.733v4.727h.998v-5.46H6.982L5.867 4.467h1.045l.733-1.732h.14ZM.5 8.998a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1H.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconHeading12);
