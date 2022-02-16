import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconScissors20(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={customClassName}
            name="IconScissors20"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.238 4.268 8.822 8.684 7.632 7.58c.68-1.273.51-2.887-.509-3.906-1.189-1.274-3.227-1.19-4.5 0-1.275 1.189-1.275 3.227 0 4.67 1.103 1.105 2.717 1.275 3.906.51l1.189 1.19-1.19 1.188c-1.273-.68-2.887-.51-3.906.51-1.274 1.189-1.189 3.227 0 4.5 1.19 1.275 3.227 1.275 4.501 0 1.104-1.103 1.274-2.717.51-3.906l6.794-6.794c.425-.424 1.019-.594 1.529-.424l-6.54 6.539 3.652 3.652c1.189 1.274 3.227 1.274 4.501 0l.595-.595-4.841-4.84 5.01-5.011-.594-.595c-1.189-1.274-3.227-1.274-4.501 0Zm.934 9.852-2.548-2.548.595-.51 3.482 3.482c-.51.17-1.104 0-1.529-.424ZM6.02 6.986c.595-.595.595-1.614 0-2.293-.594-.595-1.613-.595-2.293 0-.594.594-.594 1.614 0 2.293.68.68 1.614.68 2.293 0Zm0 5.69c.595.68.595 1.698 0 2.293-.68.594-1.613.594-2.293 0-.594-.68-.594-1.699 0-2.293.68-.595 1.699-.595 2.293 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconScissors20);
export default Memo;
