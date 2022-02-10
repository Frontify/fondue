import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLeaf24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconLeaf24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M19.141 12.588c1.027-3.046 1.227-6.743.367-7.615-.866-.878-4.554-.692-7.64.325-4.035 1.331-6.62 3.812-6.62 7.388a6.35 6.35 0 0 0 1.446 4.043l-1.727 1.743a.75.75 0 1 0 1.066 1.056l1.743-1.76a6.344 6.344 0 0 0 3.836 1.29c3.646.08 6.174-2.454 7.53-6.47ZM8.844 16.69a4.85 4.85 0 0 0 2.777.869h.017c2.866.065 4.912-1.984 6.082-5.45.853-2.531 1.028-5.77.72-6.082-.307-.312-3.54-.148-6.102.696-3.489 1.15-5.59 3.167-5.59 5.963 0 1.118.376 2.148 1.01 2.97l1.192-1.204.002-.024.394-3.474a.75.75 0 0 1 1.49.17l-.182 1.607 2.708-2.733a.75.75 0 0 1 1.065 1.056l-2.654 2.68 1.63-.215a.75.75 0 1 1 .195 1.488l-3.549.466-1.205 1.217Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLeaf24);
export default Memo;
