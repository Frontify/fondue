import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCardLayoutMedium12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconCardLayoutMedium12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.5 3h2.25v3H1V3.5a.5.5 0 0 1 .5-.5Zm3.25-1H1.5A1.5 1.5 0 0 0 0 3.5v5A1.5 1.5 0 0 0 1.5 10h9A1.5 1.5 0 0 0 12 8.5v-5A1.5 1.5 0 0 0 10.5 2H4.75Zm2.5 1h-2.5v3h2.5V3Zm1 3H11V3.5a.5.5 0 0 0-.5-.5H8.25v3ZM1 7v1.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7H1Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCardLayoutMedium12);
