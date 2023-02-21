import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCard12 from './IconCard12';
import IconCard16 from './IconCard16';
import IconCard20 from './IconCard20';
import IconCard24 from './IconCard24';
import IconCard32 from './IconCard32';

const IconCard = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCard12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCard16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCard20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCard24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCard32 {...props} />}
        </span>
    );
};

const MemoizedIconCard = memo(IconCard);
MemoizedIconCard.displayName = 'FondueIconCard';

export default MemoizedIconCard;
