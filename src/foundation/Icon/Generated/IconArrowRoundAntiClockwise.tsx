import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowRoundAntiClockwise12 from './IconArrowRoundAntiClockwise12';
import IconArrowRoundAntiClockwise16 from './IconArrowRoundAntiClockwise16';
import IconArrowRoundAntiClockwise20 from './IconArrowRoundAntiClockwise20';
import IconArrowRoundAntiClockwise24 from './IconArrowRoundAntiClockwise24';
import IconArrowRoundAntiClockwise32 from './IconArrowRoundAntiClockwise32';

const IconArrowRoundAntiClockwise = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowRoundAntiClockwise12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowRoundAntiClockwise16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowRoundAntiClockwise20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowRoundAntiClockwise24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowRoundAntiClockwise32 {...props} />}
        </span>
    );
};

const MemoizedIconArrowRoundAntiClockwise = memo(IconArrowRoundAntiClockwise);
MemoizedIconArrowRoundAntiClockwise.displayName = 'FondueIconArrowRoundAntiClockwise';

export default MemoizedIconArrowRoundAntiClockwise;
