import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconLightningFilled(props: IconProps): React.ReactElement<IconProps> {
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
            <path d="M4.583 13.908h6.353l-2.948 7.29a.583.583 0 00.938.646l11.608-10.806a.583.583 0 00-.398-1.01h-6.782l2.788-7.235a.583.583 0 00-.952-.627L4.176 12.906a.583.583 0 00.407 1.002z" />
        </svg>
    );
}

const MemoIconLightningFilled = React.memo(IconLightningFilled);
export default MemoIconLightningFilled;
