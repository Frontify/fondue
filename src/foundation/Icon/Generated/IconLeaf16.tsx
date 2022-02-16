import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLeaf16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconLeaf16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.76 8.392c.685-2.03.818-4.495.245-5.076-.577-.586-3.036-.462-5.093.216C5.222 4.42 3.5 6.074 3.5 8.457a4.23 4.23 0 0 0 .964 2.695L3.31 12.316a.5.5 0 1 0 .71.704l1.163-1.173a4.23 4.23 0 0 0 2.557.86c2.43.053 4.116-1.636 5.02-4.314Zm-6.864 2.735a3.234 3.234 0 0 0 1.85.579h.012c1.91.043 3.276-1.323 4.055-3.634.569-1.687.685-3.846.48-4.054-.204-.208-2.36-.099-4.067.464-2.327.767-3.727 2.112-3.727 3.975 0 .746.25 1.432.672 1.98l.795-.802.002-.016.263-2.316a.5.5 0 0 1 .993.113l-.121 1.071 1.805-1.821a.5.5 0 1 1 .71.703l-1.77 1.787 1.087-.143a.5.5 0 1 1 .13.992l-2.366.31-.803.812Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLeaf16);
export default Memo;
