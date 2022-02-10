import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconRocket24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconRocket24"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M13.693 10.39c-1.017-1.015-1.017-2.585 0-3.508 1.016-.923 2.588-1.016 3.512 0 .924 1.015 1.017 2.585 0 3.508s-2.588 1.016-3.512 0Zm2.495-1.015c-.37.461-1.016.461-1.479 0-.462-.462-.37-1.016 0-1.478.37-.461 1.017-.369 1.48 0 .462.37.462 1.016 0 1.478Z" />
                <path d="m3.895 16.484 1.896-2.815 4.581 4.576L7.5 20.177l.647.646c1.756 1.57 4.991 1.57 7.394 0 2.366-1.636 3.388-4.436 2.096-6.46 3.402-3.753 5.57-9.702 3.635-11.636C19.332.79 13.355 2.97 9.599 6.38 7.583 5.2 4.855 6.223 3.248 8.452c-1.664 2.4-1.664 5.632 0 7.386l.647.647Zm4.437-9.048L7.174 9.158c-.08.117-.16.235-.237.353l-3.135 4.665c-.554-1.293-.37-3.324.647-4.801 1.017-1.57 2.68-2.309 3.883-1.94Zm6.377 12.187c-1.571 1.015-3.512 1.2-4.806.646l6.747-4.524c.37 1.2-.37 2.862-1.94 3.878Zm5.546-15.788c1.294 1.293-.924 6.924-4.16 10.156-1.386 1.385-3.05 2.493-4.62 3.323l-4.53-4.523c.647-1.755 1.756-3.416 3.143-4.801 3.142-3.232 8.873-5.447 10.167-4.155Z" />
            </g>
        </svg>
    );
}

const Memo = memo(IconRocket24);
export default Memo;
