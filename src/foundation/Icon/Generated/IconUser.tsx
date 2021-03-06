import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconUser(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconUser"
            {...props}
        >
            <path d="M16.312 13.184a8.35 8.35 0 0 1 4.349 8.188H4.041a8.35 8.35 0 0 1 4.407-8.22 5.833 5.833 0 0 1-1.891-4.306A5.843 5.843 0 0 1 12.397 3a5.843 5.843 0 0 1 5.84 5.846c0 1.72-.743 3.268-1.925 4.338Zm-1.69 1.068a5.818 5.818 0 0 1-2.225.44c-.804 0-1.57-.163-2.267-.457a6.688 6.688 0 0 0-4.408 5.467H18.98a6.688 6.688 0 0 0-4.358-5.45Zm-2.225-1.23a4.174 4.174 0 0 0 4.172-4.176 4.174 4.174 0 0 0-4.172-4.176 4.174 4.174 0 0 0-4.172 4.176 4.174 4.174 0 0 0 4.172 4.175Z" />
        </svg>
    );
}

const Memo = memo(IconUser);
export default Memo;
