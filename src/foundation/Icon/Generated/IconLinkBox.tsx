import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconLinkBox12 from './IconLinkBox12';
import IconLinkBox16 from './IconLinkBox16';
import IconLinkBox20 from './IconLinkBox20';
import IconLinkBox24 from './IconLinkBox24';
import IconLinkBox32 from './IconLinkBox32';

const IconLinkBox = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconLinkBox12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconLinkBox16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconLinkBox20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconLinkBox24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconLinkBox32 {...props} />}
        </span>
    );
};

const MemoizedIconLinkBox = memo(IconLinkBox);
MemoizedIconLinkBox.displayName = 'FondueIconLinkBox';

export default MemoizedIconLinkBox;
