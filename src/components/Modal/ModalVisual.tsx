/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { merge } from '@utilities/merge';
import { ModalVisualProps } from './types';
import { FrontifyPattern } from '@components/FrontifyPattern/FrontifyPattern';
import { PatternDesign, PatternScale, patternThemes } from '@foundation/Pattern';

export const ModalVisual: FC<ModalVisualProps> = ({ pattern = PatternDesign.DigitalAssets, foregroundColor }) => {
    return (
        <div
            data-test-id="modal-visual"
            className={merge([
                'tw-h-[1802px] tw-absolute tw-bottom-0',
                foregroundColor && patternThemes[foregroundColor],
            ])}
            style={{
                clipPath:
                    "path('M0 0L252 145.492C256.95 148.35 260 153.632 260 159.349V1641.98C260 1647.7 256.95 1652.98 252 1655.84L0 1801.33V1501.11V0Z')",
            }}
        >
            <div className="tw-absolute tw-bottom-0">
                <FrontifyPattern
                    pattern={pattern}
                    scaleOrigin={['left', 'bottom']}
                    scale={PatternScale.XXL}
                    foregroundColor={foregroundColor}
                />
            </div>
        </div>
    );
};
ModalVisual.displayName = 'FondueModalVisual';
