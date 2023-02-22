import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconListIndented12 from './IconListIndented12';
import IconListIndented16 from './IconListIndented16';
import IconListIndented20 from './IconListIndented20';
import IconListIndented24 from './IconListIndented24';
import IconListIndented32 from './IconListIndented32';

const IconListIndented = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconListIndented12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconListIndented16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconListIndented20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconListIndented24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconListIndented32 {...props} />}
        </span>
    );
};
IconListIndented.displayName = 'FondueIconListIndented';

export default memo(IconListIndented);
