import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowOutShare12 from './IconArrowOutShare12';
import IconArrowOutShare16 from './IconArrowOutShare16';
import IconArrowOutShare20 from './IconArrowOutShare20';
import IconArrowOutShare24 from './IconArrowOutShare24';
import IconArrowOutShare32 from './IconArrowOutShare32';

const IconArrowOutShare = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowOutShare12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowOutShare16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowOutShare20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowOutShare24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowOutShare32 {...props} />}
        </span>
    );
};
IconArrowOutShare.displayName = 'FondueIconArrowOutShare';

export default memo(IconArrowOutShare);
