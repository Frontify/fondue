import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconNone(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 21 18"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconNone"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.94.488a.833.833 0 0 0-1.175-.086l-1.576 1.36c-.36-.199-.773-.313-1.213-.313H4.309a2.5 2.5 0 0 0-2.5 2.5v10c0 .332.065.649.182.939l-1.56 1.347a.833.833 0 0 0 1.09 1.262l1.575-1.361c.36.2.773.313 1.213.313h11.667a2.5 2.5 0 0 0 2.5-2.5v-10c0-.332-.065-.649-.182-.938l1.56-1.348A.833.833 0 0 0 19.94.488Zm-4.318 2.628H4.309a.833.833 0 0 0-.833.833v9.657l12.146-10.49ZM4.663 14.783 16.81 4.293v9.656c0 .46-.373.834-.833.834H4.663Z"
            />
        </svg>
    );
}

const Memo = memo(IconNone);
export default Memo;
