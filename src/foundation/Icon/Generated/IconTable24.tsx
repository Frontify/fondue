import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTable24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconTable24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.308 3h15.384C20.967 3 22 4.007 22 5.25v13.5c0 1.243-1.033 2.25-2.308 2.25H4.308C3.033 21 2 19.993 2 18.75V5.25C2 4.007 3.033 3 4.308 3Zm-.77 5.625v2.625h4.616V8.625H3.538Zm6.154 0v2.625h4.616V8.625H9.692Zm6.154 0v2.625h4.616V8.625h-4.616Zm4.616-1.5H3.538V5.25a.76.76 0 0 1 .77-.75h15.384a.76.76 0 0 1 .77.75v1.875ZM9.692 12.75h4.616v2.625H9.692V12.75Zm-6.154 0h4.616v2.625H3.538V12.75Zm16.924 0h-4.616v2.625h4.616V12.75ZM3.538 16.875v1.875c0 .414.345.75.77.75h3.846v-2.625H3.538Zm6.154 0V19.5h4.616v-2.625H9.692Zm6.154 0V19.5h3.846a.76.76 0 0 0 .77-.75v-1.875h-4.616Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTable24);
export default Memo;
