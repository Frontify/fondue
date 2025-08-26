/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorPicker, Flyout } from '@frontify/fondue-components';
import { IconTypography } from '@frontify/fondue-icons';
import { MARK_COLOR, useColorDropdownMenu, useColorDropdownMenuState } from '@udecode/plate-font';

import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';

import { ButtonWrapper, IconStylingWrapper } from '../helper';

type Color = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
};

const colorToCss = (color: Color) => `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha ?? 1})`;
const cssToColor = (cssRgbColor: string | undefined): Color | undefined => {
    if (!cssRgbColor) {
        return undefined;
    }

    const match = cssRgbColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) {
        return undefined;
    }

    return {
        red: parseInt(match[1], 10),
        green: parseInt(match[2], 10),
        blue: parseInt(match[3], 10),
        alpha: parseFloat(match[4] ?? 1),
    };
};

const DEFAULT_INDICATOR_COLOR = 'black';

export const FontColorButton = ({ id }: { id: string }) => {
    const state = useColorDropdownMenuState({
        colors: [],
        customColors: [],
        nodeType: MARK_COLOR,
        closeOnSelect: false,
    });

    const { buttonProps, menuProps } = useColorDropdownMenu(state);

    const selectColor = (color: Color) => {
        const newColor = colorToCss(color);
        if (newColor === state.selectedColor) {
            return;
        }

        state.updateColor(newColor);
    };

    const indicatorColor = state.selectedColor || DEFAULT_INDICATOR_COLOR;

    return (
        <ButtonWrapper id={id}>
            <Flyout.Root modal {...menuProps}>
                <Flyout.Trigger>
                    <ToolbarButton tooltip={getTooltip('Font Color')} {...buttonProps}>
                        <IconStylingWrapper
                            icon={
                                <div>
                                    <IconTypography size="12" />
                                    <div
                                        className="tw-h-1 tw-rounded-small"
                                        style={{ backgroundColor: indicatorColor }}
                                    />
                                </div>
                            }
                        />
                    </ToolbarButton>
                </Flyout.Trigger>
                <Flyout.Content maxWidth="600px">
                    <Flyout.Body>
                        <div className="tw-p-2 tw-w-[450px] tw-bg-base">
                            <ColorPicker.Root
                                currentColor={cssToColor(state.selectedColor)}
                                onColorChange={selectColor}
                            >
                                <ColorPicker.Values />
                                <ColorPicker.Gradient />
                            </ColorPicker.Root>
                        </div>
                    </Flyout.Body>
                </Flyout.Content>
            </Flyout.Root>
        </ButtonWrapper>
    );
};
