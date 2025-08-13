/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorPicker, Flyout } from '@frontify/fondue-components';
import { IconTypography } from '@frontify/fondue-icons';
import { Content } from '@radix-ui/react-popover';
import { type PlateEditor } from '@udecode/plate-core';
import { MARK_COLOR, useColorDropdownMenuState } from '@udecode/plate-font';

import { getTooltip, ToolbarButton } from '@components/RichTextEditor';

import { ButtonWrapper, IconStylingWrapper } from '../helper';

type Color = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
};

const colorToCss = (color: Color) => `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha ?? 1})`;
const cssToColor = (cssRgbColor: string | undefined) => {
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

export const FontColorButton = ({ id }: { id: string; editor: PlateEditor }) => {
    const state = useColorDropdownMenuState({
        colors: [],
        customColors: [],
        nodeType: MARK_COLOR,
        closeOnSelect: false,
    });

    const handleColorSelect = (color: Color) => {
        state.updateColor(colorToCss(color));
    };

    const indicatorColor = state.selectedColor || DEFAULT_INDICATOR_COLOR;

    return (
        <ButtonWrapper id={id}>
            <Flyout.Root open={state.open} onOpenChange={state.onToggle} modal>
                <Flyout.Trigger>
                    <ToolbarButton tooltip={getTooltip('Font Color')} onClick={() => state.onToggle()}>
                        <IconStylingWrapper
                            icon={
                                <div className="tw-flex-col">
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
                <Content align="start" sideOffset={8}>
                    <ColorPicker.Root currentColor={cssToColor(state.selectedColor)} onColorChange={handleColorSelect}>
                        <ColorPicker.Gradient />
                    </ColorPicker.Root>
                </Content>
            </Flyout.Root>
        </ButtonWrapper>
    );
};
