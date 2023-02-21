import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPaintbrush12 from './IconPaintbrush12';
import IconPaintbrush16 from './IconPaintbrush16';
import IconPaintbrush20 from './IconPaintbrush20';
import IconPaintbrush24 from './IconPaintbrush24';
import IconPaintbrush32 from './IconPaintbrush32';

const IconPaintbrush = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPaintbrush12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPaintbrush16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPaintbrush20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPaintbrush24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPaintbrush32 {...props} />}
        </span>
    );
};

const MemoizedIconPaintbrush = memo(IconPaintbrush);
MemoizedIconPaintbrush.displayName = 'FondueIconPaintbrush';

export default MemoizedIconPaintbrush;
