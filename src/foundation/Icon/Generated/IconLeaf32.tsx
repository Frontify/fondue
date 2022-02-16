import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconLeaf32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconLeaf32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M25.521 16.783c1.37-4.06 1.636-8.99.49-10.152-1.156-1.17-6.072-.923-10.186.434-5.381 1.774-8.828 5.082-8.828 9.85 0 2.046.724 3.923 1.929 5.39L6.623 24.63a1 1 0 1 0 1.42 1.407l2.325-2.346a8.46 8.46 0 0 0 5.115 1.72c4.86.106 8.232-3.272 10.038-8.628Zm-13.73 5.47a6.466 6.466 0 0 0 3.703 1.158h.023c3.821.088 6.55-2.645 8.11-7.267 1.137-3.374 1.37-7.693.96-8.108-.41-.415-4.72-.198-8.136.928-4.652 1.534-7.454 4.223-7.454 7.95a6.47 6.47 0 0 0 1.346 3.96l1.59-1.605.003-.031.526-4.632a1 1 0 0 1 1.987.225l-.243 2.144 3.61-3.644a1 1 0 1 1 1.42 1.407l-3.54 3.573 2.174-.285a1 1 0 0 1 .26 1.983l-4.73.622-1.609 1.623Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLeaf32);
export default Memo;
