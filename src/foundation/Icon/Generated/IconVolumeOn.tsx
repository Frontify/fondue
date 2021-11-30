import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconVolumeOn(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconVolumeOn"
            {...props}
        >
            <path d="M13.747 3.562a1 1 0 0 1 .253.665v15.546a1 1 0 0 1-1.664.748L7.25 16H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.249l5.087-4.52a1 1 0 0 1 1.411.082Zm2.662 1.976a.75.75 0 0 1 1.053-.129C19.642 7.113 20.75 9.33 20.75 12c0 2.67-1.108 4.887-3.288 6.59a.75.75 0 1 1-.924-1.18c1.82-1.424 2.712-3.207 2.712-5.41 0-2.203-.892-3.986-2.712-5.41a.75.75 0 0 1-.129-1.052ZM12.5 5.34 7.82 9.5H5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h2.82l4.68 4.16V5.34Zm3.02 3.083a.75.75 0 0 1 1.057.098c.783.942 1.173 2.112 1.173 3.479s-.39 2.537-1.173 3.48a.75.75 0 1 1-1.154-.96c.55-.661.827-1.49.827-2.52s-.277-1.859-.827-2.52a.75.75 0 0 1 .098-1.057Z" />
        </svg>
    );
}

const Memo = memo(IconVolumeOn);
export default Memo;
