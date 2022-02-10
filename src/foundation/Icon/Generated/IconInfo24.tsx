import React, { memo } from "react";
import { GeneratedIconProps } from "@foundation/Icon/IconProps";
import { IconSize, IconSizeMap } from "@foundation/Icon/IconSize";

function IconInfo24(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = ["tw-flex tw-items-center tw-justify-center tw-fill-current"];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className={customClassName}
            name="IconInfo24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.175 2.467C14.948 2.156 14.598 2 14.127 2a1.67 1.67 0 0 0-1.162.467c-.34.312-.566.733-.68 1.261-.095.492-.032.892.184 1.204.217.312.553.467 1.006.467.472 0 .878-.155 1.218-.467a2.13 2.13 0 0 0 .652-1.204c.113-.528.056-.949-.17-1.26Zm-4.264 9.689c-.084.406-.23.967-.439 1.685l-1.161 4.08c-.34 1.228-.4 2.213-.184 2.96.217.747.797 1.119 1.742 1.119.528 0 1.062-.166 1.6-.496.539-.33 1.081-.797 1.63-1.402-.057-.415-.227-.718-.51-.907-.284.284-.553.492-.808.624-.255.131-.477.198-.665.198a.577.577 0 0 1-.326-.085c-.085-.057-.138-.16-.156-.312-.018-.151 0-.372.057-.665.056-.294.151-.666.283-1.12l1.558-5.467c.322-1.171.42-2.044.297-2.62-.123-.577-.477-.987-1.062-1.232-.17.113-.392.23-.666.354l.081-.034c-.574.263-1.172.485-1.88.685a4.267 4.267 0 0 1-.793.156l.006-.016a2.386 2.386 0 0 0-.176 1.093c.472 0 .836.028 1.09.085.256.056.422.188.497.396.075.208.07.514-.014.92Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconInfo24);
export default Memo;
