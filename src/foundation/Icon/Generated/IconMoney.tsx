import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMoney12 from './IconMoney12';
import IconMoney16 from './IconMoney16';
import IconMoney20 from './IconMoney20';
import IconMoney24 from './IconMoney24';
import IconMoney32 from './IconMoney32';

const IconMoney = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconMoney12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconMoney16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconMoney20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconMoney24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconMoney32 {...props} />}
        </span>
    );
};

const MemoizedIconMoney = memo(IconMoney);
MemoizedIconMoney.displayName = 'FondueIconMoney';

export default MemoizedIconMoney;
