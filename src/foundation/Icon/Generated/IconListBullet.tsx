import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconListBullet12 from './IconListBullet12';
import IconListBullet16 from './IconListBullet16';
import IconListBullet20 from './IconListBullet20';
import IconListBullet24 from './IconListBullet24';
import IconListBullet32 from './IconListBullet32';

const IconListBullet = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconListBullet12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconListBullet16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconListBullet20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconListBullet24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconListBullet32 {...props} />}
        </span>
    );
};

const MemoizedIconListBullet = memo(IconListBullet);
MemoizedIconListBullet.displayName = 'FondueIconListBullet';

export default MemoizedIconListBullet;
