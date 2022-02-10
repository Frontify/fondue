import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconMoneyCircle24Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMoneyCircle24Filled"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm.61-5.19v1.44h-1.362v-1.467c-1.245-.222-2.114-.997-2.373-2.257l1.517-.415c.09.761.83 1.246 1.699 1.246.83 0 1.335-.47 1.335-1.246 0-.883-.821-1.11-1.756-1.369-1.234-.342-2.665-.738-2.665-2.77 0-1.454.881-2.478 2.243-2.755V5.75h1.361v1.44c1.258.193 2.127.982 2.373 2.118l-1.556.484c-.13-.678-.674-1.135-1.465-1.135-.765 0-1.232.388-1.232 1.121 0 .883.817 1.113 1.746 1.375 1.227.345 2.65.746 2.65 2.778 0 1.523-1.011 2.644-2.516 2.88Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconMoneyCircle24Filled);
export default Memo;
