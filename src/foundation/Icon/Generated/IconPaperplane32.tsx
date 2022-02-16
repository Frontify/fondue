import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPaperplane32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPaperplane32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m9.946 21.125-6.7-3.61c-.758-.41-.776-1.513-.032-1.948L25.041 2.815c.724-.424 1.625.111 1.625.964v24.442c0 .835-.867 1.371-1.59.984l-7.484-4.008-5.924 3.954c-.72.48-1.676-.044-1.68-.924l-.042-7.102Zm.838-2.06L6.01 16.492l14.634-8.55-9.86 11.123Zm13.71-10.046-5.46 14.441 5.46 2.924V9.02Zm-7.627 14.008-4.718 3.15-.031-5.308 9.704-10.946-4.955 13.104Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPaperplane32);
export default Memo;
