import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';

function IconFaceHappy16(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            className={customClassName}
            name="IconFaceHappy16"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Zm1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-9.275-.7a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Zm5.425-.875a.875.875 0 1 1-1.75 0 .875.875 0 0 1 1.75 0ZM4.82 9.534a.5.5 0 0 1 .646.281l.002.005a1.75 1.75 0 0 0 .1.186c.08.13.209.307.4.486.373.35 1.003.722 2.033.722s1.66-.373 2.034-.722a2.38 2.38 0 0 0 .483-.637.868.868 0 0 0 .016-.035l.002-.005a.5.5 0 0 1 .931.366l-.466-.18.466.18v.001l-.001.002-.001.003-.004.008-.01.023a2.734 2.734 0 0 1-.165.312 3.381 3.381 0 0 1-.569.692c-.543.508-1.412.992-2.716.992-1.304 0-2.173-.484-2.716-.992a3.383 3.383 0 0 1-.57-.692 2.752 2.752 0 0 1-.165-.312l-.01-.023-.003-.008-.001-.003v-.002L5 10l-.466.181a.5.5 0 0 1 .285-.647Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const Memo = memo(IconFaceHappy16);
export default Memo;
