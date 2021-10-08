import React from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize, IconSizeMap } from "@elements/Icon/IconSize";

function IconArrow(props: IconProps): React.ReactElement<IconProps> {
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
            name="IconArrow"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.632 1.5l.62 3.884 3.748.47-3.713 3.702-1.7-.183a8.41 8.41 0 011.4 4.66c0 4.676-3.802 8.467-8.493 8.467C5.803 22.5 2 18.71 2 14.033c0-4.676 3.803-8.467 8.494-8.467 1.713 0 3.308.506 4.643 1.376l-.19-1.769L18.633 1.5zm-2.715 8.2a6.885 6.885 0 011.526 4.333c0 3.826-3.111 6.928-6.95 6.928-3.837 0-6.949-3.102-6.949-6.928s3.112-6.928 6.95-6.928c1.637 0 3.142.565 4.33 1.509l-1.099 1.1a5.392 5.392 0 00-3.231-1.07c-2.985 0-5.405 2.413-5.405 5.389 0 2.976 2.42 5.388 5.405 5.388 2.985 0 5.405-2.412 5.405-5.388a5.353 5.353 0 00-1.08-3.232l1.098-1.1zm-3.297 1.12a3.852 3.852 0 00-2.126-.636 3.855 3.855 0 00-3.861 3.849 3.855 3.855 0 003.86 3.849 3.855 3.855 0 003.861-3.85c0-.785-.236-1.515-.641-2.124l-1.128 1.13a2.313 2.313 0 01-2.09 3.304 2.313 2.313 0 01-2.318-2.31 2.313 2.313 0 012.317-2.308c.357 0 .696.08.999.225l1.127-1.129zm-2.126 3.983a.77.77 0 10-.773-.77c0 .425.346.77.773.77zm7.333-8.128l-.248-1.948-1.023 1.02.222 1.974 1.942.23 1.047-1.044-1.94-.232z"
            />
        </svg>
    );
}

const MemoIconArrow = React.memo(IconArrow);
export default MemoIconArrow;
