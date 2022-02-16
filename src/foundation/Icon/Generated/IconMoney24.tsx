import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMoney24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconMoney24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M12.975 22v-2.303C15.382 19.32 17 17.526 17 15.09c0-5.715-7.033-3.367-7.033-6.645 0-1.174.747-1.794 1.97-1.794 1.266 0 2.138.731 2.345 1.816l2.49-.775c-.394-1.816-1.784-3.078-3.797-3.389V2h-2.178v2.348c-2.179.443-3.59 2.082-3.59 4.407 0 5.714 7.075 3.345 7.075 6.623 0 1.24-.809 1.993-2.137 1.993-1.39 0-2.572-.775-2.718-1.993L7 16.042c.415 2.016 1.805 3.256 3.797 3.61V22h2.178Z"
            />
        </svg>
    );
}

const Memo = memo(IconMoney24);
export default Memo;
