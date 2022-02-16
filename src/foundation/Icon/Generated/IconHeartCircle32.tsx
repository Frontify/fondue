import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconHeartCircle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconHeartCircle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16 29.333c-7.364 0-13.333-5.97-13.333-13.333C2.667 8.636 8.637 2.667 16 2.667c7.364 0 13.333 5.97 13.333 13.333 0 7.364-5.97 13.333-13.333 13.333Zm7.116-11.855c1.435-3.154 1.412-6.344-.731-7.824-2.103-1.452-4.301-.91-6.385 1.372-2.084-2.282-4.282-2.824-6.385-1.372-2.143 1.48-2.166 4.67-.73 7.824 1.335 2.936 4.878 6.545 7.06 6.617h.097c2.195-.072 5.738-3.68 7.074-6.617Zm-1.814-6.257c1.163.803 1.18 3.053.08 5.468-1.067 2.346-4.125 5.46-5.406 5.502-1.235-.043-4.29-3.157-5.358-5.502-1.099-2.415-1.083-4.665.08-5.467 1.371-.947 2.787-.444 4.544 1.87a.952.952 0 0 0 1.517 0c1.757-2.314 3.172-2.817 4.543-1.87Zm6.127 4.78c0 6.31-5.117 11.428-11.429 11.428S4.572 22.312 4.572 16 9.688 4.572 16 4.572c6.312 0 11.43 5.116 11.43 11.428Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconHeartCircle32);
export default Memo;
