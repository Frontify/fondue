import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconArrowUp(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconArrowUp"
            {...props}
        >
            <path d="M10.98 6.002 5.55 11.43A1.026 1.026 0 1 1 4.1 9.98l7.18-7.18c.4-.4 1.05-.4 1.45 0l7.18 7.18a1.026 1.026 0 0 1-1.45 1.45l-5.43-5.428v15.472a1.026 1.026 0 1 1-2.05 0V6.002Z" />
        </svg>
    );
}

const Memo = memo(IconArrowUp);
export default Memo;
