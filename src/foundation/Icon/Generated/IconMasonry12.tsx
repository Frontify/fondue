import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconMasonry12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconMasonry12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.998 2H10.5a.5.5 0 0 1 .5.5v3.001H4.998V2Zm-1 0H1.5a.5.5 0 0 0-.5.5v3.001h2.998V2ZM1 6.501V9.5a.5.5 0 0 0 .5.5h5.516V6.501H1ZM8.016 10H10.5a.5.5 0 0 0 .5-.5V6.501H8.016V10ZM0 2.5A1.5 1.5 0 0 1 1.5 1h9A1.5 1.5 0 0 1 12 2.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 0 9.5v-7Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconMasonry12);
