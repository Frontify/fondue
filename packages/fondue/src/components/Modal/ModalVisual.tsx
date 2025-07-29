/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { FrontifyPattern } from '@components/FrontifyPattern/FrontifyPattern';
import { PatternDesign, PatternScale } from '@foundation/Pattern';
import { patternThemes } from '@foundation/Pattern/PatternTheme';
import { merge } from '@utilities/merge';

import { type ModalVisualProps } from './types';

/**
 * @deprecated Use `DialogSide.Content` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#dialog the migration guide}.
 */
export const ModalVisual = ({
    pattern = PatternDesign.DigitalAssets,
    foregroundColor,
}: ModalVisualProps): ReactElement => {
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
