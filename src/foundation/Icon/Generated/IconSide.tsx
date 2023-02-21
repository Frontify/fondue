import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconSide12 from './IconSide12';
import IconSide16 from './IconSide16';
import IconSide20 from './IconSide20';
import IconSide24 from './IconSide24';
import IconSide32 from './IconSide32';

const IconSide = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconSide12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconSide16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconSide20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconSide24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconSide32 {...props} />}
        </span>
    );
};

const MemoizedIconSide = memo(IconSide);
MemoizedIconSide.displayName = 'FondueIconSide';

export default MemoizedIconSide;
