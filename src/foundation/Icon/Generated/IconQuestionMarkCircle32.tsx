import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconQuestionMarkCircle32(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            className={customClassName}
            name="IconQuestionMarkCircle32"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M26 16c0 5.523-4.477 10-10 10S6 21.523 6 16 10.477 6 16 6s10 4.477 10 10Zm2 0c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12Zm-13.353-4.628c-.33.305-.558.737-.677 1.214a1 1 0 1 1-1.94-.485c.19-.764.583-1.572 1.26-2.198.696-.642 1.639-1.04 2.811-1.04 1.158 0 2.2.39 2.956 1.145.755.756 1.145 1.798 1.145 2.956 0 1.507-1.049 2.551-1.754 3.254l-.09.089c-.847.848-1.257 1.33-1.257 1.929a1 1 0 1 1-2 0c0-1.508 1.05-2.552 1.755-3.255l.089-.088c.848-.849 1.257-1.33 1.257-1.93 0-.703-.23-1.21-.56-1.54-.33-.33-.838-.56-1.54-.56-.69 0-1.142.221-1.455.51ZM17.25 21.65a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export default memo(IconQuestionMarkCircle32);
