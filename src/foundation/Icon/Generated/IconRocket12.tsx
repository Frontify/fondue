import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";

function IconRocket12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = "tw-flex tw-items-center tw-justify-center tw-fill-current";
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconRocket12"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M6.846 5.195c-.508-.508-.508-1.292 0-1.754.509-.462 1.294-.508 1.757 0 .462.508.508 1.292 0 1.754-.509.462-1.295.508-1.757 0Zm1.248-.508c-.185.231-.508.231-.74 0-.23-.23-.184-.508 0-.738.186-.231.51-.185.74 0 .231.184.231.507 0 .738Z" />
                <path d="m1.947 8.242.949-1.407 2.29 2.288-1.436.965.323.323c.878.785 2.496.785 3.698 0 1.183-.818 1.694-2.217 1.048-3.23 1.7-1.876 2.785-4.85 1.817-5.817-.97-.97-3.958.12-5.836 1.825-1.009-.59-2.373-.078-3.176 1.037-.832 1.2-.832 2.816 0 3.693l.323.323Zm2.219-4.524-.58.861-.118.177-1.567 2.332c-.277-.647-.185-1.662.324-2.4.508-.785 1.34-1.155 1.94-.97ZM7.355 9.81c-.786.508-1.757.6-2.404.323l3.374-2.262c.185.6-.185 1.432-.97 1.94Zm2.773-7.893c.647.646-.463 3.462-2.08 5.077-.693.693-1.525 1.247-2.31 1.662L3.472 6.395c.323-.877.878-1.708 1.57-2.4 1.572-1.616 4.438-2.724 5.085-2.077Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconRocket12);
export default Memo;
