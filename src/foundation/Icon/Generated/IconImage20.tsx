import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImage20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconImage20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.23 3.05a1.784 1.784 0 0 0-.563 1.325v11.25c0 .518.188.96.563 1.326.376.366.83.549 1.36.549h12.82c.53 0 .984-.183 1.36-.55a1.78 1.78 0 0 0 .563-1.325V4.375c0-.518-.187-.96-.563-1.326a1.878 1.878 0 0 0-1.36-.549H3.59c-.53 0-.984.183-1.36.55Zm14.826 7.917V4.99c0-.342-.125-.635-.376-.879a1.246 1.246 0 0 0-.901-.366H4.222c-.351 0-.652.122-.902.366s-.376.537-.376.88v6.46l4.599-2.11 5.636 3.735 3.877-2.11Zm0 1.289-4.043 2.08-5.47-3.706-4.599 2.036v2.344c0 .342.125.635.376.879.25.244.551.366.902.366h11.557c.35 0 .65-.122.901-.366.25-.244.376-.537.376-.88v-2.753ZM13.209 10a2.51 2.51 0 0 1-1.819-.732 2.384 2.384 0 0 1-.751-1.773c0-.683.25-1.27.751-1.758a2.51 2.51 0 0 1 1.819-.732 2.51 2.51 0 0 1 1.818.732c.501.489.752 1.075.752 1.758 0 .693-.25 1.284-.752 1.773A2.51 2.51 0 0 1 13.21 10Zm.901-1.611c-.25.244-.55.366-.901.366s-.652-.122-.902-.366a1.2 1.2 0 0 1-.376-.894c0-.342.126-.635.376-.879s.551-.366.902-.366c.35 0 .65.122.901.366.25.244.376.537.376.88a1.2 1.2 0 0 1-.376.893Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconImage20);
export default Memo;
