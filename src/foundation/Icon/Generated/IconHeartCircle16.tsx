import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHeartCircle16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconHeartCircle16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 14.667A6.667 6.667 0 1 1 8 1.334a6.667 6.667 0 0 1 0 13.333Zm3.558-5.928c.717-1.577.706-3.172-.366-3.912-1.051-.726-2.15-.455-3.192.686-1.042-1.14-2.141-1.412-3.192-.686-1.072.74-1.084 2.335-.366 3.912.668 1.468 2.44 3.273 3.53 3.308h.049c1.097-.035 2.869-1.84 3.537-3.308Zm-.907-3.128c.582.401.59 1.526.04 2.734-.534 1.172-2.062 2.73-2.703 2.75-.617-.02-2.146-1.578-2.68-2.75-.549-1.208-.54-2.333.04-2.734.686-.474 1.394-.222 2.273.935.19.251.568.251.758 0 .879-1.157 1.587-1.409 2.272-.935ZM13.714 8A5.714 5.714 0 1 1 2.286 8a5.714 5.714 0 0 1 11.428 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconHeartCircle16);
export default Memo;
