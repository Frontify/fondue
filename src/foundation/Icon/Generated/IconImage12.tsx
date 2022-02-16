import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconImage12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconImage12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1.338 1.83A1.07 1.07 0 0 0 1 2.625v6.75c0 .31.113.576.338.795.226.22.498.33.816.33h7.692c.318 0 .59-.11.816-.33A1.07 1.07 0 0 0 11 9.375v-6.75c0-.31-.113-.576-.338-.795a1.127 1.127 0 0 0-.816-.33H2.154c-.318 0-.59.11-.816.33Zm8.896 4.75V2.994a.71.71 0 0 0-.226-.527.747.747 0 0 0-.54-.22H2.532c-.21 0-.39.073-.541.22a.71.71 0 0 0-.226.527V6.87l2.76-1.266 3.381 2.242 2.327-1.266Zm0 .774L7.808 8.602 4.526 6.378 1.766 7.6v1.406c0 .205.076.38.226.527.15.147.33.22.54.22h6.935c.21 0 .39-.073.541-.22a.71.71 0 0 0 .226-.527V7.354ZM7.925 6c-.427 0-.79-.146-1.09-.44a1.43 1.43 0 0 1-.452-1.063c0-.41.15-.762.451-1.055.3-.293.664-.44 1.091-.44.427 0 .79.147 1.091.44.3.293.451.645.451 1.055 0 .416-.15.77-.45 1.064A1.508 1.508 0 0 1 7.925 6Zm.541-.967a.748.748 0 0 1-.54.22.748.748 0 0 1-.542-.22.72.72 0 0 1-.225-.536.71.71 0 0 1 .225-.527c.15-.147.33-.22.541-.22.21 0 .39.073.541.22a.71.71 0 0 1 .226.527.72.72 0 0 1-.226.536Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconImage12);
export default Memo;
