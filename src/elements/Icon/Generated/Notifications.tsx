import * as React from "react";
import { IconProps, IconSize } from "@elements/Icon/Icon";
const iconSizeMap = {
    [IconSize.Size8]: "h-2 w-2",
    [IconSize.Size12]: "h-3 w-3",
    [IconSize.Size16]: "h-4 w-4",
    [IconSize.Size20]: "h-5 w-5",
    [IconSize.Size24]: "h-6 w-6",
    [IconSize.Size32]: "h-8 w-8",
};

function IconNotifications(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path d="M9.81818182,5.23011621 L9.81818182,4.14285714 C9.81818182,2.95938982 10.7866142,2 11.9616495,2 L12.0383505,2 C13.222155,2 14.1818182,2.95113891 14.1818182,4.14285714 L14.1818182,5.22896796 C16.7240561,6.12604745 18.5454545,8.54677995 18.5454545,11.3937851 L18.5454545,17.7142857 L19.2918551,17.7142857 C19.6829527,17.7142857 20,18.031332 20,18.4285714 C20,18.8230605 19.6803939,19.1428571 19.2918551,19.1428571 L14.1818182,19.1428571 L14.1818182,19.8571429 C14.1818182,21.0406102 13.2133858,22 12.0383505,22 L11.9616495,22 C10.777845,22 9.81818182,21.0488611 9.81818182,19.8571429 L9.81818182,19.1428571 L4.7081449,19.1428571 C4.31704727,19.1428571 4,18.8258108 4,18.4285714 C4,18.0340823 4.31960607,17.7142857 4.7081449,17.7142857 L5.45454545,17.7142857 L5.45454545,11.3937851 C5.45454545,8.54877405 7.27912507,6.12827709 9.81818182,5.23011621 Z M9.81818182,17.7142857 L14.1818182,17.7142857 L17.0909091,17.7142857 L17.0909091,11.3816586 C17.0909091,8.57098855 14.8116315,6.28571429 12,6.28571429 C9.19408965,6.28571429 6.90909091,8.56724628 6.90909091,11.3816586 L6.90909091,17.7142857 L9.81818182,17.7142857 Z" />
        </svg>
    );
}

const MemoIconNotifications = React.memo(IconNotifications);
export default MemoIconNotifications;
