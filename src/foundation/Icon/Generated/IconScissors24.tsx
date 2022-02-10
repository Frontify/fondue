import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconScissors24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconScissors24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m15.885 5.122-5.299 5.3-1.427-1.325c.816-1.53.612-3.465-.611-4.688-1.427-1.529-3.873-1.427-5.402 0-1.528 1.426-1.528 3.872 0 5.605 1.325 1.325 3.262 1.528 4.688.611l1.427 1.427-1.427 1.427c-1.528-.816-3.465-.612-4.687.611-1.53 1.427-1.427 3.873 0 5.401 1.426 1.53 3.872 1.53 5.4 0 1.326-1.324 1.53-3.26.612-4.687l8.153-8.153c.51-.51 1.223-.714 1.834-.51L11.3 13.988l4.383 4.382c1.426 1.53 3.872 1.53 5.4 0l.714-.713-5.809-5.809L22 5.835l-.713-.713c-1.427-1.529-3.873-1.529-5.402 0Zm1.121 11.822-3.057-3.058.713-.611 4.179 4.178c-.612.204-1.325 0-1.835-.51Zm-9.783-8.56c.713-.714.713-1.937 0-2.752-.713-.714-1.936-.714-2.752 0-.713.713-.713 1.936 0 2.751.816.815 1.937.815 2.752 0Zm0 6.827c.713.815.713 2.038 0 2.752-.815.713-1.936.713-2.752 0-.713-.816-.713-2.038 0-2.752.816-.713 2.039-.713 2.752 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScissors24);
export default Memo;
