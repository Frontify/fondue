import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconTable20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconTable20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.59 2.5h12.82c1.062 0 1.923.84 1.923 1.875v11.25c0 1.035-.86 1.875-1.923 1.875H3.59c-1.062 0-1.923-.84-1.923-1.875V4.375c0-1.036.86-1.875 1.923-1.875Zm-.641 4.688v2.187h3.846V7.187H2.949Zm5.128 0v2.187h3.846V7.187H8.077Zm5.128 0v2.187h3.846V7.187h-3.846Zm3.846-1.25H2.95V4.375c0-.345.287-.625.64-.625h12.82c.354 0 .641.28.641.625v1.563Zm-8.974 4.687h3.846v2.188H8.077v-2.188Zm-5.128 0h3.846v2.188H2.949v-2.188Zm14.102 0h-3.846v2.188h3.846v-2.188ZM2.95 14.063v1.562c0 .345.287.625.64.625h3.206v-2.188H2.949Zm5.128 0v2.187h3.846v-2.188H8.077Zm5.128 0v2.187h3.205c.354 0 .641-.28.641-.625v-1.563h-3.846Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconTable20);
export default Memo;
