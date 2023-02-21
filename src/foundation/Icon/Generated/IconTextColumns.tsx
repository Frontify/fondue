import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTextColumns12 from './IconTextColumns12';
import IconTextColumns16 from './IconTextColumns16';
import IconTextColumns20 from './IconTextColumns20';
import IconTextColumns24 from './IconTextColumns24';
import IconTextColumns32 from './IconTextColumns32';

const IconTextColumns = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTextColumns12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTextColumns16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTextColumns20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTextColumns24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTextColumns32 {...props} />}
        </span>
    );
};

const MemoizedIconTextColumns = memo(IconTextColumns);
MemoizedIconTextColumns.displayName = 'FondueIconTextColumns';

export default MemoizedIconTextColumns;
