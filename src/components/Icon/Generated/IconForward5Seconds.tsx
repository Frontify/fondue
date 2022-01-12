import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconForward5Seconds(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconForward5Seconds"
            {...props}
        >
            <path d="M11.35 19.561a.85.85 0 0 0 0-1.7h-4.5a2.15 2.15 0 0 1-2.15-2.15v-4a2.15 2.15 0 0 1 2.15-2.15h3.428l-1.712 1.712a.711.711 0 0 0 .002 1.008.716.716 0 0 0 1.009.002l3.033-3.034a.701.701 0 0 0 .207-.505.71.71 0 0 0-.207-.502L9.577 5.21a.711.711 0 0 0-1.01.001.716.716 0 0 0 0 1.009l1.64 1.642H6.85a3.85 3.85 0 0 0-3.845 3.652L3 11.711v4a3.85 3.85 0 0 0 3.85 3.85ZM18.289 16.165c-1.364 0-2.497-.737-2.706-1.815l1.353-.374c.198.572.748.913 1.375.913.836 0 1.375-.594 1.375-1.375 0-.836-.572-1.408-1.408-1.408-.55 0-1.012.253-1.21.693h-1.221V8.3h4.917v1.298h-3.597v1.859c.253-.33.77-.627 1.54-.627 1.463 0 2.475 1.056 2.475 2.563 0 1.617-1.199 2.772-2.893 2.772Z" />
        </svg>
    );
}

const Memo = memo(IconForward5Seconds);
export default Memo;
