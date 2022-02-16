import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconHeading32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconHeading32"
            {...props}
        >
            <path
                fill="currentColor"
                d="M13.333 19.108h-2.395v-4.646H6.395v4.646H4V8h2.395v4.443h4.543V8h2.395v11.108Zm-9.555 4.445a1.111 1.111 0 1 1 0-2.222h24.444a1.111 1.111 0 1 1 0 2.222H3.778Zm14.834-4.445h2.321V8h-2.32L16 9.864v2.205l2.5-1.766h.112v8.805Z"
            />
        </svg>
    );
}

const Memo = memo(IconHeading32);
export default Memo;
