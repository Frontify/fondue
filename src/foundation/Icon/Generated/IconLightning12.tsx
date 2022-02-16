import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconLightning12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconLightning12"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.146 5.028c-.12-.299-.342-.448-.666-.448H7.495l.993-2.597c.136-.357.045-.639-.273-.847-.317-.207-.613-.178-.885.088l-5.107 4.98c-.227.221-.28.48-.16.774.12.295.338.443.656.443h1.8L3.468 9.999c-.136.356-.049.642.263.856.31.214.606.191.885-.068l5.35-4.981c.24-.22.3-.48.18-.778ZM5.57 6.71H2.72l5.106-4.98-1.372 3.56H9.48l-5.35 4.981 1.44-3.56Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconLightning12);
export default Memo;
