import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconColorFan20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconColorFan20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.5 15v2a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5Zm0-2.12L5.664 7.4H5.5V4a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5v8.88ZM7 5.086l.788-1.365a2 2 0 0 1 2.732-.733l2.232 1.289a2 2 0 0 1 .732 2.732l-.206.356.367-.211a2 2 0 0 1 2.732.732l1.288 2.232a2 2 0 0 1-.732 2.732l-.26.15H17a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.086Zm9.183 6.465L13.673 13H6.519l7.876-4.547a.5.5 0 0 1 .683.183l1.288 2.232a.5.5 0 0 1-.183.683ZM10.68 8.865l-6.195 3.577 4.602-7.971a.5.5 0 0 1 .683-.184l2.232 1.289a.5.5 0 0 1 .183.683L10.68 8.865Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconColorFan20);
