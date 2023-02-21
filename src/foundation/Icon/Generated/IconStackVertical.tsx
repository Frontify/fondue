import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconStackVertical12 from './IconStackVertical12';
import IconStackVertical16 from './IconStackVertical16';
import IconStackVertical20 from './IconStackVertical20';
import IconStackVertical24 from './IconStackVertical24';
import IconStackVertical32 from './IconStackVertical32';

const IconStackVertical = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconStackVertical12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconStackVertical16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconStackVertical20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconStackVertical24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconStackVertical32 {...props} />}
        </span>
    );
};

const MemoizedIconStackVertical = memo(IconStackVertical);
MemoizedIconStackVertical.displayName = 'FondueIconStackVertical';

export default MemoizedIconStackVertical;
