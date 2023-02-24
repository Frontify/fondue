import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPeople12 from './IconPeople12';
import IconPeople16 from './IconPeople16';
import IconPeople20 from './IconPeople20';
import IconPeople24 from './IconPeople24';
import IconPeople32 from './IconPeople32';

const IconPeople = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconPeople12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPeople16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPeople20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPeople24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPeople32 {...props} />}
        </span>
    );
};
IconPeople.displayName = 'FondueIconPeople';

export default memo(IconPeople);
