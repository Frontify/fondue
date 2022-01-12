import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconDownloadAlternative(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconDownloadAlternative"
            {...props}
        >
            <path d="M11.286 14.017V7.845c0-.393.32-.711.714-.711.397 0 .714.318.714.711v6.181l1.818-1.817a.716.716 0 0 1 1.008.001c.281.281.28.73.002 1.009l-3.034 3.033a.71.71 0 0 1-.501.207.701.701 0 0 1-.506-.207L8.468 13.22a.716.716 0 0 1 .001-1.009c.281-.28.73-.28 1.009-.001l1.808 1.808ZM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm0-1.429A8.571 8.571 0 1 0 12 3.43a8.571 8.571 0 0 0 0 17.142Z" />
        </svg>
    );
}

const Memo = memo(IconDownloadAlternative);
export default Memo;
