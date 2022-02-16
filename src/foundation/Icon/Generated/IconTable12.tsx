import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconTable12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconTable12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2.154 1.5h7.692c.637 0 1.154.504 1.154 1.125v6.75c0 .621-.517 1.125-1.154 1.125H2.154C1.517 10.5 1 9.996 1 9.375v-6.75C1 2.004 1.517 1.5 2.154 1.5Zm-.385 2.813v1.312h2.308V4.312H1.769Zm3.077 0v1.312h2.308V4.312H4.846Zm3.077 0v1.312h2.308V4.312H7.923Zm2.308-.75H1.769v-.938a.38.38 0 0 1 .385-.375h7.692a.38.38 0 0 1 .385.375v.938ZM4.846 6.374h2.308v1.313H4.846V6.375Zm-3.077 0h2.308v1.313H1.769V6.375Zm8.462 0H7.923v1.313h2.308V6.375ZM1.769 8.438v.937a.38.38 0 0 0 .385.375h1.923V8.437H1.769Zm3.077 0V9.75h2.308V8.437H4.846Zm3.077 0V9.75h1.923a.38.38 0 0 0 .385-.375v-.938H7.923Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTable12);
export default Memo;
