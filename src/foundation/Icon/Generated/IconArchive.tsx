import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArchive12 from './IconArchive12';
import IconArchive16 from './IconArchive16';
import IconArchive20 from './IconArchive20';
import IconArchive24 from './IconArchive24';
import IconArchive32 from './IconArchive32';

const IconArchive = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArchive12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArchive16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArchive20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArchive24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArchive32 {...props} />}
        </span>
    );
};

const MemoizedIconArchive = memo(IconArchive);
MemoizedIconArchive.displayName = 'FondueIconArchive';

export default MemoizedIconArchive;
