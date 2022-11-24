import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFunnel24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconFunnel24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m14 14 .3-.4 5.47-7.3a.5.5 0 0 0-.4-.8H5.66a.5.5 0 0 0-.401.799l5.444 7.305.297.399v4.847a.5.5 0 0 0 .688.463l2-.814a.5.5 0 0 0 .312-.463V14Zm1.5.5 5.47-7.3c.988-1.32.047-3.2-1.6-3.2H5.66C4.015 4 3.073 5.876 4.056 7.195L9.5 14.5v4.35a2 2 0 0 0 2.754 1.852l2-.813a2 2 0 0 0 1.246-1.853V14.5Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFunnel24);
