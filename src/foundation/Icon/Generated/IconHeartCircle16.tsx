import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconHeartCircle16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconHeartCircle16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Zm1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-9.96-.388c-.097-.417-.041-.817.405-1.263.289-.29.492-.34.6-.347.126-.01.279.026.464.133.187.109.359.262.491.404a2.622 2.622 0 0 1 .176.209l.004.006a1 1 0 0 0 1.64 0l.004-.006.032-.042c.031-.04.08-.099.144-.167a2.24 2.24 0 0 1 .491-.404c.185-.107.338-.143.463-.133.109.008.312.058.601.347.446.446.502.846.404 1.263-.117.5-.48 1.076-1.019 1.669a11.958 11.958 0 0 1-1.637 1.46c-.109.082-.21.156-.303.221-.093-.065-.194-.14-.303-.22A11.957 11.957 0 0 1 6.06 9.28c-.539-.593-.902-1.17-1.02-1.669ZM8 6.182s.27-.392.707-.723c.614-.465 1.557-.815 2.556.183C14.059 8.44 8 12.167 8 12.167S1.94 8.44 4.737 5.642c.999-.998 1.942-.648 2.556-.183.438.332.707.722.707.722Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconHeartCircle16);
