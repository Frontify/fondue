import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPerson12 from './IconPerson12';
import IconPerson16 from './IconPerson16';
import IconPerson20 from './IconPerson20';
import IconPerson24 from './IconPerson24';
import IconPerson32 from './IconPerson32';

const IconPerson = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPerson12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPerson16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPerson20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPerson24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPerson32 {...props} />}
        </span>
    );
};

const MemoizedIconPerson = memo(IconPerson);
MemoizedIconPerson.displayName = 'FondueIconPerson';

export default MemoizedIconPerson;
