import React, { memo } from "react";
import { GeneratedIconProps } from "@components/Icon/IconProps";
import { IconSize, IconSizeMap } from "@components/Icon/IconSize";

function IconFilter(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
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
            name="IconFilter"
            {...props}
        >
            <path d="m4.133 5 5.82 8.856a5 5 0 0 1 .821 2.746v3.744l2.634-1.575.033-2.222a5 5 0 0 1 .82-2.673L20.096 5H4.133Zm0-2h15.962a2 2 0 0 1 1.671 3.098l-5.833 8.877a3 3 0 0 0-.492 1.603l-.033 2.222a2 2 0 0 1-.973 1.687L11.8 22.062a2 2 0 0 1-3.027-1.716v-3.744a3 3 0 0 0-.493-1.647l-5.82-8.857A2 2 0 0 1 4.133 3Z" />
        </svg>
    );
}

const Memo = memo(IconFilter);
export default Memo;
