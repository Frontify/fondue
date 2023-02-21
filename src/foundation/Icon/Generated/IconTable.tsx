import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTable12 from './IconTable12';
import IconTable16 from './IconTable16';
import IconTable20 from './IconTable20';
import IconTable24 from './IconTable24';
import IconTable32 from './IconTable32';

const IconTable = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTable12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTable16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTable20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTable24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTable32 {...props} />}
        </span>
    );
};

const MemoizedIconTable = memo(IconTable);
MemoizedIconTable.displayName = 'FondueIconTable';

export default MemoizedIconTable;
