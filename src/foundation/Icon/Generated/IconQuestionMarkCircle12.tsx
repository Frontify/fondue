import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
function IconQuestionMarkCircle12(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const customClassName = 'tw-flex tw-items-center tw-justify-center tw-fill-current';
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            className={customClassName}
            name="IconQuestionMarkCircle12"
            {...props}
        >
            <g fill="none">
                <g clipPath="url(#QuestionMarkCircle12)">
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0Zm1 0A6 6 0 1 1 0 6a6 6 0 0 1 12 0ZM6.075 3.5c-.588 0-1.077.46-1.192.892a.5.5 0 0 1-.966-.256C4.137 3.304 4.994 2.5 6.075 2.5c.514 0 1.022.155 1.406.512.391.364.6.887.6 1.515 0 .502-.122.89-.33 1.206-.194.296-.447.504-.639.661l-.009.007c-.21.172-.348.289-.45.438-.089.132-.162.31-.162.616a.5.5 0 1 1-1 0c0-.491.126-.869.335-1.177.188-.277.432-.477.617-.628l.026-.022c.205-.168.345-.288.446-.443.091-.14.167-.333.167-.658 0-.399-.127-.639-.281-.782-.161-.15-.406-.245-.726-.245ZM6.5 9a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                        clipRule="evenodd"
                    />
                </g>
                <defs>
                    <clipPath id="QuestionMarkCircle12">
                        <path fill="#fff" d="M0 0h12v12H0z" />
                    </clipPath>
                </defs>
            </g>
        </svg>
    );
}
export default memo(IconQuestionMarkCircle12);
