import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconPlusBoxStack12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconPlusBoxStack12"
            {...props}
        >
            <g fill="currentColor">
                <path d="M5.413 8.152a.391.391 0 1 1-.783 0V7.37h-.782a.391.391 0 1 1 0-.783h.782v-.783a.391.391 0 1 1 .783 0v.783h.783a.391.391 0 1 1 0 .783h-.783v.782Z" />
                <path
                    fillRule="evenodd"
                    d="M9.257 1.5H4.7c-.687 0-1.243.557-1.243 1.243v.714h-.714c-.686 0-1.243.556-1.243 1.242v4.558c0 .687.557 1.243 1.243 1.243h4.558c.686 0 1.242-.556 1.242-1.243v-.714h.714c.687 0 1.243-.556 1.243-1.242V2.743c0-.686-.556-1.243-1.243-1.243Zm-.714 3.2v3.015h.714a.414.414 0 0 0 .414-.414V2.743a.414.414 0 0 0-.414-.414H4.7a.414.414 0 0 0-.415.414v.714h3.016c.686 0 1.242.556 1.242 1.242Zm-6.26-.04a.42.42 0 0 1 .421-.42h4.635c.233 0 .422.188.422.42v4.636a.421.421 0 0 1-.422.421H2.704a.421.421 0 0 1-.421-.421V4.661Z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
}

const Memo = memo(IconPlusBoxStack12);
export default Memo;
