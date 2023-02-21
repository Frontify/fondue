import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconButton12 from './IconButton12';
import IconButton16 from './IconButton16';
import IconButton20 from './IconButton20';
import IconButton24 from './IconButton24';
import IconButton32 from './IconButton32';

const IconButton = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconButton12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconButton16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconButton20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconButton24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconButton32 {...props} />}
        </span>
    );
};

const MemoizedIconButton = memo(IconButton);
MemoizedIconButton.displayName = 'FondueIconButton';

export default MemoizedIconButton;
