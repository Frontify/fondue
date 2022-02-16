import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPin32Filled(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPin32Filled"
            {...props}
        >
            <path
                fill="currentColor"
                d="M20.664 3.152a2.68 2.68 0 0 0-3.15 1.089l-4.287 6.737a9.426 9.426 0 0 0-6.233 1.158l-.003.002a2.68 2.68 0 0 0-.536 4.21l3.892 3.891-7.054 7.054a1 1 0 1 0 1.414 1.414l7.054-7.053 3.893 3.892a2.68 2.68 0 0 0 4.209-.537l.002-.003a9.426 9.426 0 0 0 1.157-6.233l6.736-4.286a2.68 2.68 0 0 0 .457-4.157L21.67 3.785a2.68 2.68 0 0 0-1.006-.633Z"
            />
        </svg>
    );
}

const Memo = memo(IconPin32Filled);
export default Memo;
