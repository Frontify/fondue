import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconCollapse(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconCollapse"
            {...props}
        >
            <path d="M8.728 13.977H5.812a.76.76 0 0 1-.564-.24.816.816 0 0 1-.234-.593c0-.225.078-.417.234-.577a.76.76 0 0 1 .564-.239h4.86c.104 0 .206.02.304.062a.987.987 0 0 1 .269.169c.07.082.124.174.165.274.04.101.06.204.06.31v4.966a.794.794 0 0 1-.234.577.76.76 0 0 1-.564.24.781.781 0 0 1-.581-.24.794.794 0 0 1-.235-.577v-2.961L4.39 20.752a.785.785 0 0 1-.582.248.785.785 0 0 1-.581-.248.842.842 0 0 1-.226-.585.81.81 0 0 1 .243-.586l5.485-5.604Zm6.544-3.954h2.916c.22 0 .408.08.564.24.156.159.234.357.234.593a.794.794 0 0 1-.234.577.76.76 0 0 1-.564.239h-4.86a.776.776 0 0 1-.304-.062.76.76 0 0 1-.252-.169.84.84 0 0 1-.243-.585V5.891c0-.225.079-.417.235-.577a.76.76 0 0 1 .564-.24c.231 0 .425.08.581.24.157.16.235.352.235.577v2.961l5.485-5.604A.73.73 0 0 1 20.193 3c.226 0 .42.083.581.248.15.166.226.36.226.585a.81.81 0 0 1-.243.586l-5.485 5.604Z" />
        </svg>
    );
}

const Memo = memo(IconCollapse);
export default Memo;
