import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconHeading16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconHeading16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.033 4.014v6.09h1.149V7.572h2.262v2.532h1.148v-6.09H6.444v2.514H4.182V4.014H3.033Zm7.554.818v5.272h1.114v-6.09H9.69l-1.244 2.75h1.166l.817-1.932h.157ZM2.5 11.996a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconHeading16);
