import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMoneyCircle16Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconMoneyCircle16Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 14.667A6.667 6.667 0 1 0 8 1.334a6.667 6.667 0 0 0 0 13.333Zm.406-3.46v.96h-.908v-.979c-.83-.147-1.409-.664-1.582-1.504l1.012-.277c.06.508.553.831 1.132.831.553 0 .89-.314.89-.83 0-.59-.547-.74-1.17-.913-.823-.228-1.777-.492-1.777-1.847 0-.969.588-1.652 1.495-1.836v-.979h.908v.96c.838.13 1.418.655 1.582 1.412l-1.037.323c-.087-.452-.45-.757-.977-.757-.51 0-.822.259-.822.748 0 .589.545.742 1.164.916.818.23 1.767.498 1.767 1.852 0 1.016-.674 1.763-1.677 1.92Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMoneyCircle16Filled);
export default Memo;
