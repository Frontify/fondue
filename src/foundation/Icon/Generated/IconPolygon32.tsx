import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconPolygon32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPolygon32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m16 3.75.6.45 11 8.25.553.415-.193.664-4 13.75-.21.721H8.25l-.21-.72-4-13.75-.193-.665.553-.415 11-8.25.6-.45Zm-9.846 9.885L9.75 26h12.5l3.597-12.365L16 6.25l-9.846 7.385Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconPolygon32);
