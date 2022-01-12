import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconBrand(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconBrand"
            {...props}
        >
            <path d="M5.41 9.353v9.255c0 .586.475 1.06 1.06 1.06h11.06a1.06 1.06 0 0 0 1.06-1.06V9.353L12 4.74 5.41 9.353Zm14.747 1.096v8.16a2.627 2.627 0 0 1-2.627 2.626H6.47a2.627 2.627 0 0 1-2.627-2.627V10.45l-.61.428a.783.783 0 0 1-.899-1.284l9.217-6.451a.783.783 0 0 1 .898 0l9.217 6.451a.783.783 0 0 1-.899 1.284l-.61-.428Zm-4.753-.51c1.196.804 1.209 2.54.408 4.256-.746 1.597-2.723 3.56-3.947 3.6h-.054c-1.218-.04-3.195-2.003-3.94-3.6-.801-1.716-.788-3.452.408-4.257 1.173-.79 2.4-.495 3.562.747 1.163-1.242 2.39-1.537 3.563-.747Zm-.95 3.898c.548-1.13.54-2.183-.04-2.559-.684-.443-1.39-.207-2.266.876a.494.494 0 0 1-.757 0c-.876-1.083-1.582-1.319-2.266-.876-.58.376-.588 1.43-.04 2.56.533 1.097 2.057 2.554 2.672 2.574.64-.019 2.164-1.477 2.697-2.575Z" />
        </svg>
    );
}

const Memo = memo(IconBrand);
export default Memo;
