import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconCrop32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconCrop32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9 4a1 1 0 0 1 1 1v3h9.5c.873 0 1.688.249 2.378.679l3.386-3.386a1 1 0 1 1 1.414 1.414l-3.38 3.38c.445.697.702 1.525.702 2.413V22h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3h-9.5A4.5 4.5 0 0 1 8 19.5V10H5a1 1 0 0 1 0-2h3V5a1 1 0 0 1 1-1Zm11.392 6.164A2.493 2.493 0 0 0 19.5 10H10v9.5c0 .321.06.629.171.91a1.01 1.01 0 0 1 .122-.146l10.1-10.1ZM11.543 21.81a.969.969 0 0 0 .164-.132L21.82 11.565c.117.29.181.605.181.935V22h-9.5a2.48 2.48 0 0 1-.957-.19Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconCrop32);
