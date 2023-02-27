import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconImage12 from './IconImage12';
import IconImage16 from './IconImage16';
import IconImage20 from './IconImage20';
import IconImage24 from './IconImage24';
import IconImage32 from './IconImage32';

const IconImage = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconImage12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconImage16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconImage20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconImage24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconImage32 {...props} />}
        </span>
    );
};
IconImage.displayName = 'FondueIconImage';

export default memo(IconImage);
