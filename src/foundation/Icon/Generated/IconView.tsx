import React from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconView(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconView"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.02 12.826a1.644 1.644 0 010-1.652A10.371 10.371 0 0112 6c3.833 0 7.183 2.079 8.98 5.174.296.511.296 1.14 0 1.652A10.371 10.371 0 0112 18a10.371 10.371 0 01-8.98-5.174zm19.706-1.553c.22.46.22.994 0 1.454A11.876 11.876 0 0112 19.5a11.876 11.876 0 01-10.726-6.773 1.69 1.69 0 010-1.454A11.876 11.876 0 0112 4.5c4.732 0 8.818 2.768 10.726 6.773zM16 12a4 4 0 11-7.839-1.129c.122-.413.607-.551.98-.336.347.2.465.637.396 1.031a2.5 2.5 0 101.732-1.958c-.276.085-.58.089-.83-.056-.504-.29-.56-.994-.025-1.225A4 4 0 0116 12z"
            />
        </svg>
    );
}

const MemoIconView = React.memo(IconView);
export default MemoIconView;
