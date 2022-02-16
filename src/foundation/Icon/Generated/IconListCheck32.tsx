import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconListCheck32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconListCheck32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M28 7.667a1 1 0 0 1-1 1H15.667a1 1 0 1 1 0-2H27a1 1 0 0 1 1 1ZM14.667 24.333a1 1 0 0 1 1-1h8.666a1 1 0 1 1 0 2h-8.666a1 1 0 0 1-1-1ZM25.333 13.19a1 1 0 0 1-1 1h-8.666a1 1 0 1 1 0-2h8.666a1 1 0 0 1 1 1ZM28 18.738a1 1 0 0 1-1 1H15.667a1 1 0 1 1 0-2H27a1 1 0 0 1 1 1ZM7.52 12.08l-1.288-1.515a1 1 0 1 0-1.524 1.296l1.982 2.33a1.267 1.267 0 0 0 2.079-.217l3.104-5.732a1 1 0 0 0-1.758-.953L7.52 12.08ZM6 19.333v4h4v-4H6Zm-.667-2c-.736 0-1.333.597-1.333 1.334V24c0 .736.597 1.333 1.333 1.333h5.334c.736 0 1.333-.597 1.333-1.333v-5.333c0-.737-.597-1.334-1.333-1.334H5.333Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconListCheck32);
export default Memo;
