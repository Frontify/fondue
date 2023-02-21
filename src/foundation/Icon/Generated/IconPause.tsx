import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPause12Filled from './IconPause12Filled';
import IconPause12 from './IconPause12';
import IconPause16Filled from './IconPause16Filled';
import IconPause16 from './IconPause16';
import IconPause20Filled from './IconPause20Filled';
import IconPause20 from './IconPause20';
import IconPause24Filled from './IconPause24Filled';
import IconPause24 from './IconPause24';
import IconPause32Filled from './IconPause32Filled';
import IconPause32 from './IconPause32';

const IconPause = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconPause12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconPause12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconPause16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPause16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconPause20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPause20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconPause24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPause24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconPause32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPause32 {...props} />}
        </span>
    );
};

const MemoizedIconPause = memo(IconPause);
MemoizedIconPause.displayName = 'FondueIconPause';

export default MemoizedIconPause;
