import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentCheck24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconDocumentCheck24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M8.835 14.84a.916.916 0 0 1 1.289.126l.863 1.052 2.95-2.95a.916.916 0 1 1 1.295 1.296l-3.664 3.663a.916.916 0 0 1-1.355-.066l-1.505-1.832a.916.916 0 0 1 .127-1.29Z" />
                <path
                    fillRule="evenodd"
                    d="M3.5 5.645A3.65 3.65 0 0 1 7.157 2h6.062c.5 0 1.197.273 1.564.62l5.059 4.76c.363.343.658 1.024.658 1.528v9.45A3.643 3.643 0 0 1 16.853 22H7.147A3.649 3.649 0 0 1 3.5 18.355V5.645Zm9.27 4.816h6.185v8.183a1.82 1.82 0 0 1-1.819 1.818H6.864a1.818 1.818 0 0 1-1.819-1.811V5.35c0-1 .816-1.812 1.832-1.812H12v6.154c0 .428.344.77.77.77Zm6.185-1.715v.177h-5.41v-5.24l5.41 5.063Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentCheck24);
export default Memo;
