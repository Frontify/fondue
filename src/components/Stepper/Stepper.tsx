/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@elements/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@elements/Icon/Svg/CaretDown.svg";
import { ReactComponent as IconCaretLeft } from "@elements/Icon/Svg/CaretLeft.svg";
import { ReactComponent as IconCaretRight } from "@elements/Icon/Svg/CaretRight.svg";
import { ReactComponent as IconCaretUp } from "@elements/Icon/Svg/CaretUp.svg";
import { Theme } from "@utilities/enum";
import { useEffect, useState } from "react";
import stepperStyle from "./Stepper.module.css";

export enum StepperIconStyle {
    ArrowLeftRight = "ArrowLeftRight",
    ArrowUpDown = "ArrowUpDown",
}

export type StepperProps = {
    initialStep: number;
    totalSteps: number;
    useInternalCounter?: boolean;
    onNext?: (currentStep: number) => void;
    onPrevious?: (currentStep: number) => void;
    onUpdate?: (currentStep: number) => void;
    hasStepInput?: boolean;
    prevStepDisabled?: boolean;
    nextStepDisabled?: boolean;
    iconStyle?: StepperIconStyle;
    theme?: Theme;
};

export default function Stepper({
    initialStep,
    totalSteps,
    useInternalCounter = true,
    onNext,
    onPrevious,
    onUpdate,
    hasStepInput = false,
    prevStepDisabled = false,
    nextStepDisabled = false,
    iconStyle = StepperIconStyle.ArrowLeftRight,
    theme = Theme.Dark,
}: StepperProps): React.ReactElement<StepperProps> {
    const [currentStep, setCurrentStep] = useState(initialStep);
    let PrevStepIcon, NextStepIcon;

    switch (iconStyle) {
        case StepperIconStyle.ArrowLeftRight:
            PrevStepIcon = IconCaretLeft;
            NextStepIcon = IconCaretRight;
            break;
        case StepperIconStyle.ArrowUpDown:
            PrevStepIcon = IconCaretUp;
            NextStepIcon = IconCaretDown;
            break;
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            if (useInternalCounter) {
                setCurrentStep(currentStep - 1);
            }

            if (onPrevious) {
                onPrevious(currentStep);
            }

            if (onUpdate) {
                onUpdate(currentStep);
            }
        }
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            if (useInternalCounter) {
                setCurrentStep(currentStep + 1);
            }

            if (onNext) {
                onNext(currentStep);
            }

            if (onUpdate) {
                onUpdate(currentStep);
            }
        }
    };

    const handleInput = (inputValue: number) => {
        if (useInternalCounter && totalSteps && inputValue > totalSteps) {
            setCurrentStep(totalSteps);
        }

        if (inputValue < 1) {
            setCurrentStep(1);
        }

        if (onUpdate) {
            onUpdate(currentStep);
        }
    };

    useEffect(() => {
        setCurrentStep(initialStep);
    }, [initialStep]);

    return (
        <div className={stepperStyle.stepper}>
            <div className={stepperStyle.stepperDetails}>
                <nav
                    className={`${stepperStyle.stepperNav} ${
                        theme === Theme.Light ? stepperStyle.stepperNavLight : ""
                    }`}
                >
                    <button
                        className={`
                            ${stepperStyle.stepperControl}
                            ${stepperStyle.stepperControlPrev}
                            ${theme === Theme.Light ? stepperStyle.stepperControlLight : ""}
                        `}
                        disabled={prevStepDisabled}
                        onClick={() => handlePrevious()}
                        data-test-id={"stepper-control-prev"}
                    >
                        <PrevStepIcon size={IconSize.Size16} />
                    </button>
                    <div
                        className={`
                            ${stepperStyle.stepperCount}
                            ${theme === Theme.Light ? stepperStyle.stepperCountLight : ""}
                        `}
                    >
                        {hasStepInput ? (
                            <input
                                className={stepperStyle.stepperCountInput}
                                type="number"
                                value={currentStep}
                                min={1}
                                max={totalSteps}
                                onChange={(event) => handleInput(parseInt(event.currentTarget.value))}
                                data-test-id={"stepper-count-input"}
                            />
                        ) : (
                            <span data-test-id={"stepper-count"}>{currentStep}</span>
                        )}

                        <span> / {totalSteps}</span>
                    </div>
                    <button
                        className={`
                            ${stepperStyle.stepperControl}
                            ${stepperStyle.stepperControlNext}
                            ${theme === Theme.Light ? stepperStyle.stepperControlLight : ""}
                        `}
                        disabled={nextStepDisabled}
                        onClick={() => handleNext()}
                        data-test-id={"stepper-control-next"}
                    >
                        <NextStepIcon size={IconSize.Size16} />
                    </button>
                </nav>
            </div>
        </div>
    );
}
