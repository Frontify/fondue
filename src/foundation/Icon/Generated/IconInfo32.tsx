import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconInfo32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconInfo32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20.233 3.29c-.302-.415-.768-.623-1.397-.623-.58 0-1.096.208-1.549.623-.453.415-.755.976-.907 1.68-.126.656-.043 1.19.246 1.606.289.416.736.623 1.34.623a2.32 2.32 0 0 0 1.625-.623c.453-.415.742-.95.869-1.605.15-.705.075-1.266-.227-1.681ZM14.55 16.208c-.114.542-.308 1.29-.586 2.247l-1.548 5.44c-.454 1.637-.535 2.951-.246 3.946.29.996 1.063 1.492 2.323 1.492.704 0 1.416-.22 2.134-.66.718-.44 1.441-1.064 2.172-1.87-.075-.554-.302-.958-.68-1.209-.378.378-.736.655-1.076.831-.34.176-.637.264-.888.264a.769.769 0 0 1-.434-.113c-.114-.076-.184-.213-.208-.415-.025-.203 0-.497.075-.888.076-.391.203-.888.378-1.492l2.078-7.29c.428-1.562.56-2.725.396-3.494-.164-.768-.636-1.316-1.416-1.643a6.314 6.314 0 0 1-.888.472l.108-.044c-.766.35-1.563.646-2.506.913a5.683 5.683 0 0 1-1.058.208l.008-.021a3.182 3.182 0 0 0-.235 1.456c.63 0 1.115.038 1.455.113.34.076.56.252.66.53.1.277.095.685-.018 1.227Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconInfo32);
export default Memo;
