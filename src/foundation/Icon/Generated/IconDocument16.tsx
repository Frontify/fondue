import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconDocument16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconDocument16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.771 1.333a2.434 2.434 0 0 0-2.438 2.43v8.474a2.433 2.433 0 0 0 2.432 2.43h6.47a2.428 2.428 0 0 0 2.432-2.428v-6.3c0-.336-.197-.79-.439-1.019L9.856 1.747c-.246-.231-.71-.414-1.043-.414H4.77Zm7.865 5.642H8.514A.512.512 0 0 1 8 6.462V2.359H4.585c-.678 0-1.221.54-1.221 1.208v8.867c0 .663.543 1.207 1.212 1.207h6.848c.667 0 1.213-.542 1.213-1.212V6.975Zm0-1.026V5.83L9.03 2.456v3.493h3.607Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconDocument16);
export default Memo;
