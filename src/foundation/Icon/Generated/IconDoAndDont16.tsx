import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDoAndDont16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDoAndDont16"
            {...props}
        >
            <g fill="currentColor">
                <path d="M3.854 3.854a.476.476 0 0 0 0 .673L4.325 5l-.471.471a.476.476 0 0 0 .673.674L5 5.672l.471.472a.476.476 0 0 0 .674-.674L5.672 5l.472-.472a.476.476 0 0 0-.674-.673l-.47.47-.472-.471a.476.476 0 0 0-.673 0Z" />
                <path
                    fillRule="evenodd"
                    d="M4.905 8.476a3.571 3.571 0 1 1 0-7.143 3.571 3.571 0 0 1 0 7.143Zm0-.952a2.619 2.619 0 1 0 0-5.238 2.619 2.619 0 0 0 0 5.238Z"
                    clipRule="evenodd"
                />
                <path d="M12.713 10.04a.476.476 0 0 0-.674.01l-1.332 1.375-.35-.396a.476.476 0 1 0-.713.632l.69.78a.476.476 0 0 0 .699.015l1.69-1.743a.476.476 0 0 0-.01-.674Z" />
                <path
                    fillRule="evenodd"
                    d="M7.524 11.095a3.571 3.571 0 1 0 7.143 0 3.571 3.571 0 0 0-7.143 0Zm3.571 2.62a2.619 2.619 0 1 0 0-5.239 2.619 2.619 0 0 0 0 5.238Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDoAndDont16);
export default Memo;
