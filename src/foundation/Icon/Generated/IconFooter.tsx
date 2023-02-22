import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconFooter12 from './IconFooter12';
import IconFooter16 from './IconFooter16';
import IconFooter20 from './IconFooter20';
import IconFooter24 from './IconFooter24';
import IconFooter32 from './IconFooter32';

const IconFooter = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconFooter12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconFooter16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconFooter20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconFooter24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconFooter32 {...props} />}
        </span>
    );
};
IconFooter.displayName = 'FondueIconFooter';

export default memo(IconFooter);
