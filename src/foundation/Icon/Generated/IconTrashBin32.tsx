import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTrashBin32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconTrashBin32"
            {...props}
        >
            <g fill="currentColor">
                <path d="M11.673 13.576a1.212 1.212 0 0 1 2.424 0v9.697a1.212 1.212 0 1 1-2.424 0v-9.697Zm7.272-1.212c-.67 0-1.212.542-1.212 1.212v9.697a1.212 1.212 0 0 0 2.424 0v-9.697c0-.67-.542-1.212-1.212-1.212Z" />
                <path
                    fillRule="evenodd"
                    d="M18.34 2.667h-4.85a2.424 2.424 0 0 0-2.423 2.424v2.424H5.612a1.212 1.212 0 0 0 0 2.424h.606v15.758a3.636 3.636 0 0 0 3.636 3.636h12.122a3.636 3.636 0 0 0 3.636-3.636V9.94h.844a1.212 1.212 0 0 0 0-2.424h-5.692V5.091a2.424 2.424 0 0 0-2.425-2.424ZM8.641 9.939h14.546v15.758c0 .67-.543 1.212-1.212 1.212H9.854a1.212 1.212 0 0 1-1.212-1.212V9.94Zm4.849-2.424V5.091h4.848v2.424H13.49Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconTrashBin32);
export default Memo;
