import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPlayFrame24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconPlayFrame24"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M8.923 11.114v5.269c.04.615.333 1.111.843 1.352.218.107.444.153.682.153.32 0 .643-.1.899-.314l3.854-2.629c.406-.284.645-.751.645-1.235 0-.5-.254-.975-.685-1.25l-3.9-2.587c-.456-.304-1.008-.325-1.504-.096-.533.307-.834.79-.834 1.337Zm5.349 2.603-3.81-2.528-.002 5.132 3.812-2.604Z" />
                <path d="M4.308 2.7h15.384A2.308 2.308 0 0 1 22 5.008v13.846a2.308 2.308 0 0 1-2.308 2.308H4.308A2.308 2.308 0 0 1 2 18.854V5.008A2.308 2.308 0 0 1 4.308 2.7Zm-.77 5.385v10.769a.77.77 0 0 0 .77.769h15.384a.77.77 0 0 0 .77-.77V8.086H3.538Zm16.924-1.539H3.538V5.008a.77.77 0 0 1 .77-.77h15.384a.77.77 0 0 1 .77.77v1.538Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlayFrame24);
export default Memo;
