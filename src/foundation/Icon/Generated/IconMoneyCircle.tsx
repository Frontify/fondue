import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconMoneyCircle12Filled from './IconMoneyCircle12Filled';
import IconMoneyCircle16Filled from './IconMoneyCircle16Filled';
import IconMoneyCircle20Filled from './IconMoneyCircle20Filled';
import IconMoneyCircle24Filled from './IconMoneyCircle24Filled';
import IconMoneyCircle32Filled from './IconMoneyCircle32Filled';

const IconMoneyCircle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconMoneyCircle12Filled {...props} />}
            {size === IconSize.Size16 && props.filled && <IconMoneyCircle16Filled {...props} />}
            {size === IconSize.Size20 && props.filled && <IconMoneyCircle20Filled {...props} />}
            {size === IconSize.Size24 && props.filled && <IconMoneyCircle24Filled {...props} />}
            {size === IconSize.Size32 && props.filled && <IconMoneyCircle32Filled {...props} />}
        </span>
    );
};
IconMoneyCircle.displayName = 'FondueIconMoneyCircle';

export default memo(IconMoneyCircle);
