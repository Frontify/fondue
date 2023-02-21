import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconLinkOpen12 from './IconLinkOpen12';
import IconLinkOpen16 from './IconLinkOpen16';
import IconLinkOpen20 from './IconLinkOpen20';
import IconLinkOpen24 from './IconLinkOpen24';
import IconLinkOpen32 from './IconLinkOpen32';

const IconLinkOpen = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconLinkOpen12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconLinkOpen16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconLinkOpen20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconLinkOpen24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconLinkOpen32 {...props} />}
        </span>
    );
};

const MemoizedIconLinkOpen = memo(IconLinkOpen);
MemoizedIconLinkOpen.displayName = 'FondueIconLinkOpen';

export default MemoizedIconLinkOpen;
