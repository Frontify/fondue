import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconMoney32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconMoney32"
            {...props}
        >
            <path
                fill="currentColor"
                d="M17.3 29.333v-3.07c3.21-.503 5.367-2.895 5.367-6.143 0-7.62-9.378-4.49-9.378-8.86 0-1.565.996-2.392 2.628-2.392 1.688 0 2.85.975 3.126 2.422l3.32-1.034c-.526-2.421-2.38-4.105-5.063-4.518V2.667h-2.904v3.13c-2.905.59-4.786 2.776-4.786 5.877 0 7.619 9.433 4.459 9.433 8.83 0 1.653-1.079 2.657-2.85 2.657-1.853 0-3.43-1.033-3.623-2.658l-3.236.887c.553 2.687 2.406 4.34 5.062 4.813v3.13H17.3Z"
            />
        </svg>
    );
}

const Memo = memo(IconMoney32);
export default Memo;
