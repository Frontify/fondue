import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMediaObjectImage12 from './IconMediaObjectImage12';
import IconMediaObjectImage16 from './IconMediaObjectImage16';
import IconMediaObjectImage20 from './IconMediaObjectImage20';
import IconMediaObjectImage24 from './IconMediaObjectImage24';
import IconMediaObjectImage32 from './IconMediaObjectImage32';

const IconMediaObjectImage = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMediaObjectImage12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMediaObjectImage16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMediaObjectImage20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMediaObjectImage24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMediaObjectImage32 {...props} />}
        </span>
    );
};
IconMediaObjectImage.displayName = 'FondueIconMediaObjectImage';

export default memo(IconMediaObjectImage);
