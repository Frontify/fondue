import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLightningFilled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconLightningFilled"
            {...props}
        >
            <path d="M4.583 13.908h6.353l-2.948 7.29a.583.583 0 0 0 .938.646l11.608-10.806a.583.583 0 0 0-.398-1.01h-6.782l2.788-7.235a.583.583 0 0 0-.952-.627L4.176 12.906a.583.583 0 0 0 .407 1.002Z" />
        </svg>
    );
}

const Memo = memo(IconLightningFilled);
export default Memo;
