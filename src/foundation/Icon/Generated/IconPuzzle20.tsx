import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPuzzle20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconPuzzle20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M18.334 12a3 3 0 0 0-4-2.829v-2.17c0-.737-.597-1.334-1.334-1.334h-2.17a3 3 0 1 0-5.658 0H3c-.736 0-1.333.597-1.333 1.333v10c0 .736.597 1.333 1.333 1.333h3.367a.667.667 0 0 0 .467-1.142 1.667 1.667 0 1 1 2.333 0 .667.667 0 0 0 .466 1.142H13c.737 0 1.334-.596 1.334-1.333v-2.17a3 3 0 0 0 4-2.83ZM13 13.633V17h-2.17a3 3 0 1 0-5.658 0H3V7h3.367a.667.667 0 0 0 .467-1.143 1.667 1.667 0 1 1 2.333 0A.667.667 0 0 0 9.633 7H13v3.367c0 .597.725.893 1.143.467a1.667 1.667 0 1 1 0 2.333.667.667 0 0 0-1.143.466Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconPuzzle20);
export default Memo;
