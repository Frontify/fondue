import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDotsHorizontal12 from './IconDotsHorizontal12';
import IconDotsHorizontal16 from './IconDotsHorizontal16';
import IconDotsHorizontal20 from './IconDotsHorizontal20';
import IconDotsHorizontal24 from './IconDotsHorizontal24';
import IconDotsHorizontal32 from './IconDotsHorizontal32';

const IconDotsHorizontal = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDotsHorizontal12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDotsHorizontal16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDotsHorizontal20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDotsHorizontal24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDotsHorizontal32 {...props} />}
        </span>
    );
};

const MemoizedIconDotsHorizontal = memo(IconDotsHorizontal);
MemoizedIconDotsHorizontal.displayName = 'FondueIconDotsHorizontal';

export default MemoizedIconDotsHorizontal;
