import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconStrikethroughBox24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconStrikethroughBox24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M21.797 3.489a.833.833 0 0 0-1.175-.086l-1.576 1.36a2.485 2.485 0 0 0-1.213-.313H6.167a2.5 2.5 0 0 0-2.5 2.5v10c0 .332.064.649.182.939l-1.56 1.347a.833.833 0 0 0 1.089 1.261l1.576-1.36c.359.2.772.313 1.213.313h11.666a2.5 2.5 0 0 0 2.5-2.5v-10c0-.332-.064-.649-.182-.939l1.56-1.347a.833.833 0 0 0 .086-1.175ZM17.48 6.117H6.167a.833.833 0 0 0-.834.833v9.656L17.48 6.117ZM6.521 17.783l12.146-10.49v9.657c0 .46-.373.833-.834.833H6.521Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconStrikethroughBox24);
export default Memo;
