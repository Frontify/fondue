import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconHighlight(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = [
        "tw-flex tw-items-center tw-justify-center tw-fill-current",
        IconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            viewBox="0 0 19 19"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className={customClassName}
            name="IconHighlight"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.479 1.098A2 2 0 0 0 12.77.986L4.202 8.249a2 2 0 0 0-.579.822L2.13 13.046a1 1 0 0 0 .215 1.045L.647 15.682l-.087.095C-.471 16.899.324 18.71 1.848 18.71h1.508c.422 0 .83-.152 1.148-.43l1.116-.969a1 1 0 0 0 .838.063l3.976-1.493c.318-.12.602-.32.822-.58l7.263-8.569a2 2 0 0 0-.112-2.707L15.48 1.098Zm1.867 3.989-2.928-2.929a.5.5 0 0 0-.677-.028l-8.23 6.976 4.888 4.888 6.975-8.23a.5.5 0 0 0-.027-.677ZM3.647 13.272l1.068-2.841 4.359 4.359-2.841 1.068-2.586-2.586Zm.88 3.002-1.12-1.122-1.694 1.586-.049.054a.25.25 0 0 0 .184.419h1.508a.25.25 0 0 0 .164-.061l1.008-.876Z"
            />
            <path d="M10.6 17.01a.75.75 0 1 0 0 1.5h5.097a.75.75 0 0 0 0-1.5H10.6Z" />
        </svg>
    );
}

const Memo = memo(IconHighlight);
export default Memo;
