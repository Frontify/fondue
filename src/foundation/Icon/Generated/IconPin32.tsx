import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconPin32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconPin32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.664 3.152a2.68 2.68 0 0 0-3.15 1.089l-4.287 6.737a9.426 9.426 0 0 0-6.233 1.158l-.003.002a2.68 2.68 0 0 0-.536 4.21l3.892 3.891-7.054 7.054a1 1 0 1 0 1.414 1.414l7.054-7.053 3.893 3.892a2.68 2.68 0 0 0 4.209-.537l.002-.003a9.426 9.426 0 0 0 1.157-6.233l6.736-4.286a2.68 2.68 0 0 0 .457-4.157L21.67 3.785a2.68 2.68 0 0 0-1.006-.633ZM19.7 5.004a.68.68 0 0 1 .556.195l6.545 6.546a.68.68 0 0 1-.116 1.054l-7.314 4.655a1 1 0 0 0-.436 1.078 7.425 7.425 0 0 1-.798 5.467.68.68 0 0 1-1.068.134l-9.201-9.2-.001-.002A.68.68 0 0 1 8 13.863a7.426 7.426 0 0 1 5.468-.798 1 1 0 0 0 1.077-.435L19.2 5.315a.68.68 0 0 1 .5-.311Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPin32);
export default Memo;
