import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconFunnel20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconFunnel20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m10.822 11.845.3-.4L16.323 4.5H3.141l5.53 6.906.33.412v4.721l1.82-.82v-3.875Zm1.5.499 5.203-6.945c.74-.989.035-2.399-1.2-2.399H3.14C1.882 3 1.183 4.455 1.97 5.438l5.53 6.906v4.195a1.5 1.5 0 0 0 2.115 1.368l1.822-.82a1.5 1.5 0 0 0 .884-1.368v-3.375Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconFunnel20);
