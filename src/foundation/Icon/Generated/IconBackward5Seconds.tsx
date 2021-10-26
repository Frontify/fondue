import React from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconBackward5Seconds(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconBackward5Seconds"
            {...props}
        >
            <path d="M12.65 19.561a.85.85 0 010-1.7h4.5a2.15 2.15 0 002.15-2.15v-4a2.15 2.15 0 00-2.15-2.15h-3.428l1.712 1.712a.711.711 0 01-.002 1.008.716.716 0 01-1.009.002L11.39 9.249a.701.701 0 01-.207-.505.71.71 0 01.207-.502l3.033-3.033a.711.711 0 011.01.001.716.716 0 010 1.009l-1.64 1.642h3.357a3.85 3.85 0 013.845 3.652l.005.198v4a3.85 3.85 0 01-3.85 3.85zM5.789 16.165c-1.364 0-2.497-.737-2.706-1.815l1.353-.374c.198.572.748.913 1.375.913.836 0 1.375-.594 1.375-1.375 0-.836-.572-1.408-1.408-1.408-.55 0-1.012.253-1.21.693H3.347V8.3h4.917v1.298H4.667v1.859c.253-.33.77-.627 1.54-.627 1.463 0 2.475 1.056 2.475 2.563 0 1.617-1.199 2.772-2.893 2.772z" />
        </svg>
    );
}

const MemoIconBackward5Seconds = React.memo(IconBackward5Seconds);
export default MemoIconBackward5Seconds;
