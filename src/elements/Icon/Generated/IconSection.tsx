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

function IconSection(props: IconProps): React.ReactElement<IconProps> {
    const customClassName = [
        "flex items-center justify-center fill-current",
        iconSizeMap[props.size || IconSize.Size16],
    ].join(" ");
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            className={customClassName}
            {...props}
        >
            <path
                d="M2.83333333,17.6646322 C2.37309604,17.6646322 2,17.2915361 2,16.8312988 C2,16.3710615 2.37309604,15.9979655 2.83333333,15.9979655 L21.1666667,15.9979655 C21.626904,15.9979655 22,16.3710615 22,16.8312988 C22,17.2915361 21.626904,17.6646322 21.1666667,17.6646322 L2.83333333,17.6646322 Z M10,14.3312988 L8.20353982,14.3312988 L8.20353982,10.8461914 L4.79646018,10.8461914 L4.79646018,14.3312988 L3,14.3312988 L3,6 L4.79646018,6 L4.79646018,9.33251953 L8.20353982,9.33251953 L8.20353982,6 L10,6 L10,14.3312988 Z M15.7,14.3312988 L13.9591803,14.3312988 L13.9591803,7.72729492 L13.8742623,7.72729492 L12,9.05175781 L12,7.39770508 L13.9591803,6 L15.7,6 L15.7,14.3312988 Z"
                id="Icon_Header"
            />
        </svg>
    );
}

const MemoIconSection = React.memo(IconSection);
export default MemoIconSection;
