import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowExpand12 from './IconArrowExpand12';
import IconArrowExpand16 from './IconArrowExpand16';
import IconArrowExpand20 from './IconArrowExpand20';
import IconArrowExpand24 from './IconArrowExpand24';
import IconArrowExpand32 from './IconArrowExpand32';

const IconArrowExpand = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowExpand12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowExpand16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowExpand20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowExpand24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowExpand32 {...props} />}
        </span>
    );
};
IconArrowExpand.displayName = 'FondueIconArrowExpand';

export default memo(IconArrowExpand);
