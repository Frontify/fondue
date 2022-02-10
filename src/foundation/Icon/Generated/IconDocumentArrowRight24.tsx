import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocumentArrowRight24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconDocumentArrowRight24"
            {...props}
        >
            <g fill="currentColor">
                <path d="M12.456 12.852a.753.753 0 0 0-.023 1.065l.843.909-4.192-.048a.78.78 0 0 0-.775.744.725.725 0 0 0 .733.753l4.182.048-.94.873c-.305.294-.313.78-.037 1.066a.754.754 0 0 0 1.066 0l2.252-2.141a.79.79 0 0 0 .24-.532.745.745 0 0 0-.21-.54l-2.073-2.183a.762.762 0 0 0-1.066-.014Z" />
                <path
                    fillRule="evenodd"
                    d="M3.5 5.645A3.65 3.65 0 0 1 7.157 2h6.062c.5 0 1.197.273 1.564.62l5.059 4.76c.363.343.658 1.024.658 1.528v9.45A3.643 3.643 0 0 1 16.853 22H7.147A3.649 3.649 0 0 1 3.5 18.355V5.645Zm9.27 4.816h6.185v8.183a1.82 1.82 0 0 1-1.819 1.818H6.864a1.818 1.818 0 0 1-1.819-1.811V5.35c0-1 .816-1.812 1.832-1.812H12v6.154c0 .428.344.77.77.77Zm6.185-1.715v.177h-5.41v-5.24l5.41 5.063Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconDocumentArrowRight24);
export default Memo;
